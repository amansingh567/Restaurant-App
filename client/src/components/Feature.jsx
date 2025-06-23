import React, { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import FeatureCard from "./FeatureCard";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Loading from "../utils/Loading";

const Feature = () => {
  const productItem = useSelector((state) => state.productItem.productItem);
  const productLoading = useSelector((state) => state.productItem.productLoading);

  const data = useMemo(
    () => productItem.filter((el) => el.category.toLowerCase() === "fruits"),
    [productItem]
  );

  const featureRef = useRef();

  const nextPart = () => {
    featureRef.current.scrollLeft += 300;
  };

  const prevPart = () => {
    featureRef.current.scrollLeft -= 300;
  };

  return (
    <div className="p-4 md:p-8 my-6 bg-gradient-to-b from-white via-red-50 to-white rounded-xl shadow-inner">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-4xl font-extrabold text-red-600 relative">
          Our Fresh & Healthy Fruits
          <span className="block w-28 h-1 bg-red-400 mt-2 rounded-full"></span>
        </h2>

        <div className="hidden md:flex gap-3">
          <button
            className="p-2 bg-red-100 hover:bg-red-200 rounded-full shadow-md transition transform hover:scale-105"
            onClick={prevPart}
          >
            <GrFormPrevious className="text-2xl text-red-600" />
          </button>
          <button
            className="p-2 bg-red-100 hover:bg-red-200 rounded-full shadow-md transition transform hover:scale-105"
            onClick={nextPart}
          >
            <GrFormNext className="text-2xl text-red-600" />
          </button>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={featureRef}
        className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-transparent scroll-smooth"
      >
        <div className="flex gap-4">
          {productLoading
            ? new Array(7).fill(null).map((_, index) => (
                <div
                  key={index}
                  className="min-w-[250px] h-[250px] bg-white border border-red-100 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Loading />
                </div>
              ))
            : data.map((el) => (
                <FeatureCard
                  key={el.id}
                  id={el.id}
                  img={el.imgURL}
                  title={el.title}
                  price={el.price}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
