import React, { useEffect, useState } from "react";
import Title from "../../components/items/Title";
import SimpleDetailsNewsCard from "../../components/items/SimpleDetailsNewsCard";
import axios from "axios";
import { base_url } from "../../../config/config";

const PopularNews = ({ type }) => {
  const [popularNews, setPopularNews] = useState([]);

  useEffect(() => {
    const fetchPopularNews = async () => {
      try {
        const res = await axios.get(`${base_url}/api/popular/news`);
        setPopularNews(res.data.popularNews);
      } catch (error) {
        console.error("Error fetching popular news:", error);
      }
    };

    fetchPopularNews();
  }, []);

  return (
    <div className="w-full pb-8 mt-5">
      <div className="flex flex-col w-full gap-y-[14px]">
        <Title title="জনপ্রিয় খবর" />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            gap-y-3 sm:gap-3 lg:gap-x-3"
        >
          {popularNews.length > 0 &&
            popularNews.map((item, i) => {
              if (i < 4) {
                return (
                  <SimpleDetailsNewsCard
                    news={item}
                    type={type}
                    item={item}
                    key={i}
                    height={230}
                  />
                );
              }
              return null; // Ensure you return null for items not rendered
            })}
        </div>
      </div>
    </div>
  );
};

export default PopularNews;
