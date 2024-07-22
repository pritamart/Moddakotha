import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import storeContext from "../../context/storeContext";
import HtmlParser from "react-html-parser";
import { base_url } from "../../config/config";

const View_news = () => {
  const { news_id } = useParams();
  const { store } = useContext(storeContext);
  const [news, setNews] = useState(null);

  useEffect(() => {
    const get_news = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/news/${news_id}`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });

        const processedDescription = replaceIframeAttributes(data?.news?.description);

        setNews({
          title: data?.news?.title,
          img: data?.news?.image,
          description: processedDescription,
          category: data?.news?.category,
          date: data?.news?.date,
          writerName: data?.news?.writerName,
        });
      } catch (error) {
        console.log(error);
      }
    };

    get_news();
  }, [news_id, store.token]);

  const replaceIframeAttributes = (description) => {
    if (!description) return "";

    const regex = /<iframe\s+(.*?)>/g;

    return description.replace(regex, (iframeTag) => {
      if (window.innerWidth <= 768) {
        let updatedIframe = iframeTag.replace(/width="[^"]*"/, 'class="w-full"');
        updatedIframe = updatedIframe.replace(/height="[^"]*"/, 'height="240"');
        return updatedIframe;
      } else {
        let updatedIframe = iframeTag.replace(/width="[^"]*"/, 'class="w-full"');
        updatedIframe = updatedIframe.replace(/height="[^"]*"/, 'height="450"');
        return updatedIframe;
      }
    });
  };

  if (!news) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-md">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-medium">View News</h2>
        <Link
          className="px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600"
          to="/dashboard/news"
        >
          News
        </Link>
      </div>
      {/* <div className="p-4">
        <div className="flex flex-col gap-y-2 mb-6">
          <label className="text-md font-medium text-gray-600" htmlFor="title">
            Title
          </label>
          <input
            readOnly
            value={news.title}
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
            id="title"
          />
        </div>
        <div className="mb-6">
          <div>
            <label
              htmlFor="img"
              className="w-full h-[350px] flex rounded text-[#404040] gap-2 justify-center items-center cursor-pointer border-2 border-dashed"
            >
              <img src={news.img} alt="news" className="h-full" />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 mb-6">
          <label className="text-md font-medium text-gray-600">Description</label>
          <div className="mt-4">{HtmlParser(news.description)}</div>
        </div>
      </div> */}
      <div className="p-6">
      <div className="flex flex-col gap-y-14 bg-white">
        <img src={news.img} alt={news.title} />
        <div className="flex flex-col gap-y-4 px-6 pb-6">
          <h3 className="text-red-700 uppercase font-medium text-xl">{news.category}</h3>
          <h2 className="text-3xl text-gray-700 font-bold">{news.title}</h2>
          <div className="flex gap-x-2 text-xs font-normal text-slate-600">
            <span>{news.date}</span>
            <span>{news.writerName}</span>
          </div>
          <div className="mt-4">{HtmlParser(news.description)}</div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default View_news;
