const { formidable } = require("formidable");
const cloudinary = require("cloudinary").v2;
const newsModel = require("../models/newsModel");
const galleryModel = require("../models/galleryModel");
const {
  mongo: { ObjectId },
} = require("mongoose");
const moment = require("moment");

class newsController {

   get_statuscount = async (req, res) => {
    try {
        const statuscount = await newsModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    status: "$_id",
                    count: 1,
                },
            },
        ]);

        // Initialize default counts
        let total_count = 0;
        let active_count = 0;
        let deactive_count = 0;
        let pending_count = 0;

        // Process the aggregation result
        statuscount.forEach(item => {
            total_count += item.count;
            if (item.status === 'active') {
                active_count = item.count;
            } else if (item.status === 'deactive') {
                deactive_count = item.count;
            } else if (item.status === 'pending') {
                pending_count = item.count;
            }
        });

        // Format the final output
        const result = [total_count, active_count, deactive_count, pending_count];

        return res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};




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
      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });

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
        writerName: name,
        image: url,
      });
      return res.status(200).json({ message: "News added successfully", news });
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
        .json({ message: "News status update successful", news });
    } else {
      return res.status(401).json({ message: "You cannot access this API" });
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
      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });

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
        .json({ images: image, message: "Images uploaded successfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_dashboard_news = async (req, res) => {
    const { id, role } = req.userInfo;
    try {
      let news;
      if (role === "admin") {
        news = await newsModel.find({}).sort({ createdAt: -1 });
      } else {
        news = await newsModel
          .find({ writerId: new ObjectId(id) })
          .sort({ createdAt: -1 });
      }
      return res.status(200).json({ news });
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

  delete_news = async (req, res) => {
    const { news_id } = req.params;
    try {
      const news = await newsModel.findByIdAndDelete(news_id);
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      return res.status(200).json({ message: "News deleted successfully" });
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
      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });

      let updateData = {
        title: fields.title?.[0]?.trim(),
        slug: fields.title?.[0]?.trim().split(" ").join("-"),
        description: fields.description?.[0],
        writerName: name,
      };

      if (files.new_image) {
        const { url } = await cloudinary.uploader.upload(
          files.new_image[0].filepath,
          {
            folder: "news_images",
          }
        );
        updateData.image = url;
      }

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

  get_all_news = async (req, res) => {
    try {
      const category_news = await newsModel.aggregate([
        {
          $sort: { createdAt: -1 },
        },
        {
          $match: {
            status: "active",
          },
        },
        {
          $group: {
            _id: "$category",
            news: {
              $push: {
                _id: "$_id",
                title: "$title",
                slug: "$slug",
                writerName: "$writerName",
                image: "$image",
                description: "$description",
                date: "$date",
                category: "$category",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            news: {
              $slice: ["$news", 5],
            },
          },
        },
      ]);

      const news = {};
      category_news.forEach((category) => {
        news[category.category] = category.news;
      });
      return res.status(200).json({ news });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_categories = async (req, res) => {
    try {
      const categories = await newsModel.aggregate([
        {
          $match: { status: "active" }, // Adjust the field name and value to match your schema
        },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            count: 1,
          },
        },
      ]);
      return res.status(200).json({ categories });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_news = async (req, res) => {
    const { slug } = req.params;
    try {
      const news = await newsModel.findOneAndUpdate(
        { slug },
        { $inc: { count: 1 } },
        { new: true }
      );

      const relateNews = await newsModel
        .find({
          $and: [{ slug: { $ne: slug } }, { category: { $eq: news.category } }],
        })
        .limit(4)
        .sort({ createdAt: -1 });

      return res.status(200).json({ news: news || {}, relateNews });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_popular_news = async (req, res) => {
    try {
      const popularNews = await newsModel
        .find({ status: "active" })
        .sort({ count: -1 })
        .limit(4);
      return res.status(200).json({ popularNews });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_latest_news = async (req, res) => {
    try {
      const news = await newsModel
        .find({ status: "active" })
        .sort({ createdAt: -1 })
        .limit(6);
      return res.status(200).json({ news });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_images_news = async (req, res) => {
    try {
      const images = await newsModel.aggregate([
        { $match: { status: "active" } },
        { $sample: { size: 12 } },
        { $project: { image: 1 } },
      ]);
      return res.status(200).json({ images });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_categorynews = async (req, res) => {
    const { category } = req.params;
    try {
      const decodedCategory = decodeURIComponent(category);
      console.log("Decoded Category:", decodedCategory); // Logging decoded category

      const news = await newsModel
        .find({ status: "active", category: decodedCategory })
        .sort({ createdAt: -1 });

      if (news.length === 0) {
        console.log("No news found for category:", decodedCategory);
      } else {
        console.log(
          `Found ${news.length} news articles for category: ${decodedCategory}`
        );
      }

      return res.status(200).json({ news });
    } catch (error) {
      console.error(`Error fetching category news: ${error.message}`);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  news_search = async (req, res) => {
    const { value } = req.query;
    if (!value) {
      return res.status(400).json({ message: "Search value is required" });
    }

    try {
      const news = await newsModel.find({
        status: "active",
        $text: { $search: value },
      });
      return res.status(200).json({ news });
    } catch (error) {
      console.error(`Error during search: ${error.message}`);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

   news_old_search = async (req, res) => {
    const { value } = req.query;
    if (!value) {
      return res.status(400).json({ message: "Search date is required" });
    }
  
    // Convert the date to the format used in the database
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(value));
  
    try {
      // Use a regex search to match the formatted date
      const news = await newsModel.find({
        status: "deactive",
        date: { $regex: new RegExp(`^${formattedDate}$`, 'i') }
      });
  
      return res.status(200).json({ news });
    } catch (error) {
      console.error(`Error during search: ${error.message}`);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
}
module.exports = new newsController();
