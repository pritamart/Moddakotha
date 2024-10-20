import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { base_url } from "../../config/config";
import storeContext from "../../context/storeContext";

const AddWriter = () => {
  const navigate = useNavigate();
  const { store } = useContext(storeContext);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
  });
  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [loader, setLoader] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${base_url}/api/news/writer/add`,
        state,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setLoader(false);
      toast.success(data.message);
      navigate("/dashboard/writers");
    } catch (error) {
      setLoader(false);

      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-md">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-medium"> Add Writers</h2>
        <Link
          className="px-3 py-[6px] bg-purple-500 rounded-sm
               text-white hover:bg-purple-600"
          to="/dashboard/writers"
        >
          Writer
        </Link>
      </div>
      <div className="p-4">
        <form onSubmit={submit}>
          <div className="grid grid-cols-2 gap-x-8 mb-3">
            <div className="flex flex-col gap-y-2">
              <label
                className="text-md font-medium text-gray-600"
                htmlFor="name"
              >
                Name
              </label>
              <input
                onChange={inputHandler}
                value={state.name}
                required
                type="text"
                placeholder="Name"
                name="name"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300
                          focus:border-green-500 h-10"
                id="name"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label
                className="text-md font-medium text-gray-600"
                htmlFor="name"
              >
                Category
              </label>
              <select
                onChange={inputHandler}
                value={state.category}
                required
                name="category"
                id="category"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300
                          focus:border-green-500 h-10"
              >
                <option>---Select Category---</option>
                {/* <option value="Education">Education</option>
                <option value="Travel">Travel</option>
                <option value="Health">Health</option>
                <option value="International">International</option> */}
                {/* <option value="Sports">Sports</option> */}
                {/* <option value="Technology">Technology</option> */}
                

                <option value="ত্রিপুরা">ত্রিপুরা</option> {/* new */}
                <option value="দেশ">দেশ</option>  {/* International*/}
                <option value="বানিজ্য">বানিজ্য</option> {/*Travel*/}
                <option value="ম্যাগরোল">ম্যাগরোল</option> {/*Health*/}
                <option value="খেলা">খেলা</option> {/* sports*/}
                <option value="পড়াশুনা">পড়াশুনা</option> {/* Education*/}
                <option value="টেক">টেক</option> {/*Technology*/}
                <option value="সম্পাদকীয়">সম্পাদকীয়</option> {/*Technology*/}
                <option value="স্বাস্থ্য">স্বাস্থ্য</option> {/*স্বাস্থ্য*/}
                
                
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 mb-3">
            <div className="flex flex-col gap-y-2">
              <label
                className="text-md font-medium text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={inputHandler}
                value={state.email}
                required
                type="email"
                placeholder="email"
                name="email"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300
                          focus:border-green-500 h-10"
                id="email"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label
                className="text-md font-medium text-gray-600"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={inputHandler}
                value={state.password}
                required
                type="password"
                placeholder="password"
                name="password"
                className="px-3 py-2 rounded-md outline-0 border border-gray-300
                          focus:border-green-500 h-10"
                id="password"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              draggable={loader}
              className="px-3 py-[6px] bg-indigo-500 rounded-lg
               text-white hover:bg-indigo-600"
            >
              {loader ? "Loading..." : "Add Writer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWriter;
