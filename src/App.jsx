import { Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar.jsx";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import PaymentCallback from "./pages/PaymentCallback.jsx";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/paymentCallback" element={<PaymentCallback />} />
        <Route path="/payment-success" element={<PaymentCallback />} />


        <Route
          path="*"
          element={<div className="text-center mt-20">Page Not Found</div>}
        />
      </Routes>
    </>
  );
}

export default App;
