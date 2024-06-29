import React from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

const SimpleDetailsNewsCard = ({ news, type, height }) => {
  // Helper function to truncate parsed HTML content
  const truncateHtml = (htmlString, length) => {
    let textContent = document.createElement('div');
    textContent.innerHTML = htmlString;
    return textContent.innerText.slice(0, length);
  };

  return (
    <div className="bg-white shadow">
      <div className="group relative overflow-hidden">
        <div
          style={{ height: `${height}px`}}
          className={`w-full group-hover:scale-[1.1] transition-all duration-[1s]`}
        >
          <img
            className="w-full h-full object-cover"
            src={news?.image}
            alt="Travel"
          />
        </div>
        <div
          className="w-full h-full block absolute left-0 top-0 invisible 
          group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"
          to={`#`}
        ></div>
        <div
          className="left-5 absolute bottom-4 flex justify-start items-start gap-x-2 text-white font-semibold"
        >
          <div className="px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000]">
            জনপ্রিয় খবর
          </div>
          <div className="px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000]">
            {news?.category}
          </div>
        </div>
      </div>
      <div className="p-5">
        <Link
          to={`/news/${news?.title}`}
          className="text-[15px] font-semibold text-[#333333] hover:text-[#c80000]"
        >
          {news?.title}
        </Link>
        <div className="flex gap-x-2 text-xs font-normal text-slate-600">
          <span>{news?.date}</span>
          <span>{news?.writerName}</span>
        </div>
        {type === "details-news"  && (
          <span className="text-sm text-slate-600 block pt-5">
            {truncateHtml(news?.description, 100)}
          </span>
        )}
      </div>
    </div>
  );
};

export default SimpleDetailsNewsCard;
