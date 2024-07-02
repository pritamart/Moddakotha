import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import Category from "./items/Category";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import axios from "axios";
import { base_url } from "../../config/config";
import Gallery from "./items/Gallery";
import RecentNews from "./items/RecentNews";


const Footer = () => {
  const location = useLocation();
  const path = location.pathname;
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [cateShow, setCateShow] = useState(false);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${base_url}/api/category/all`);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full bg-[#1e1919]">
      <div className="px-4 md:px-8 py-10 gap-12 grid lg:grid-cols-4 grid-cols-1">
        <div className="flex flex-col gap-y-[14px] items-center justify-center">
          <div className="relative h-[75px] w-[200px]">
            <img src={Logo} alt="Logo" className="object-contain" />
          </div>
          <h4 className="text-slate-300 font-semibold text-center">
            ‘মোদ্দাকথা’ নামটি শুধুমাত্র সংবাদ মাধ্যমের জন্য আমরা যে নাম দিয়েছি
            তা নয়, আমরা এই নামটি দিয়েছি সমাজের প্রতিটি কোণ, প্রতিটি শ্রেণি,
            প্রতিটি পদক্ষেপকে ফোকাস করার জন্য। আমরা সত্য উপস্থাপন করতে সর্বদা
            প্রস্তুত। আমরা নিরপেক্ষ নই, আমরা সত্যের প্রতি পক্ষপাতদুষ্ট।
          </h4>
          <h4 className="text-slate-300">
            আমাদের সাথে যোগাযোগ করুন: info@moddhakotha.in /
            moddhakotha@gmail.com
          </h4>
        </div>
      <Gallery />
      

        <div>
          <Category categories={[]} titlestyle="text-white" />
        </div>

        <div className="flex flex-col gap-y-[14px]">
          <div className="text-xl font-bold text-white relative pl-3 before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:-left-0">
            Recent News
           
          </div>
          {/* <div className="grid grid-cols-1 gap-y-4 pt-3">
            {news?.map((r, i) => (
              <Link key={i} to={"#"} className="flex w-full">
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
                  <h2 className="text-xs font-semibold text-white hover:text-[#c80000]">
                    {r.title}
                  </h2>
                  <div className="flex gap-x-2 text-xs font-normal text-white">
                    <span>{r.date}</span>
                    <span>{r.writerName}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div> */}
          <RecentNews />
        </div>
      </div>
      <div className="w-full bg-[#262323]">
        <div className="px-4 md:px-8 py-5 flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2 text-gray-400 justify-start items-center">
            <span>© 2024 Moddhakotha. All rights reserved.</span>
            <Link to={"login"} className="inline-block">
              <button className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 hover:text-white hover:rounded-lg transition duration-300 ease-in-out transform  hover:shadow-lg">
                Admin login
              </button>
            </Link>
          </div>

          <div className="flex gap-x-1">
            <a
              href="#"
              className="w-[37px] h-[37px] text-white flex justify-center items-center bg-[#ffffff2b]"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="w-[37px] h-[37px] text-white flex justify-center items-center bg-[#ffffff2b]"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-[37px] h-[37px] text-white flex justify-center items-center bg-[#ffffff2b]"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
