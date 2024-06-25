import React from "react";
import HeadLine from "../../components/HeadLine";
import Footer from "../../components/Footer";
import LatestNews from "../../components/items/LatesNews";
import Title from "../../components/items/Title";
import SimpleNewsCard from "../../components/items/SimpleNewsCard";
import PopularNews from "./PopularNews";
import DetailsNewsRow from "../../components/items/DetailsNewsRow"
import DetailsNewsCol from "./DetailsNewsCol";
import DetailsNews from "./DetailsNews";
import NewsCard from "../../components/items/NewsCard";

const NewsWall = () => {
  return (
    <div>
      {" "}
      <main>
        <HeadLine />
        <div className="bg-slate-100">
          <div className="px-4 md:px-8 py-8">
            <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12">
                <LatestNews />
              </div>
              <div className="w-full lg:w-6/12 mt-5 lg:mt-0">
                <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                  <Title title="বিজ্ঞানের খবর" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                    {[1, 2, 3, 4].map((item, i) => (
                      <SimpleNewsCard item={item} key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <PopularNews type="popular news" />
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <DetailsNewsRow category="খেলা" type="details-news" />

                  <DetailsNews />
                </div>
                <div className="w-full lg:w-4/12">
                  <DetailsNewsCol />
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12">
                  <div className="pr-2">
                    <DetailsNewsCol />
                  </div>
                </div>
                <div className="w-full lg:w-8/12">
                  <div className="pl-2">
                    <DetailsNewsRow category="খেলা" type="details-news" />
                    <DetailsNews />
                  </div>
                </div>
              </div>
            </div>

                    
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  {/* <div className="pr-2">
                <DetailsNewsCol />
              </div> */}
                  <div>
                    <DetailsNewsRow category="খেলা" type="details-news" />
                  </div>
                </div>
                <div className="w-full lg:w-4/12">
                  <div className="pl-2">
                    <Title title="সাম্প্রতিক খবর" />
                    <div className="grid grid-cols-1 gap-y-[14px] mt-4">
                      {[1, 2, 3, 4].map((_, i) => (
                        <NewsCard key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>




          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsWall;
