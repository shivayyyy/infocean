"use client";

import React, { useState } from "react";
import axios from "axios";
import { Card } from "./Card";

const VideosSection = () => {
  const [videos, setVideos] = useState([]);
  useState(() => {
    const fetchVideo = async () => {
      const res = await axios.get("/api/v1/videos");
      setVideos(res.data.videos);
    };
    fetchVideo();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video, index) => (
        <div key={index}>
          <Card
            title={video.title}
            id={video._id}
            link={video.link}
            type={video.type}
          />
        </div>
      ))}
    </div>
  );
};

export default VideosSection;
