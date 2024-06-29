import React from "react";
import Breadcrumb from "../../components/items/Breadcrumb";
import SimpleDetailsNewsCard from "../../components/items/SimpleDetailsNewsCard";
import Search from "./Search";
import Title from "../../components/items/Title";
import NewsCard from "../../components/items/NewsCard";
import Category from "../../components/items/Category";
import PopularNews from "./PopularNews"

const SportsNews = ({params}) => {
  // const { slug } = params;
  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one="category" two={"sports"} />
        </div>
      </div>
      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"> */}
                <div className="grid grid-cols-1 gap-3">
                    <SimpleDetailsNewsCard news={{}} type="details-news" height={400} />
                  {/* {[1, 2, 3, 4, 5, 6].map((news, index) => (
                  ))} */}
                </div>
              </div>
            </div>
            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8">
                  <Search />

                  <div className="w-full flex flex-col gap-y-[14px] bg-white pt-4">
                    <div className="pl-4">
                      <Title title={"Recent news"} />
                    </div>
                    <div className="grid grid-cols-1 gap-y-3">
                      {[1, 2, 3, 4, 5, 6].map((news, index) => (
                        <NewsCard item={{}} key={index} />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className=" bg-white p-4 mt-4">
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
    </div>
  );
}

export default SportsNews