// App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./dashboard/layout/MainLayout";
import AdminIndex from "./dashboard/pages/AdminIndex";
import Login from "./dashboard/pages/Login";
import ProtectDashboatd from "./middleware/ProtectDashboatd";
import ProtectRole from "./middleware/ProtectRole";
import Unable from "./dashboard/pages/Unable";
import AddWriter from "./dashboard/pages/AddWriter";
import News from "./dashboard/pages/News";
import Writers from "./dashboard/pages/Writers";
import Profile from "./dashboard/pages/Profile";
import WriterIndex from "./dashboard/pages/WriterIndex";
import CreateNews from "./dashboard/pages/CreateNews";
import Edit_news from "./dashboard/pages/Edit_news";
import Layout from "./dashboard/pages/app/Layout";
import NewsWall from "./dashboard/pages/app/NewsWall";
import SportsNews from "./dashboard/pages/app/SportsNews";
import CategoryNews from "./dashboard/pages/app/CategoryNews";
import SearchNews from "./dashboard/components/news/SearchNews";
import SearchValue from "./dashboard/components/items/SearchValue";
import ArchiveNews from "./dashboard/components/news/ArchiveNews";
import View_news from "./dashboard/pages/View_news";
import AdSense from "./dashboard/components/AdSense";

function App() {
  const userInfo = {
    role : "writer"
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<NewsWall />}/>
        <Route path="/news/:slug" element={<SportsNews />}/>
        <Route path="/news/ArchiveNews" element={<ArchiveNews />}/>
        <Route path="news/category/:category" element={<CategoryNews />}/>
        <Route path="search/:value" element={<SearchValue />} />

        </Route>




          
          <Route path="/login" element={<Login />} />
          <Route path="/ad" element={<AdSense />} />

          <Route path="/dashboard" element={<ProtectDashboatd />}>
            <Route path="" element={<MainLayout />}>

            {/* Navigate  */}
              <Route path="" element={userInfo.role === 'admin' ? <Navigate to="/dashboard/admin" /> : <Navigate to="/dashboard/writer" />} />
              {/* <Route path="" element={<Navigate to="/dashboard/admin" />} /> */}
              <Route path="unable-access" element={<Unable/>} />
              <Route path="news" element={<News />} />
              <Route path="profile" element={<Profile />} />
              <Route path="news/view/:news_id" element={<View_news />} />



              {/* for admin only */}
              <Route path="" element={<ProtectRole role='admin' />} >
                  <Route path="admin" element={<AdminIndex />} />
                  <Route path="writer/add" element={<AddWriter />} />
                  <Route path="writers" element={<Writers />} />
              </Route>

              <Route path="" element={<ProtectRole role='writer' />} >
                  <Route path="writer" element={<WriterIndex />} />
                  <Route path="news/create" element={<CreateNews />} />
                  <Route path="news/edit/:news_id" element={<Edit_news />} />

              </Route>


            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
