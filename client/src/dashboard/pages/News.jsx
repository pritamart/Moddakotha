import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NewsContent from "../components/NewsContent";
import storeContext from "../../context/storeContext";

const News = () => {
  const { store } = useContext(storeContext);
  return (
    <div className="bg-white rounded-md">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-medium"> News</h2>

        {store.userInfo &&  store.userInfo.role !== "admin" && (
          <Link
            className="px-3 py-[6x] bg-purple-500 rounded-sm
               text-white hover:bg-purple-600"
            to="/dashboard/news/create"
          >
            Create News
          </Link>
        )}
      </div>
      <NewsContent />
      
    </div>
  );
};

export default News;
