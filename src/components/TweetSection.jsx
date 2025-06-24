"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";

const TweetSection = () => {
  const [allTweets, setAllTweets] = useState([]);
  useEffect(() => {
    const fetchTweets = async () => {
      const res = await axios.get("/api/v1/tweet");

      setAllTweets(res.data.tweets);
    };

    fetchTweets();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {allTweets.map((tweet, index) => (
        <div key={index}>
          <Card
            title={tweet.title}
            id={tweet._id}
            link={tweet.link}
            type={tweet.type}
          />
        </div>
      ))}
    </div>
  );
};

export default TweetSection;
