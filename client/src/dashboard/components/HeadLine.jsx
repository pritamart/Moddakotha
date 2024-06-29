import React from "react";
import LoadingSpinners from "react-spinners-components";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const HeadLine = ({ news }) => {
  return (
    <div className="bg-white shadow flex flex-wrap">
      <div className="flex md:w-[170px] w-full bg-[#dddddd] relative after:absolute after:bg-[#dddddd] after:w-[20px] after:left-[160px] after:skew-x-[20deg] after:top-0 after:bottom-0 after:z-30">
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
            {Object.keys(news).length > 0 &&
              Object.keys(news).map((category, i) =>
                news[category].length > 0 ? (
                  news[category].map((item, j) => (
                    <Link
                      key={j}
                      className="py-3 block font-medium hover:text-[#c80000] pr-12 text-sm"
                      to={`/news/${item.slug}`}
                    >
                      {item.title}
                    </Link>
                  ))
                ) : null
              )}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default HeadLine;
