import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { base_url } from "../../../config/config";
import axios from "axios";


const Category = ({ titlestyle }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const categories = await axios.get(`${base_url}/api/category/all`);
      setCategories(categories.data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="w-full gap-y-[14px]">
      <div
        className={`text-xl font-bold ${titlestyle} relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:-left-0 pl-3`}
      >
        Category
      </div>
      <div
        className={`flex- flex-col justify-start items-start gap-y-3 ${titlestyle} pt-3`}
      >
        {categories && categories.length > 0 && categories.map((item, i) => (
          <li className="list-none" key={i}>
            <Link to={`/news/category/${item?.category}`}>{item.category} ({item.count})</Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Category;
