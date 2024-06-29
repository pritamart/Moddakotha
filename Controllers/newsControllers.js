const { formidable } = require("formidable");
const cloudinary = require("cloudinary").v2;
const newsModel = require("../models/newsModel");
const galleryModel = require("../models/galleryModel");
const {
  mongo: { ObjectId },
} = require("mongoose");
const moment = require("moment");

class newsController {
  add_news = async (req, res) => {
    const { id, category, name } = req.userInfo;
    const form = formidable({});
    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret,
      secure: true,
    });
    try {
      const [fields, files] = await form.parse(req);
      const { url } = await cloudinary.uploader.upload(
        files.image[0].filepath,
        { folder: "news_images" }
      );
      const { title, description } = fields;
      const news = await newsModel.create({
        writerId: id,
        title: title[0].trim(),
        slug: title[0].trim().split(" ").join("-"),
        category,
        description: description[0],
        date: moment().format("LL"),
        WriterName: name,
        image: url,
      });
      return res.status(200).json({ message: "news add success", news });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  update_news_update = async (req, res) => {
    const { role } = req.userInfo;
    const { news_id } = req.params;
    const { status } = req.body;
    if (role === "admin") {
      const news = await newsModel.findByIdAndUpdate(
        news_id,
        { status },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "News status update success", news });
    } else {
      return res.status(401).json({ message: "You can not access this api" });
    }
  };
  get_images = async (req, res) => {
    const { id } = req.userInfo;
    try {
      const images = await galleryModel
        .find({ writerId: new ObjectId(id) })
        .sort({ createdAt: -1 });
      return res.status(201).json({ images });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  add_images = async (req, res) => {
    const form = formidable({});
    const { id } = req.userInfo;

    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret,
      secure: true,
    });

    try {
      const [_, files] = await form.parse(req);
      let allImages = [];
      const { images } = files;

      for (let i = 0; i < images.length; i++) {
        const { url } = await cloudinary.uploader.upload(images[i].filepath, {
          folder: "news_images",
        });
        allImages.push({ writerId: id, url });
      }

      const image = await galleryModel.insertMany(allImages);
      return res
        .status(201)
        .json({ images: image, message: "images upload success" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  get_dashboard_news = async (req, res) => {
    const { id, role } = req.userInfo;
    try {
      if (role === "admin") {
        const news = await newsModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ news });
      } else {
        const news = await newsModel
          .find({ writerId: new ObjectId(id) })
          .sort({ createdAt: -1 });
        return res.status(200).json({ news });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  get_dashboard_single_news = async (req, res) => {
    const { news_id } = req.params;
    try {
      const news = await newsModel.findById(news_id);
      return res.status(200).json({ news });
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({ message: "Internal server error" });
    }
  };
  update_news = async (req, res) => {
    const { news_id } = req.params;
    const { id, name } = req.userInfo;
    const form = formidable({});

    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret,
      secure: true,
    });

    try {
      const [fields, files] = await form.parse(req);
      let updateData = {
        title: fields.title?.[0].trim(),
        slug: fields.title?.[0]?.trim().split(" ").join("-"),
        description: fields.description?.[0],
        WriterName: name,
      };

      // Check if a new image was uploaded
      if (files.new_image) {
        const { url } = await cloudinary.uploader.upload(
          files.new_image[0].filepath,
          {
            folder: "news_images",
          }
        );
        updateData.image = url;
      }

      // Update news in the database
      const updatedNews = await newsModel.findByIdAndUpdate(
        news_id,
        { $set: updateData },
        { new: true }
      );

      if (!updatedNews) {
        return res.status(404).json({ message: "News not found" });
      }

      return res
        .status(200)
        .json({ message: "News updated successfully", news: updatedNews });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // news wall //
  get_all_news = async (req, res) => {
    try {
        const category_news = await newsModel.aggregate([
            {
                $sort: { createdAt: -1 }
            },
            {
                $match: {
                    status: 'active'
                }
            },
            {
                $group: {
                    _id: "$category",
                    news: {
                        $push: {
                            _id: '$_id',
                            title: '$title',
                            slug: '$slug',
                            writerName: '$writerName',
                            image: '$image',
                            description: '$description',
                            date: '$date',
                            category: '$category'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    news: {
                        $slice: ['$news', 5]
                    }
                }
            }
        ])

        const news = {}
        for (let i = 0; i < category_news.length; i++) {
            news[category_news[i].category] = category_news[i].news
        }
        return res.status(200).json({ news })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
  
  
}

module.exports = new newsController();
