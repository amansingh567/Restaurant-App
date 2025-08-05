import DeliveryImage from "../assest/img/delivery.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full flex justify-center bg-white py-10 px-4">
      <div className="grid overflow-hidden p-4 md:p-8 max-w-6xl w-full bg-gradient-to-br from-white to-red-50 rounded-3xl shadow-2xl">
        <div className="flex flex-col items-start justify-center gap-6">
          {/* Bike Delivery Tag */}
          <div className="flex items-center gap-3 bg-red-100 py-1.5 px-4 rounded-full shadow-md">
            <p className="text-sm font-semibold text-red-700 uppercase tracking-wide">Bike Delivery</p>
            <div className="w-8 h-8 bg-white rounded-full overflow-hidden shadow-md">
              <img
                src={DeliveryImage}
                className="w-full h-full object-contain"
                alt="Delivery"
              />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-headingColor leading-tight">
            Foody –{" "}
            <span className="text-red-500 block mt-2 md:inline">
              Enjoy Your Cravings Like Never Before
            </span>
          </h1>

          {/* Paragraphs */}
          <p className="text-lg md:text-xl text-gray-700 md:w-4/5 leading-relaxed">
            Why settle for boring meals when you can explore an entire world of flavor at your fingertips? Foody connects you with the best kitchens in town — whether you're working late, binge-watching shows, or just feeling snacky at 2 AM.
          </p>

          <p className="text-lg md:text-xl text-gray-700 md:w-4/5 leading-relaxed">
            Customize your orders, and enjoy lightning-fast service with zero stress. From comfort food to gourmet dishes, we’ve got your cravings covered — morning to midnight.
          </p>

          {/* Highlights */}
          <div className="flex flex-col md:flex-row gap-4 font-bold text-lg text-red-700">
            <span>🍴 Find it. Crave it. Foody it.</span>
            <span>🚀 Hungry? Let your tastebuds take the lead.</span>
          </div>

          {/* Call to Action */}
          <Link
            to={"/menu"}
            className="bg-gradient-to-br from-red-400 to-red-600 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
          >
            🍽️ Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
