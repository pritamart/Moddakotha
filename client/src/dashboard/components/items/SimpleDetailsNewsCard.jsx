import React from "react";
import { Link } from "react-router-dom";

const SimpleDetailsNewsCard = ({ type }) => {
  return (
    <div className="bg-white shadow">
      <div className="group relative overflow-hidden">
        <div
          className={`w-full ${
            type === "details-news" ? "h-[300px]" : "h-[250px]"
          } group-hover:scale-[1.1] transition-all duration-[1s]`}
        >
          <img
            className="w-full h-full object-cover"
            src="https://res.cloudinary.com/dpj4vsqbo/image/upload/v1696951679/news/btbfqrvjqhso6n842reb.jpg"
            alt="Travel"
          />
        </div>
        <Link
          className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"
          to={"#"}
        ></Link>
        <div
          className="left-5 absolute bottom-4 flex justify-start items-start gap-x-2 text-white font-semibold"
        >
          <div className="px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000]">
            জনপ্রিয় খবর
          </div>
          <div className="px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000]">
            ভ্রমণ
          </div>
        </div>
      </div>
      <div className="p-5">
        <Link
          to={"#"}
          className="text-[15px] font-semibold text-[#333333] hover:text-[#c80000]"
        >
          দূষণের জেরে সুন্দরবনের ম্যানগ্রোভ অরণ্যের বিস্তর ক্ষতি হচ্ছে।
        </Link>
        <div className="flex gap-x-2 text-xs font-normal text-slate-600">
          <span>09 May 2024</span>
          <span>Sanket Dhar</span>
        </div>
        {type === "details-news" && (
          <span className="text-sm text-slate-600 block pt-5">
            দূষণের পিছনে একাধিক কারণ রয়েছে বলে জানাচ্ছেন বিশেষজ্ঞরা। কানপুর
            আইআইটির অধ্যাপক অভিনন্দন ঘোষ সংবাদমাধ্যম আইএএনএস-কে বলেন, দূষণের
            পিছনে সেখানকার বাসিন্দারাও জড়িত। কিন্তু কিছু ক্ষেত্রে তারাও
            নিরুপায়। ব্যাপারটা কীরকম ? বিশদে ব্যাখ্যা করেছেন অভিনন্দনবাবু।
            তাঁর কথায় —
          </span>
        )}
      </div>
    </div>
  );
};

export default SimpleDetailsNewsCard;
