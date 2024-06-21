import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import JoditEditor from "jodit-react";
import Galler from "../components/Galler";
import { base_url } from "../../config/config";
import axios from "axios";
import storeContext from "../../context/storeContext";
import toast from "react-hot-toast";
import logo from "../components/img/logo.png";

const Edit_news = () => {
  const { news_id } = useParams();
  const { store } = useContext(storeContext);
  const [show, setShow] = useState(false);
  const editor = useRef(null);
  const [old_image, setOldImage] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");

  const imageHandel = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setImg(URL.createObjectURL(files[0]));
      setImage(files[0]);
    }
  };

  const [loader, setLoader] = useState(false);

  const added = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("new_image", image);
    formData.append("old_image", old_image);
    try {
      setLoader(true);
      const { data } = await axios.put(
        `${base_url}/api/news/update/${news_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setLoader(false);
      toast.success(data.message);
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message);
    }
  };

  const [images, setImages] = useState([]);

  const get_images = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/images`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setImages(data.images);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_images();
  }, []);

  const [imageLoader, setImageLoader] = useState(false);
  const imageHandeler = async (e) => {
    const files = e.target.files;
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
      setImageLoader(true);
      const { data } = await axios.post(
        `${base_url}/api/images/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setImageLoader(false);

      setImages([...images, ...data.images]);

      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setImageLoader(false);
      toast.error(error.response.data.message);
    }
  };

  const get_news = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news/${news_id}`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setTitle(data?.news?.title);
      setDescription(data?.news?.description);
      setImg(data?.news?.image);
      setOldImage(data?.news?.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_news();
  }, [news_id]);

  return (
    <div className="bg-white rounded-md">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-medium">Edit News</h2>
        <Link
          className="px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600"
          to="/dashboard/news"
        >
          News
        </Link>
      </div>
      <div className="p-4">
        <form onSubmit={added}>
          <div className="flex flex-col gap-y-2 mb-6">
            <label
              className="text-md font-medium text-gray-600"
              htmlFor="title"
            >
              Title
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              name="title"
              className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
              id="title"
            />
          </div>
          <div className="mb-6">
            <div>
              <label
                htmlFor="img"
                className={`w-full h-[350px] flex rounded text-[#404040] gap-2 justify-center items-center cursor-pointer border-2 border-dashed`}
              >
                {img ? (
                  <img src={img} alt="news" className="h-full" />
                ) : (
                  <div className="flex justify-center items-center flex-col gap-y-2">
                    <span className="text-2xl">
                      <MdCloudUpload />
                    </span>
                    <span>Select Image</span>
                  </div>
                )}
              </label>
              <input
                
                onChange={imageHandel}
                style={{ position: "absolute", left: "-9999px" }} // Off-screen positioning
                type="file"
                id="img"
                name="image"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2 mb-6">
            <div className="flex flex-col gap-y-2 mb-6">
              <div className="flex justify-start items-start gap-x-2">
                <h2>Description</h2>
                <div onClick={() => setShow(true)}>
                  <span className="text-2xl cursor-pointer">
                    <MdCloudUpload />
                  </span>
                </div>
              </div>
              <div>
                <JoditEditor
                  ref={editor}
                  value={description}
                  tabIndex={1}
                  onBlur={(newContent) => setDescription(newContent)}
                  onChange={(newContent) => {}}
                />
              </div>
            </div>

            <div className="mt-2">
              <button
                disabled={loader}
                className="px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600"
              >
                {loader ? "Loading..." : "Update News"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <input
        className="hidden"
        onChange={imageHandeler}
        type="file"
        multiple
        id="images"
      />
      {show && <Galler setShow={setShow} images={images} />}
    </div>
  );
};

export default Edit_news;
