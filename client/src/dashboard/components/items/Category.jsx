import { Link } from "react-router-dom";
import React from "react";

const Category = ({ categories, titlestyle }) => {
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
        {[1, 2, 3, 4, 5, 6].map((category, i) => (
          <li className="p-2 list-none" key={i}>
            <Link to={'#'}>Category {i+1}</Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Category;
