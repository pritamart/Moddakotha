import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { base_url } from "../../../config/config";
import Breadcrumb from "./Breadcrumb";
import HtmlParser from "react-html-parser";
import Search from "../../pages/app/Search";
import RecentNews from "./RecentNews";
import Category from "./Category";
import PopularNews from "../../pages/app/PopularNews";
import CategoryNews from "../../pages/app/CategoryNews";
import Title from "./Title";
import SimpleDetailsNewsCard from "./SimpleDetailsNewsCard";

const SearchValue = () => {
  const { slug } = useParams();
  const [newsList, setNewsList] = useState([]);
  const [latestNews, setLatestNews] = useState([]);

  const [searchParams] = useSearchParams();
  const value = searchParams.get("value");

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/latest/news`);
        setLatestNews(data.news);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    const fetchData = async () => {
      try {
        const res = await axios.get(`${base_url}/api/search/news`, {
          params: { value },
        });
        const processedNewsList = res.data.news.map((news) => ({
          ...news,
          description: replaceIframeAttributes(news.description),
        }));
        setNewsList(processedNewsList); // Take only the first 10 news items
      } catch (error) {
        console.error("Error fetching news details:", error);
      }
    };

    fetchLatestNews();
    fetchData();
  }, [slug, value]); // Added 'value' as a dependency to re-fetch on value change

  useEffect(() => {
    // Log the news items one by one
    newsList.forEach((news, index) => {
      console.log(`News ${index + 1}:`, news);
    });
  }, [newsList]);

  // Function to replace iframe attributes with responsive values
  const replaceIframeAttributes = (description) => {
    if (!description) return "";

    // Regular expression to find all iframe tags
    const regex = /<iframe\s+(.*?)>/g;

    // Replace width and height attributes in all iframe tags
    const processedDescription = description.replace(regex, (iframeTag) => {
      // Check if device width is less than or equal to 768px (tablet and below)
      if (window.innerWidth <= 768) {
        // Replace width attribute with Tailwind CSS classes for responsiveness
        let updatedIframe = iframeTag.replace(
          /width="[^"]*"/,
          'class="w-full"'
        );
        // Set fixed height for smaller devices
        updatedIframe = updatedIframe.replace(/height="[^"]*"/, 'height="240"');
        return updatedIframe;
      } else {
        // For larger screens, keep width and height as auto
        let updatedIframe = iframeTag.replace(
          /width="[^"]*"/,
          'class="w-full"'
        );
        updatedIframe = updatedIframe.replace(/height="[^"]*"/, 'height="450"');
        return updatedIframe;
      }
    });

    return processedDescription;
  };

  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb
            one="Search"
            two="NEWS"
          />
        </div>
      </div>
      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {newsList?.map((news, i) => (
                  <SimpleDetailsNewsCard
                    key={i}
                    news={news}
                    type="details-news"
                    height={200}
                  />
                ))}
              </div>
              {/* <div className="w-full pr-0 xl:pr-4 mt-8">
                {newsList.map((news, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-y-5 bg-white mb-8"
                  >
                    <img src={news?.image} alt={news?.title} onError={(e) => e.target.src = "/path/to/fallback-image.jpg"} />
                    <div className="flex flex-col gap-y-4 px-6 pb-6">
                      <h3 className="text-red-700 uppercase font-medium text-xl">
                        {news?.category}
                      </h3>
                      <h2 className="text-3xl text-gray-700 font-bold">
                        {news?.title}
                      </h2>
                      <div className="flex gap-x-2 text-xs font-normal text-slate-600">
                        <span>{news?.date}/</span>
                        <span>{news?.writerName}</span>
                      </div>
                      <p>{HtmlParser(news?.description)}</p>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8">
                  {/* <Search /> */}
                  <div className="w-full flex flex-col gap-y-[14px] bg-white pt-4">
                    <div className="pl-4">
                      <Title title="Recent news" />
                    </div>
                    <div className="grid grid-cols-1 gap-y-4 pt-3">
                      {latestNews?.slice(0, 20).map((r, i) => (
                        <div key={i} className="shadow-sm p-4">
                          <Link to={`/news/${r?.slug}`} className="flex w-full">
                            <div className="group relative overflow-hidden w-[110px] h-[100px]">
                              <div className="w-full h-full group-hover:scale-[1.1] transition-all duration-[1s] relative">
                                <img
                                  src={r.image}
                                  alt={r.title}
                                  onError={(e) =>
                                    (e.target.src =
                                      "/path/to/fallback-image.jpg")
                                  }
                                  className="object-cover w-full h-full"
                                />
                                <div className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-y-1 w-[calc(100%-90px)] pl-2">
                              <div className="px-[6px] py-[2px] font-bold text-[#c80000]">
                                {r?.category}
                              </div>
                              <h2 className="text-xs font-semibold hover:text-[#c80000]">
                                {r.title.substring(0, 90) + "..."}
                              </h2>
                              <div className="flex gap-x-2 text-xs font-normal">
                                <span>{r.date}</span>
                                <span>{r.writerName}</span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <PopularNews type="Recent news" />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default SearchValue;
