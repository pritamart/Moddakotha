const { model, Schema } = require("mongoose");

const newsSchema = new Schema(
  {
    writerId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "authors",
    },
    WriterName: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },

    slug: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    coutn: {
        type: Number,
        default: 0
      }
  },
  { timestamps: true }
);
module.exports = model("news", newsSchema);
