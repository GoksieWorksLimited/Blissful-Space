import Header from "../components/Header";
import Footer from "../components/Footer";
import FacilityItem from "../components/FacilityItem";
import Navbar from "../components/NavBar.jsx";

// Hero image
import heroImg from "../assets/images/Rectangle-10.png";

import guest1 from "../assets/images/Ellipse-5(2).png";
import guest2 from "../assets/images/Ellipse-5.png";
import guest3 from "../assets/images/Ellipse-5(1).png";
import TestimonialCard from "../components/TestimonialCard";

// Room images
import room1 from "../assets/images/Rectangle-10.png";
import room2 from "../assets/images/Rectangle-10(1).png";
import room3 from "../assets/images/Rectangle-10(2).png";


// Facility icons
import wifiIcon from "../assets/images/wifi.svg";
import poolIcon from "../assets/images/makiSwimming0.svg";
import restaurantIcon from "../assets/images/breakfast.svg";
import gymIcon from "../assets/images/gym.svg";
import gameIcon from "../assets/images/game.svg";
import lightIcon from "../assets/images/light.svg";
import laundryIcon from "../assets/images/laundry.svg";
import parkingIcon from "../assets/images/parking-space.svg";
import { HOTEL_NAME } from "../config.js";



function Home() {
  return (
    <>
      
      

      {/* HERO SECTION */}
      <section className="relative h-[70vh] md:h-[85vh]">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div className="text-white max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Experience Comfort & Luxury
            </h2>
            <p className="mb-6">
              Welcome to { HOTEL_NAME } your perfect stay for relaxation and elegance.
            </p>
            <a
              href="/rooms"
              className="bg-accent text-black px-8 py-3 rounded-md font-semibold hover:opacity-90"
            >
              View Rooms
            </a>
          </div>
        </div>
      </section>

      {/* ROOMS SECTION */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Our Rooms & Suites
          </h3>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                img: room1,
                title: "Deluxe Room",
                price: "₦45,000 / night",
                desc: "Spacious room with modern amenities and city view.",
              },
              {
                img: room2,
                title: "Executive Suite",
                price: "₦65,000 / night",
                desc: "Premium comfort for business and leisure guests.",
              },
              {
                img: room3,
                title: "Presidential Suite",
                price: "₦120,000 / night",
                desc: "Ultimate luxury with premium services.",
              },
            ].map((room, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={room.img} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-lg mb-2">{room.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{room.desc}</p>
                  <span className="font-bold text-primary">{room.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES SECTION */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Hotel Facilities
          </h3>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            <FacilityItem icon={wifiIcon} title="Free Wi-Fi" />
            <FacilityItem icon={poolIcon} title="Swimming Pool" />
            <FacilityItem icon={restaurantIcon} title="Restaurant" />
            <FacilityItem icon={gymIcon} title="Fitness Center" />
            <FacilityItem icon={gameIcon} title="Game Center" />
            <FacilityItem icon={lightIcon} title="24/7 Lighting" />
            <FacilityItem icon={laundryIcon} title="Laundry Service" />
            <FacilityItem icon={parkingIcon} title="Parking Space" />
          </div>
        </div>
      </section>
      {/* TESTIMONIALS SECTION */}

{/* TESTIMONIALS SECTION */}
<section className="bg-gray-50 py-16">
  <div className="container mx-auto px-4">
    {/* Heading */}
    <h2 className="text-3xl font-bold text-center mb-4">
      Guest Testimonials
    </h2>
    <p className="text-center text-gray-600 mb-12">
      Hear what our guests say about their experience at {HOTEL_NAME}
    </p>

    {/* Testimonials Grid */}
    <div className="grid md:grid-cols-3 gap-8">
      <TestimonialCard
        image={guest1}
        name="Amina Bello"
        location="Lagos, Nigeria"
        message="“The service at the Blissful place was exceptional. There was absolutely no issue that was not addressed timely and with satisfactory results. We were particularly impressed with how the hotel staff anticipated our needs. Numerous conference attendees commented on the quality of the food, the quality of the service, and overall positive attitude toward the conference site. Particular noteworthy is the longevity of the staff and that sense of investment in the success of every event. I usually offer suggestions for improvements (part of being a marketing professor), but there is absolutely nothing that could be improved – you have set the bar very high.”"
      />

      <TestimonialCard
        image={guest2}
        name="John Okafor"
        location="Abuja, Nigeria"
        message="“The service at the Blissful place was exceptional. There was absolutely no issue that was not addressed timely and with satisfactory results. We were particularly impressed with how the hotel staff anticipated our needs. Numerous conference attendees commented on the quality of the food, the quality of the service, and overall positive attitude toward the conference site. Particular noteworthy is the longevity of the staff and that sense of investment in the success of every event. I usually offer suggestions for improvements (part of being a marketing professor), but there is absolutely nothing that could be improved – you have set the bar very high.”"
      />

      <TestimonialCard
        image={guest3}
        name="Sarah Williams"
        location="London, UK"
        message="“The service at the Blissful place was exceptional. There was absolutely no issue that was not addressed timely and with satisfactory results. We were particularly impressed with how the hotel staff anticipated our needs. Numerous conference attendees commented on the quality of the food, the quality of the service, and overall positive attitude toward the conference site. Particular noteworthy is the longevity of the staff and that sense of investment in the success of every event. I usually offer suggestions for improvements (part of being a marketing professor), but there is absolutely nothing that could be improved – you have set the bar very high.”"
      />
    </div>
  </div>
</section>



      <Footer />
    </>
  );
}

export default Home;
