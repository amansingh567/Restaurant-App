import React, { useMemo } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCartProduct } from "../redux/cartSlice";

const FeatureCard = ({ id, img, title, price }) => {
  const productItem = useSelector((state) => state.productItem.productItem);
  const dispatch = useDispatch();
  const data = productItem.find((product) => product.id === id);

  const handleCartProduct = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(setCartProduct(data));
  };

  return (
    <Link
      to={`/menu/${id}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="min-w-[250px] max-w-[250px] w-full bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 group cursor-pointer mx-2"
    >
      <div className="p-4 flex flex-col items-center">
        {/* Image */}
        <div className="w-full h-40 flex justify-center items-center overflow-hidden rounded-md">
          <img
            src={img}
            alt={title}
            className="w-28 h-28 object-contain transform group-hover:scale-110 transition-all duration-300"
          />
        </div>

        {/* Info */}
        <div className="w-full mt-4 flex flex-col items-start gap-1">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
          <p className="text-md font-bold text-red-600">₹{price}</p>
        </div>

        {/* Add to Cart Icon */}
        <div className="mt-3 w-full flex justify-end">
          <button
            onClick={handleCartProduct}
            className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full shadow-md transition-all"
            title="Add to Cart"
          >
            <FaCartPlus className="text-lg" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
