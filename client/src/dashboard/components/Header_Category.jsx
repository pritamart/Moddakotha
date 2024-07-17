import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { base_url } from "../../config/config";
import axios from "axios";

const Header_Category = () => {
  const location = useLocation();
  const path = location.pathname;
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [cateShow, setCateShow] = useState(false);
  const [state, setState] = useState('');
  const navigate = useNavigate();  // Use useNavigate hook

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/news?value=${state}`);
    setState('');
    setShow(false);
  }

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
    <div className="w-full">
      <div className="bg-[#c80000] w-full text-white uppercase font-semibold relative">
        <div className="px-8 flex justify-between items-center relative h-[48px]">
          <div
            onClick={() => setCateShow(!cateShow)}
            className={`text-3xl flex lg:hidden font-bold h-full w-[48px] cursor-pointer justify-center items-center ${cateShow ? "bg-[#00000026]" : ""}`}
          >
            <BsList />
          </div>
          <div className="flex-wrap hidden lg:flex">
            <Link
              className={`px-6 py-[13px] font-medium ${path === "/" ? "bg-[#00000026]" : ""}`}
              to="/"
            >
              HOME
            </Link>
            {categories.length > 0 &&
              categories.map((c, i) => (
                <Link
                  key={i}
                  className={`px-6 font-medium py-[13px] ${path === `/news/category/${c.category}` ? "bg-[#00000026]" : ""}`}
                  to={`/news/category/${c.category}`}
                >
                  {c.category}
                </Link>
              ))}
          </div>
          <div className="h-full w-[48px]">
            <div
              onClick={() => setShow(!show)}
              className={`text-xl ${show ? "bg-[#00000026]" : ""} font-bold h-full w-full cursor-pointer justify-center flex items-center hover:bg-[#00000026]`}
            >
              {show ? <IoMdClose /> : <AiOutlineSearch />}
            </div>
            <div
              className={`absolute lg:block transition-none text-slate-700 z-20 shadow-lg lg:right-[30px] top-[50px] w-full lg:w-auto right-0 ${show ? "visible" : "invisible"}`}
            >
              <div className="p-3 bg-white rounded-lg">
                <form onSubmit={search} className="flex">
                  <div className="w-[calc(100%-45px)] h-[40px]">
                    <input
                      value={state}
                      required
                      onChange={(e) => setState(e.target.value)}
                      type="text"
                      placeholder="search"
                      className="h-full w-full p-2 border border-slate-300 outline-none bg-slate-100"
                    />
                  </div>
                  <button className="w-[45px] hover:bg-red-700 cursor-pointer h-[40px] flex justify-center outline-none items-center bg-red-600 text-white text-xl">
                    <AiOutlineSearch />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {cateShow && (
        <div className="flex flex-wrap lg:hidden py-2 px-[30px]">
          <Link
            className={`px-4 py-[5px] font-medium ${path === "/" ? "bg-[#00000026]" : ""}`}
            to="/"
          >
            প্রবন্ধ
          </Link>
          {categories.length > 0 &&
            categories.map((c, i) => (
              <Link
                key={i}
                className={`px-4 font-medium py-[5px] ${path === `/news/category/${c.category}` ? "bg-[#00000026]" : ""}`}
                to={`/news/category/${c.category}`}
              >
                {c.category}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default Header_Category;
