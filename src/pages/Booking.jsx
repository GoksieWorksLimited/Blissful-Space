import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createBooking } from "../services/api";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRoom = location.state;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
  });

  const nights =
    formData.checkIn && formData.checkOut
      ? Math.max(
          (new Date(formData.checkOut) - new Date(formData.checkIn)) /
            (1000 * 60 * 60 * 24),
          1,
        )
      : 0;

  const totalPrice = nights * (selectedRoom?.price || 0);

  function handleChange(e) {
  const { name, value } = e.target;

  if (name === "checkOut" && formData.checkIn && value <= formData.checkIn) {
    setError("Check-out date must be after check-in date.");
    setFormData({ ...formData, [name]: "" }); // clear the invalid date
    return;
  }

  if (name === "checkIn") {
    // If check-in changes and check-out is now invalid, clear check-out
    if (formData.checkOut && formData.checkOut <= value) {
      setFormData({ ...formData, checkIn: value, checkOut: "" });
      setError("Please select a valid check-out date.");
      return;
    }
  }

  setError(""); // clear error if valid
  setFormData({ ...formData, [name]: value });
}

  async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  setError("");

  // Trim values
  const name = formData.name.trim();
  const email = formData.email.trim();

  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address.");
    setLoading(false);
    return;
  }

  if (!name) {
    setError("Full name is required.");
    setLoading(false);
    return;
  }

  if (!formData.checkIn || !formData.checkOut) {
    setError("Please select check-in and check-out dates.");
    setLoading(false);
    return;
  }

  const checkInDate = new Date(formData.checkIn);
  const checkOutDate = new Date(formData.checkOut);

  if (checkOutDate <= checkInDate) {
    setError("Check-out date must be after check-in date.");
    setLoading(false);
    return;
  }

  try {
    const response = await createBooking({
      room: selectedRoom.roomId,
      check_in: formData.checkIn,
      check_out: formData.checkOut,
      guest_name: name,
      guest_email: email,
    });

    console.log("BOOKING RESPONSE:", response);

    if (!response || !response.booking_id) {
      throw new Error("Booking creation failed. No booking ID returned.");
    }

    navigate("/payment", {
      state: {
        booking: {
          ...formData,
          ...selectedRoom,
          nights,
          totalPrice,
          booking_id: response.booking_id,
        },
      },
    });
  } catch (err) {
    console.error("BOOKING ERROR:", err.response?.data || err.message);

    // If backend sends field errors (Django style)
    if (err.response?.data) {
      const backendErrors = Object.values(err.response.data).flat().join(" ");
      setError(backendErrors);
    }
     else {
      setError("Booking Error: The selected room is no longer available. Please choose another room.");
    }
  } finally {
    setLoading(false);
  }
}
  

  // Guard: if someone navigates to /booking directly without selecting a room
  if (!selectedRoom) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="mb-4 text-xl font-semibold text-blue-900">
            No room selected
          </p>
          <a href="/rooms" className="text-yellow-700 underline">
            Go back and select a room
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl p-6 space-y-4 bg-white shadow-lg rounded-xl"
      >
        <h2 className="text-2xl font-bold text-center">Book a Room</h2>

        {/* ✅ Room Summary Card - so user knows what they're booking */}
        <div className="flex gap-4 p-4 border rounded-lg bg-gray-50">
          <img
            src={selectedRoom.image}
            alt={selectedRoom.roomTypeDisplay}
            className="object-cover w-24 h-24 rounded-lg"
          />
          <div>
            <p className="text-lg font-bold text-blue-900">
              {selectedRoom.roomTypeDisplay}
            </p>
            <p className="text-sm text-gray-500">
              Room {selectedRoom.roomNumber}
            </p>
            <p className="mt-1 font-semibold text-yellow-700">
              ₦{selectedRoom.price.toLocaleString()} / night
            </p>
          </div>
        </div>

        {error && (
          <p className="p-3 text-sm text-red-700 bg-red-100 rounded">{error}</p>
        )}

        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email Address"
          required
          onChange={handleChange}
          className="w-full p-3 border rounded"
          autoComplete="email"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Check-in</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              required
              onChange={handleChange}
              className="w-full p-3 border rounded"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Check-out</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              required
              onChange={handleChange}
              className="w-full p-3 border rounded"
              min={formData.checkIn || new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        {nights > 0 && (
          <div className="p-4 text-sm rounded bg-gray-50">
            <p>
              <b>Nights:</b> {nights}
            </p>
            <p>
              <b>Price per night:</b> ₦{selectedRoom.price.toLocaleString()}
            </p>
            <p className="font-semibold">
              Total: ₦{totalPrice.toLocaleString()}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-white transition bg-yellow-700 rounded hover:bg-black disabled:opacity-50"
        >
          {loading ? "Creating Booking..." : "Continue to Payment"}
        </button>
      </form>
    </div>
  );
}

export default Booking;
