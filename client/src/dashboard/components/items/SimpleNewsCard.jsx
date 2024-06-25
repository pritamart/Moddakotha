import React from "react";
import { Link } from "react-router-dom";

const SimpleNewsCard = ({ item, type }) => {
  return (
    <div className="group relative">
      <div className="overflow-hidden">
        <div
          className={` ${
            type ? "h-[270px] sm:h-[470px]" : "h-[228px]"
          } w-full group-hover:scale-[1.1] transition-all duration-[1s]`}
        >
          <img
            className="object-cover w-full h-full"
            src="https://res.cloudinary.com/dpj4vsqbo/image/upload/v1696951679/news/btbfqrvjqhso6n842reb.jpg"
            alt="Travel Image"
          />
        </div>
      </div>

      <Link
        className="w-full h-full block absolute left-0 top-0 invisible 
      group-hover:visible bg-white cursor-pointer opacity-5 transition-all
      duration-300"
        to={"#"}
      />

      <div
        className="left-5 absolute bottom-4 flex justify-start items-start
        flex-col text-white font-semibold gap-2"
      >
        <div
          className="px-[6px] py-[2px] rounded-sm text-[13px]
          bg-[#c80000]"
        >
          {" "}
          ভ্রমণ
        </div>
        <h2 className="text-xl">
          দূষণের জেরে সুন্দরবনের ম্যানগ্রোভ অরণ্যের বিস্তর ক্ষতি হচ্ছে।
        </h2>
        <div className="flex gap-x-2 text-sm font-normal">
          <span> 09 May 2024</span>
          <span>Sanket Dhar</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleNewsCard;
