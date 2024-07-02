import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "../../components/items/Breadcrumb";
import Search from "./Search";
import Title from "../../components/items/Title";
import Category from "../../components/items/Category";
import PopularNews from "./PopularNews";
import SimpleDetailsNewsCard from "../../components/items/SimpleDetailsNewsCard";
import { base_url } from "../../../config/config";
import { Link, useParams } from "react-router-dom";

const CategoryNews = () => {
  const { category } = useParams();
  const [latestNews, setLatestNews] = useState([]);
  const [categoryNews, setCategoryNews] = useState([]);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/latest/news`);
        setLatestNews(data.news);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    const fetchCategoryNews = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/categorynews/news/${category}`);
        setCategoryNews(data.news);
      } catch (error) {
        console.error("Error fetching category news:", error);
      }
    };

    fetchCategoryNews();
    fetchLatestNews();
  }, [category]); // Add category as a dependency

  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one={category} two="" />
        </div>
      </div>
      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryNews?.map((news, i) => (
                    <SimpleDetailsNewsCard
                      key={i}
                      news={news}
                      type="details-news"
                      height={200}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8">
                  <Search />
                  <div className="w-full flex flex-col gap-y-[14px] bg-white pt-4">
                    <div className="pl-4">
                      <Title title="Recent news" />
                    </div>
                    <div className="grid grid-cols-1 gap-y-4 pt-3">
                      {latestNews?.slice(0, 6).map((r, i) => (
                        <div key={i} className="shadow-sm p-4">
                          <Link to={`/news/${r?.slug}`} className="flex w-full">
                            <div className="group relative overflow-hidden w-[90px] h-[75px]">
                              <div className="w-full h-full group-hover:scale-[1.1] transition-all duration-[1s] relative">
                                <img
                                  src={r.image}
                                  alt={r.title}
                                  onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
                                  className="object-cover w-full h-full"
                                />
                                <div className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"></div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-y-1 w-[calc(100%-90px)] pl-2">
                              <h2 className="text-xs font-semibold hover:text-[#c80000]">
                                {r.title}
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
                  <div className="p-4 bg-white">
                    <Category titleStyle={"text-gray-700 font-bold"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <PopularNews type="Popular news" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNews;
