import React from "react";
import Title from "../../components/items/Title";
import SimpleDetailsNewsCard from "../../components/items/SimpleDetailsNewsCard";
import NewsCard from "../../components/items/NewsCard";

const DetailsNewsCol = ({news,category}) => {
  return (
    <div className="w-full flex flex-col gap-[14px] pl-2">
      <Title title={category} />
      <div className="grid grid-cols-1 gap-y-6">
      {news?.length >= 1 ? <SimpleDetailsNewsCard news={news[1]} type="details-news" height={400}  /> : null}
      </div>
      <div className="grid grid-cols-1 gap-y-[14px] mt-4">
      {news?.map((item, i) => {
        if (i < 4) {
          return <NewsCard item={item} key={i} />;
        }
      })}
      </div>
    </div>
  );
};

export default DetailsNewsCol;
