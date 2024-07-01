import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/items/Breadcrumb";
import NewsCard from "../../components/items/NewsCard";
import Search from "./Search";
import Title from "../../components/items/Title";
import Category from "../../components/items/Category";
import PopularNews from "./PopularNews";
import Footer from "../../components/Footer";
import axios from "axios";
import { base_url } from "../../../config/config";
import { useParams } from "react-router-dom";
import HtmlParser from "react-html-parser";

const CategoryNews = () => {
  return (
    <div>CategoryNews</div>
  )
}

export default CategoryNews