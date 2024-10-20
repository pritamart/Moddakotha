import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/bn";
import { FaFacebook, FaTwitter, FaYoutube, FaArchive } from "react-icons/fa";
import logo from "../../assets/logo.png";
import Header_Category from "./Header_Category";
import { Link } from "react-router-dom";

const Header = () => {
  const [backgroundSize, setBackgroundSize] = useState("80%");
  const [backgroundPosition, setBackgroundPosition] = useState("center");

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setBackgroundSize("contain"); // Ensures the image is fully visible without cropping
      setBackgroundPosition("center top"); // Adjusts position to prevent cropping
    } else {
      setBackgroundSize("80%");
      setBackgroundPosition("center");
    }
  };

  useEffect(() => {
    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  moment.locale("bn");

  moment.updateLocale("bn", {
    months: [
      "জানুয়ারী",
      "ফেব্রুয়ারী",
      "মার্চ",
      "এপ্রিল",
      "মে",
      "জুন",
      "জুলাই",
      "আগস্ট",
      "সেপ্টেম্বর",
      "অক্টোবর",
      "নভেম্বর",
      "ডিসেম্বর",
    ],
    weekdays: [
      "রবিবার",
      "সোমবার",
      "মঙ্গলবার",
      "বুধবার",
      "বৃহস্পতিবার",
      "শুক্রবার",
      "শনিবার",
    ],
    longDateFormat: {
      LT: "A h:mm সময়",
      LTS: "A h:mm:ss সময়",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm সময়",
      LLLL: "dddd, D MMMM YYYY, A h:mm সময়",
    },
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
            <span>Archive</span> <FaArchive />
          </Link>
          <a
            href="#"
            className="w-[37px] h-[37px] flex justify-center items-center bg-[#ffffff2b]"
          >
            <FaFacebook />
          </a>
          <a
            href="#"
            className="w-[37px] h-[37px] flex justify-center items-center bg-[#ffffff2b]"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="w-[37px] h-[37px] flex justify-center items-center bg-[#ffffff2b]"
          >
            <FaYoutube />
          </a>
        </div>
      </div>

      <div
        className="h-[100px] sm:h-[120px] md:h-[150px] lg:h-[180px] w-full p-2 sm:p-4 md:p-8 lg:p-10 bg-center mb-2 sm:mb-4"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: backgroundPosition, // Dynamically adjust based on screen size
          backgroundSize: backgroundSize, // Dynamically adjust size
          marginTop: "15px",

          // marginTop: "5px",
          // marginBottom: "-5px",
        }}
      ></div>

      <Header_Category />
    </div>
  );
};

export default Header;
