import React from "react";
import { Link } from "react-router-dom";

const NewsCard = () => {
  return (
    <div className="bg-white shadow flex gap-x-2 p-4">
      <div className="relative group overflow-hidden flex-shrink-0 w-[160px] h-[93px] lg:w-[100px] ">
        <div className="w-full h-full group-hover:scale-[1.1] transition-all duration-[1s] relative">
          <img
            className="object-cover"
            layout="fill"
            src="https://res.cloudinary.com/dpj4vsqbo/image/upload/v1696951679/news/btbfqrvjqhso6n842reb.jpg"
            alt="Travel Image"
          />
        <Link
          className="w-full h-full absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"
          to="#"
        ></Link>
        </div>
      </div>
      <div className="flex flex-col gap-y-1 flex-grow">
        <Link to="#" className="text-sm font-semibold text-[#c80000]">
        খেলা
        </Link>
        <Link to="#" className="text-xs font-semibold text-[#333333] hover:text-[#c80000]">
        দূষণের জেরে সুন্দরবনের ম্যানগ্রোভ অরণ্যের বিস্তর ক্ষতি হচ্ছে।
        </Link>
        <div className="flex gap-x-2 text-xs font-normal">
          <span> 09 May 2024</span>
          <span>Sanket Dhar</span>
        </div>
        
      </div>
    </div>
  );
};

export default NewsCard;
