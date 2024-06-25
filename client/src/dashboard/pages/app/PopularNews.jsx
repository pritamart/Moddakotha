import React from "react";
import Title from "../../components/items/Title";
import SimpleDetailsNewsCard from "../../components/items/SimpleDetailsNewsCard";

const PopularNews = ({type}) => {
  return (
    <div className="w-full pb-8 mt-5">
      <div className="flex flex-col w-full gap-y-[14px]">
        <Title title="জনপ্রিয় খবর" />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            gap-y-3 sm:gap-3 lg:gap-x-3"
        >
          {[1, 2, 3, 4].map((item, i) => (
            <SimpleDetailsNewsCard type={type} item={item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularNews;
