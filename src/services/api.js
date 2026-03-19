const BASE_URL = "http://81.17.103.145";
// Rooms API

export const fetchRooms = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/rooms/`);
    if (!res.ok) throw new Error("Failed to fetch rooms");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchAvailableRooms = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/rooms/`);
    if (!res.ok) throw new Error("Failed to fetch available rooms");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
// Bookings API

export const fetchBookings = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/bookings/public/book/`);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createBooking = async (bookingData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/bookings/public/book/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) throw new Error("Booking failed");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Messages API (for contact)

export const sendMessage = async (messageData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/messages/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    });

    const data = await res.json();
    console.log("Backend response:", data);
    console.log("Backend payment response:", data);

    if (!res.ok) throw new Error("Failed to send message");

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};


// Payment API

export const createPayment = async (bookingId,email) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/payments/initialize/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: bookingId,
          email: email,
        }),
      }
    );

    const data = await response.json();

    console.log("PAYMENT BACKEND RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.error || "Payment initialization failed");
    }

    return data;

  } catch (error) {
    console.error("Payment error:", error);
    return null;
  }
};
// Newsletter API

export const subscribeNewsletter = async (email) => {
  try {
    const res = await fetch(`${BASE_URL}/api/newsletter/subscribe/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error("Subscription failed");

    return await res.json();
  } catch (err) {
    console.error("Newsletter error:", err);
    return null;
  }
};
    //paymentVerification
    
export const verifyPayment = async (reference, bookingId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/payments/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reference: reference,
        booking_id: bookingId,
      }),
    });

    const data = await response.json();
    console.log("VERIFY PAYMENT RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.error || "Payment verification failed");
    }

    return data;
  } catch (error) {
    console.error("Verification error:", error);
    return null;
  }
};