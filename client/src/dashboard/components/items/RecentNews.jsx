import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { base_url } from '../../../config/config';
import NewsCard from './NewsCard';
import { Link } from 'react-router-dom';

const RecentNews = ({type}) => {
    const [latestNews, setLatestNews] = useState([]);
    useEffect(() => {
        const fetchLatestNews = async () => {
          try {
            const { data } = await axios.get(`${base_url}/api/latest/news`);
            setLatestNews(data.news);
          } catch (error) {
            console.error("Error fetching latest news:", error);
          }
        };
        fetchLatestNews();
      }, []);
  return (
<div className="grid grid-cols-1 gap-y-4 pt-3}"> 
{latestNews?.slice(0,4).map((r, i) => (
  <Link key={i} to={"#"} className={`flex w-full ${type === 'search' ? 'bg-white' : ''}`}>
    <div className="group relative overflow-hidden w-[90px] h-[75px]">
      <div className="w-full h-full group-hover:scale-[1.1] transition-all duration-[1s] relative">
        <img
          src={r.image}
          alt="Travel Image"
          className="object-cover w-full h-full"
        />
        <div className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"></div>
      </div>
    </div>
    <div className="flex flex-col gap-y-1 w-[calc(100%-90px)] pl-2">
      <Link to={`/news/${r?.slug}`}>
      
      <h2  className="text-xs font-semibold text-white hover:text-[#c80000]">
        {r.title.slice(0, 85)}...
      </h2>
      </Link>
      <div className="flex gap-x-2 text-xs font-normal text-white">
        <span>{r.date}</span>
        <span>{r.writerName}</span>
      </div>
    </div>
  </Link>
))}
</div>
  )
}

export default RecentNews