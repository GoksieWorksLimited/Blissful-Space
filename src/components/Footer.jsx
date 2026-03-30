import { useState } from "react";
import { subscribeNewsletter } from "../services/api";
import { HOTEL_NAME } from "../config";
function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);

    const result = await subscribeNewsletter(email);

    if (result) {
      alert("Successfully subscribed to newsletter!");
      setEmail("");
    } else {
      alert("Subscription failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16">
      <div className="container mx-auto px-4 grid md:grid-cols-5 gap-5">

        {/* Hotel Info */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            { HOTEL_NAME }
          </h3>
          <p className="text-xs leading-relaxed">
             { HOTEL_NAME } offers comfort, luxury, and excellent hospitality.
            We are committed to making every stay memorable and relaxing.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/rooms" className="hover:text-white">Rooms</a></li>
            <li><a href="/service" className="hover:text-white">Services</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Luxury Rooms</li>
            <li>Restaurant &amp; Bar</li>
            <li>Free Wi-Fi</li>
            <li>24/7 Front Desk</li>
            <li>Airport Pickup</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 OYO, Oyo State, Nigeria</li>
            <li>📞 +234 810 738 6011</li>
            <li>✉ info@ { HOTEL_NAME }.com</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>

          <form onSubmit={handleSubscribe} className="text-black flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded border w-full"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-900 text-white px-4 py-2 rounded"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm">
        © 2026 { HOTEL_NAME }. All rights reserved.
        Built and maintained by Aishah Ajolayo ❤️
      </div>
    </footer>
  );
}

export default Footer;
