import React, { useEffect, useState } from "react";
import axios from "axios";
import HeadLine from "../../components/HeadLine";
import LatestNews from "../../components/items/LatesNews";
import Title from "../../components/items/Title";
import SimpleNewsCard from "../../components/items/SimpleNewsCard";
import PopularNews from "./PopularNews";
import DetailsNewsRow from "../../components/items/DetailsNewsRow";
import DetailsNewsCol from "./DetailsNewsCol";
import DetailsNews from "./DetailsNews";
import NewsCard from "../../components/items/NewsCard";
import { base_url } from "../../../config/config";

const NewsWall = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Simulate a 5-second loading delay
        setTimeout(async () => {
          const { data } = await axios.get(`${base_url}/api/all/news`);
          setNews(data.news);
          setLoading(false); // Set loading to false after data is fetched
        }, 1000); // Simulate loading for 5 seconds
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false); // Set loading to false in case of error as well
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    // Display a loader while fetching data
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-red-500"
           xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.003 8.003 0 0112 4.536v3.537l2.146-2.146a8.014 8.014 0 011.414 10.708l-1.484 1.485a9.972 9.972 0 00-1.384-12.669l1.481-1.481A10.014 10.014 0 0112 2.3V5.82l-2.146 2.146a8.014 8.014 0 01-3.654 6.283z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div>
      <main>
        <HeadLine news={news} />
        <div className="bg-slate-100">
          <div className="px-4 md:px-8 py-8">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12">
                <LatestNews news={news["Education"] || []} />
              </div>
              <div className="w-full lg:w-6/12 mt-5 lg:mt-0">
                <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                  <Title title="Technology" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                    {news["Technology"] &&
                      news["Technology"]
                        .slice(0, 4)
                        .map((item, i) => (
                          <SimpleNewsCard item={item} key={i} />
                        ))}
                  </div>
                </div>
              </div>
            </div>
            <PopularNews type="Popular news" news={news["Travel"]} />
            {/* first section */}
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <DetailsNewsRow
                    news={news["Sports"]}
                    category="Sports"
                    type="details-news"
                  />
                  <DetailsNews news={news["Health"]} category="Health" />
                </div>
                <div className="w-full lg:w-4/12">
                  <DetailsNewsCol
                    news={news["Education"]}
                    category="Education"
                  />
                </div>
              </div>
            </div>
            {/* 2nd section */}
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12">
                  <div className="pr-2">
                    <DetailsNewsCol
                      news={news["Education"]}
                      category="Politics"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-8/12">
                  <div className="pl-2">
                    <DetailsNewsRow
                      news={news["Travel"]}
                      category="Travel"
                      type="details-news"
                    />
                    <DetailsNews
                      news={news["Education"]}
                      category="International"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 3rd section */}
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <div>
                    <DetailsNewsRow
                      news={news["Technology"]}
                      category="Technology"
                      type="details-news"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12">
                  <div className="pl-2">
                    <Title title="Recent news" />
                    <div className="grid grid-cols-1 gap-y-[14px] mt-4">
                      {news["Sports"]?.slice(0, 4).map((item, i) => (
                        <NewsCard item={item} key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Footer news={news["Technology"]} /> */}
    </div>
  );
};

export default NewsWall;
