import React from "react";
import Title from "../../components/items/Title";
import SimpleDetailsNewsCard from "../../components/items/SimpleDetailsNewsCard";
import NewsCard from "../../components/items/NewsCard";

const DetailsNewsCol = () => {
  return (
    <div className="w-full flex flex-col gap-[14px] pl-2">
      <Title title="শিক্ষা" />
      <div className="grid grid-cols-1 gap-y-6">
        <SimpleDetailsNewsCard type="details-news" />
      </div>
      <div className="grid grid-cols-1 gap-y-[14px] mt-4">
        {[1, 2, 3, 4].map((_, i) => (
          <NewsCard key={i}/>
        ))}
      </div>
    </div>
  );
};

export default DetailsNewsCol;
