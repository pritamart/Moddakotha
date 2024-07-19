import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/user-02.png";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import NewsContent from "../components/NewsContent";
import axios from "axios";
import { base_url } from "../../config/config";
import { useSpring, animated } from "@react-spring/web";

const AdminIndex = () => {
  const [newsCounts, setNewsCounts] = useState({
    total: 0,
    active: 0,
    deactive: 0,
    pending: 0,
  });

  const statuscount = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/all/status`);
      console.log(data);

      // Assuming the API response is in the format [total_count, active_count, deactive_count, pending_count]
      const [total, active, deactive, pending] = data;
      setNewsCounts({
        total,
        active,
        deactive,
        pending,
      });
    } catch (error) {
      console.error("Error fetching news status counts:", error);
    }
  };

  useEffect(() => {
    statuscount();
  }, []);

  const { total, active, deactive, pending } = newsCounts;

  const totalSpring = useSpring({ number: total, from: { number: 0 } });
  const activeSpring = useSpring({ number: active, from: { number: 0 } });
  const deactiveSpring = useSpring({ number: deactive, from: { number: 0 } });
  const pendingSpring = useSpring({ number: pending, from: { number: 0 } });

  return (
    <div className="mt-2">
      <div className="grid grid-cols-4 gap-x-4">
        <div
          className="w-full p-8 flex justify-center flex-col rounded-md items-center
          gap-y-2 bg-violet-700 text-white"
        >
          <animated.span className="text-xl font-bold">
            {totalSpring.number.to((n) => n.toFixed(0))}
          </animated.span>
          <span className="text-md">Total News</span>
        </div>

        <div
          className="w-full p-8 flex justify-center flex-col rounded-md items-center
          gap-y-2 bg-blue-400 text-white"
        >
          <animated.span className="text-xl font-bold">
            {pendingSpring.number.to((n) => n.toFixed(0))}
          </animated.span>
          <span className="text-md">Pending News</span>
        </div>

        <div
          className="w-full p-8 flex justify-center flex-col rounded-md items-center
          gap-y-2 bg-green-700 text-white"
        >
          <animated.span className="text-xl font-bold">
            {activeSpring.number.to((n) => n.toFixed(0))}
          </animated.span>
          <span className="text-md">Active News</span>
        </div>

        <div
          className="w-full p-8 flex justify-center flex-col rounded-md items-center
          gap-y-2 bg-orange-400 text-white"
        >
          <animated.span className="text-xl font-bold">
            {deactiveSpring.number.to((n) => n.toFixed(0))}
          </animated.span>
          <span className="text-md">Deactive News</span>
        </div>

        {/* <div
          className="w-full p-8 flex justify-center flex-col rounded-md items-center
          gap-y-2 bg-white text-slate-700"
        >
          <span className="text-xl font-bold">4</span>
          <span className="text-md">Writers</span>
        </div> */}
      </div>
      <div className="bg-white p-4 mt-5">
        {/* <div className="flex justify-between items-center pb-4">
          <h2>Recent News</h2>
          <Link to="/all-news">View all</Link>
        </div> */}
       
        <NewsContent />
      </div>
    </div>
  );
};

export default AdminIndex;
