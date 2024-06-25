import React from "react";
import LoadingSpinners from "react-spinners-components";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const HeadLine = () => {
  const head = [
    {
      title: "বিধাননগর, দমদমের যাত্রীদের সুখবর... ",
    },
    {
      title:
        "সময় খারাপ সরকারি কর্মীদের? জারি কড়া নির্দেশিকা, কোপ পড়বে ছুটিতে.. ",
    },
    {
      title:
        "  নিট ঘিরে বিতর্ক, বাতিল ইউজিসি নেট, আর সিএসআইআর নেট-এর পর এবার স্থগিত আরও এক পরীক্ষা!",
    },
    {
      title:
        "১ কোটি জরিমানা, ১০ বছর জেল, নিট বিতর্কের মাঝে প্রশ্নফাঁস বিরোধী আইন কার্যকর কেন্দ্রের",
    },
  ];

  return (
    <div className="bg-white shadow flex flex-wrap">
      <div
        className="flex md:w-[170px] w-full bg-[#dddddd] relative 
      after:absolute after:bg-[#dddddd] after:w-[20px] after:left-[160px]
      after:skew-x-[20deg] after:top-0 after:bottom-0 after:z-30"
      >
        <div className="md:pl-8 pl-4 w-full py-2 flex justify-start items-center gap-x-1">
          <span>
            <LoadingSpinners
              type="Ripple"
              colors={["#800000", "#c80000"]}
              size={"30px"}
            />
          </span>
          <h2 className="text-[#333333] font-semibold text-lg">শিরোনাম</h2>
        </div>
      </div>
      <div className="flex md:w-[calc(100%-170px)] w-full">
        <div className="flex w-full justify-start items-center">
          <Marquee>
            {head.map((h, i) => (
              <Link key={i}
                className="py-3 block font-medium hover:text-[#c80000]
              pr-12 text-sm"
                to={"#"}
              >
                {h.title}
              </Link>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default HeadLine;
