import React from "react";
import moment from "moment";
import "moment/locale/bn";
import { FaFacebook, FaTwitter, FaYoutube, FaArchive } from "react-icons/fa";
import bg_header from "../../assets/header-bg.jpg";
import adver_image from "../../assets/sample-add.jpg";
import logo from "../../assets/logo.png";
import Header_Category from "./Header_Category";
import { Link } from "react-router-dom";

const Header = () => {
  moment.locale("bn");

  // Customizing the Bengali locale for correct date formatting
  moment.updateLocale("bn", {
    months: [
      "জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", "মে", "জুন", 
      "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
    ],
    weekdays: [
      "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"
    ],
    longDateFormat: {
      LT: "A h:mm সময়",
      LTS: "A h:mm:ss সময়",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm সময়",
      LLLL: "dddd, D MMMM YYYY, A h:mm সময়"
    }
  });

  return (
    <div>
      <div className="px-5 lg:px-8 flex justify-between items-center bg-[#333333] text-[#cccccc]">
        <span className="text-[11px] font-medium">
          {moment().format("LL, dddd")}
        
        </span>
       
        <div className="flex gap-x-[1px]">
        <Link
            to="/news/ArchiveNews"
            className="w-[100px] h-[37px] flex justify-between px-3 items-center bg-[#ffffff2b]"
          >
           <span>Archive</span>  <FaArchive />
          </Link>
          <a
            to="#"
            className="w-[37px] h-[37px] flex justify-center items-center bg-[#ffffff2b]"
          >
            <FaFacebook />
          </a>
          <a
            to="#"
            className="w-[37px] h-[37px] flex justify-center items-center bg-[#ffffff2b]"
          >
            <FaTwitter />
          </a>
          <a
            to="#"
            className="w-[37px] h-[37px] flex justify-center items-center bg-[#ffffff2b]"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${bg_header})`,
          backgroundSize: "cover",
        }}
      >
        <div className="px-8 py-14">
          <div className="flex justify-between items-center flex-wrap">
            <div className="md:w-4/12 w-full">
              <div className="flex flex-col justify-center items-center md:items-start">
                <img className="w-[200px] h-[45px]" alt="logo" src={logo} />
                <h2 className="text-[#cccccc]">নতুন পথের সাহসের সন্ধানে</h2>
              </div>
            </div>
            <div className="md:w-8/12 w-full hidden md:block">
              <div className="w-full flex justify-end">
                <img src={adver_image} alt="Advertisement" height={90} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Header_Category />
    </div>
  );
};

export default Header;
