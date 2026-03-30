import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPayment } from "../services/api";

function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // "verifying" | "success" | "failed"

  useEffect(() => {
    const verify = async () => {
      const reference = searchParams.get("reference");
      const bookingId = localStorage.getItem("booking_id");

      if (!reference || !bookingId) {
        setStatus("failed");
        return;
      }

      const result = await verifyPayment(reference, bookingId);
      console.log("Verify result:", result);

      if (result && result.status === "success") {
        setStatus("success");
        localStorage.removeItem("booking_id"); // clean up
        setTimeout(() => navigate("/"), 3000);
      } else {
        setStatus("failed");
      }
    };

    verify();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-xl">
        
        {status === "verifying" && (
          <>
            <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-900 rounded-full border-t-transparent animate-spin" />
            <h2 className="text-xl font-bold text-blue-900">Verifying your payment...</h2>
            <p className="mt-2 text-sm text-gray-500">Please wait while we confirm your transaction.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-4 text-5xl">✅</div>
            <h2 className="text-xl font-bold text-green-700">Payment Successful!</h2>
            <p className="mt-2 text-sm text-gray-500">Your booking has been confirmed. Redirecting you shortly...</p>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="mb-4 text-5xl">❌</div>
            <h2 className="text-xl font-bold text-red-600">Payment Failed</h2>
            <p className="mt-2 text-sm text-gray-500">We could not verify your payment. Please try again or contact support.</p>
            <button
              onClick={() => navigate("/booking")}
              className="px-6 py-2 mt-4 font-semibold text-white bg-blue-900 rounded-lg hover:bg-black"
            >
              Try Again
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default PaymentCallback;