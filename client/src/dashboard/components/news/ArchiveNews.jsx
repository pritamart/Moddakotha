import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API calls
import toast from "react-hot-toast";
import { AiOutlineCalendar, AiOutlineSearch } from "react-icons/ai";
import PopularNews from "../../pages/app/PopularNews";
import Title from "../items/Title";
import { base_url } from "../../../config/config";
import SimpleDetailsNewsCard from "../items/SimpleDetailsNewsCard";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ArchiveNews = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1); // Set to yesterday
  
  const [selectedDate, setSelectedDate] = useState(yesterday);
  const [selectedMonth, setSelectedMonth] = useState(yesterday.getMonth());
  const [selectedYear, setSelectedYear] = useState(yesterday.getFullYear());
  const [news, setNews] = useState([]); // State to store fetched news
  const [loading, setLoading] = useState(false); // State to handle loading

  // Update selectedDate when selectedYear or selectedMonth changes
  useEffect(() => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDate.getDate());
    setSelectedDate(newDate);
  }, [selectedYear, selectedMonth]);

  // Fetch news data from API
  const fetchNews = async () => {
    setLoading(true); // Start loading
    try {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(selectedDate);

      const res = await axios.get(`${base_url}/api/search/old/news`, {
        params: { value: formattedDate } // Pass date as query parameter
      });

      setNews(res.data.news);
      setLoading(false); // End loading
    } catch (error) {
      console.error("Error fetching news details:", error);
      setLoading(false); // End loading
    }
  };

  const handleSearchClick = () => {
    console.log(`Selected date for toast: ${formatDate(selectedDate)}`);
    toast.success(`Selected date: ${formatDate(selectedDate)}`);
    fetchNews(); // Fetch news data when search is clicked
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleMonthClick = (index) => {
    if (index <= currentMonth || selectedYear < currentYear) {
      setSelectedMonth(index);
    }
  };

  const handleDayClick = (day) => {
    const newDate = new Date(selectedYear, selectedMonth, day);
    setSelectedDate(newDate);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  // Determine if a month is disabled based on the current date
  const isMonthDisabled = (monthIndex) => {
    return selectedYear === currentYear ? monthIndex > currentMonth : false;
  };

  // Determine if a day is disabled based on the current date
  const isDayDisabled = (day) => {
    const now = new Date();
    const selectedMonthDate = new Date(selectedYear, selectedMonth, day);
    return selectedMonthDate > now || (selectedYear === now.getFullYear() && selectedMonth === now.getMonth() && day === now.getDate());
  };

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-red-700">
          <span className="flex items-center justify-center">
            Select a Date <AiOutlineCalendar className="ml-2 text-2xl" />
          </span>
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Responsive Layout Container */}
          <div className="flex flex-col md:flex-row gap-10">
            {/* Year Selection - Single Column Layout */}
            <div className="flex-none w-full md:w-40">
              <h3 className="text-lg font-medium mb-2 text-center text-red-600">Select Year</h3>
              <div className="flex flex-col gap-3 py-1">
                {Array.from({ length: 5 }, (_, i) => currentYear - 4 + i).map(year => (
                  <div
                    key={year}
                    className={`p-2 text-center border rounded cursor-pointer ${selectedYear === year ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    onClick={() => handleYearClick(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            </div>

            {/* Month Selection */}
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2 text-center text-red-600">Select Month</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {months.map((month, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center p-4 text-center border rounded cursor-pointer ${selectedMonth === index && !isMonthDisabled(index) ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"} text-sm ${isMonthDisabled(index) ? "cursor-not-allowed opacity-50" : ""}`}
                    onClick={() => handleMonthClick(index)}
                  >
                    {month}
                  </div>
                ))}
              </div>
            </div>

            {/* Day Selection */}
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2 text-center text-red-600">Select Date</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: daysInMonth(selectedMonth, selectedYear) }).map((_, day) => (
                  <div
                    key={day + 1}
                    className={`p-2 text-center border rounded cursor-pointer ${selectedDate.getDate() === day + 1 && !isDayDisabled(day + 1) ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"} ${isDayDisabled(day + 1) ? "cursor-not-allowed opacity-50" : ""}`}
                    onClick={() => !isDayDisabled(day + 1) && handleDayClick(day + 1)}
                  >
                    {day + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleSearchClick}
            className="mt-6 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 ease-in-out flex items-center justify-center gap-2"
          >
            <AiOutlineSearch className="text-xl" /> <span className="text-lg">Search News</span>
          </button>
        </div>
      </div>
      <Title title={`News of ${formatDate(selectedDate)}`} />
      {/* Display News */}
      <div className="mt-6">
        {loading ? (
          <p className="text-center text-gray-700">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
            {news.length === 0 ? (
              <p className="text-center text-gray-700">No archive news found for this date.</p>
            ) : (
              news.map((newsItem, i) => (
                <SimpleDetailsNewsCard
                  key={i}
                  news={newsItem}
                  type="details-news"
                  height={200}
                />
              ))
            )}
          </div>
        )}
      </div>
      <PopularNews type="Recent news" />
    </div> //lkojiojioj
  ); 
};

export default ArchiveNews;
