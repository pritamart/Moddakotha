import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../../../config/config';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`${base_url}/api/images/news_gallery`);
        setImages(res.data.images);
        console.log(res.data.images);
      } catch (error) {
        console.error("Error fetching popular news:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-[14px]">
      <div className="text-xl font-bold text-white relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:-left-0 pl-3">
        Gallery
      </div>
      <div className="grid grid-cols-3 gap-2">
        {images && images.length > 0 && images.map((item, i) => (
          <div key={i} className="w-[85px] h-[85px] relative">
            <img
              className=""
              src={item.image}
              alt="images"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
