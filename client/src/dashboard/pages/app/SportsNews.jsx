import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/items/Breadcrumb";
import NewsCard from "../../components/items/NewsCard";
import Search from "./Search";
import Title from "../../components/items/Title";
import Category from "../../components/items/Category";
import PopularNews from "./PopularNews";
import axios from "axios";
import { base_url } from "../../../config/config";
import { useParams } from "react-router-dom";
import HtmlParser from "react-html-parser";

const SportsNews = () => {
  const { slug } = useParams();
  const [newsData, setNewsData] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/api/details/news/${slug}`);
        const { news, relateNews } = response.data;

        // Process description to replace iframe attributes
        const processedNews = {
          ...news,
          description: replaceIframeAttributes(news.description)
        };

        setNewsData(processedNews);
        setRelatedNews(relateNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, [slug]);

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
        updatedIframe = updatedIframe.replace(
          /height="[^"]*"/,
          'height="240"'
        );
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
          <Breadcrumb one={newsData?.category} two={newsData?.title?.substring(0, 50) + "..."} />
        </div>
      </div>
      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <div className="flex flex-col gap-y-14 bg-white">
                  <img src={newsData?.image} alt={newsData?.title} />
                  <div className="flex flex-col gap-y-4 px-6 pb-6">
                    <h3 className="text-red-700 uppercase font-medium text-xl">{newsData?.category}</h3>
                    <h2 className="text-3xl text-gray-700 font-bold">{newsData?.title}</h2>
                    <div className="flex gap-x-2 text-xs font-normal text-slate-600">
                      <span>{newsData?.date}</span>
                     <span>{newsData?.writerName}</span>
                    </div>
                    {/* Render processed description using HtmlParser */}
                    <div className="mt-4">{HtmlParser(newsData?.description)}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8">
                  <Search />

                  <div className="w-full flex flex-col gap-y-14 bg-white pt-4">
                    <div className="pl-4 pb-0">
                      <Title title={"Similar news"} />
                    </div>
                    <div className="grid grid-cols-1 gap-y-3">
                      {relatedNews.map((news, index) => (
                        <NewsCard item={news} key={index} />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-white p-4 mt-4">
                    <Category titlestyle={'text-gray-900 font-bold'}/>
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

export default SportsNews;
