import React from "react";
import Title from "./Title";
import SimpleDetailsNewsCard from "./SimpleDetailsNewsCard";
import NewsCard from "./NewsCard";

const DetailsNewsRow = ({ news, category, type }) => {
  return (
    <div className="w-full flex flex-col gap-[14px] pr-2">
      <Title title={category} />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
        {news?.length >= 1 ? (<SimpleDetailsNewsCard news={news[0]} type={type} height={400}/>)
        : null
        }
        

        <div className="grid grid-cols-1 gap-y-3">
          {news?.slice(0, 4).map((item, index) => (
            <NewsCard item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsNewsRow;
