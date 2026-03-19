import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { createPayment } from "../services/api";

function Payment() {
  const location = useLocation();
  const booking = location.state?.booking;
  const [loading, setLoading] = useState(false);

  if (!booking) return <Navigate to="/booking" />;

  const handlePayment = async () => {
    try {
      if (!booking.booking_id) {
        alert("Booking ID missing.");
        return;
      }

      setLoading(true);

      const result = await createPayment(booking.booking_id, booking.email);
      console.log("Response", result);

      if (result?.authorization_url) {
        localStorage.setItem("booking_id", booking.booking_id); // ✅ stored AFTER result exists
        window.location.href = result.authorization_url; // ✅ only once
      } else {
        console.error("Backend returned:", result);
        throw new Error("No authorization URL returned");
      }

    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initialization failed. Please try again.");
      setLoading(false);
    }
  };

  const totalAmount = booking.price * booking.nights;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gray-100">
      <div className="w-full max-w-3xl p-6 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-blue-900">
          Confirm Payment
        </h2>

        <div className="p-6 space-y-3 text-sm border border-gray-200 rounded-lg bg-gray-50">
          <p className="flex justify-between pb-2 border-b">
            <span className="text-gray-500">Name:</span>
            <span className="font-semibold">{booking.name}</span>
          </p>

          <p className="flex justify-between pb-2 border-b">
            <span className="text-gray-500">Email:</span>
            <span className="font-semibold">{booking.email}</span>
          </p>

          <p className="flex justify-between pb-2 border-b">
            <span className="text-gray-500">Room:</span>
            <span className="font-semibold">
              {booking.roomTypeDisplay} (Room {booking.roomNumber})
            </span>
          </p>

          <p className="flex justify-between pb-2 border-b">
            <span className="text-gray-500">Check-in:</span>
            <span className="font-semibold">{booking.checkIn}</span>
          </p>

          <p className="flex justify-between pb-2 border-b">
            <span className="text-gray-500">Check-out:</span>
            <span className="font-semibold">{booking.checkOut}</span>
          </p>

          <p className="flex justify-between pb-2 border-b">
            <span className="text-gray-500">Duration:</span>
            <span className="font-semibold">{booking.nights} Night(s)</span>
          </p>

          <div className="flex justify-between pt-3 text-lg font-bold text-blue-900">
            <span>Total Amount</span>
            <span>₦{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-4 font-semibold text-white transition bg-yellow-700 rounded-lg hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading
            ? "Processing..."
            : `Pay ₦${totalAmount.toLocaleString()} with Paystack`}
        </button>

        <p className="text-xs italic text-center text-gray-500">
          🔒 Secure Payment: You will be redirected to Paystack to complete your transaction.
        </p>
      </div>
    </div>
  );
}

export default Payment;