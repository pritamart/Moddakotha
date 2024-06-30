import React, { useEffect, useState } from "react";
import axios from "axios";
import HeadLine from "../../components/HeadLine";
import Footer from "../../components/Footer";
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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/all/news`);
        setNews(data.news);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

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
      <Footer news={news["Technology"]} />
    </div>
  );
};

export default NewsWall;
