"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/Button";
import {
  PlusIcon,
  ShareIcon,
  TweetIcon,
  DocumentIcon,
  InboxIcon,
  YoutubeIcon,
  BrainIcon,
} from "@/components/Icons";
import { Card } from "@/components/Card";

import { SidebarItem } from "@/components/SidebarItem";
import { PopupForm } from "@/components/PopupForm";
import TweetSection from "@/components/TweetSection";
import VideosSection from "@/components/VideosSection";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const handleClick = () => setModalOpen(true);
  const onclose = () => {
    setModalOpen(false);
    console.log(allContents);
  };
  const [allContents, setAllContents] = useState([]);
  const [active, setActive] = useState("yourBrain");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/content/fetchContent"
        );

        setAllContents(res.data.contents);

        console.log(res.data.contents);
      } catch (error) {
        console.log("error while displaying content on frontend");
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    console.log("Active section changed:", active);
  }, [active]);

  return (
    <div className="h-screen flex flex-col">
      <PopupForm open={modalOpen} onClose={onclose} />

      <div className="hidden z-200 sm:block w-72 border-r-2 rounded h-screen bg-gray-600 border-black  text-white fixed left-0 top-0 p-4">
        <div>
          <h1 className="text-4xl flex justify-center font-bold ">
            <span className="text-sky-400">Info</span>
            <span className="text-emerald-400">cean</span>
          </h1>
        </div>

        <div className="pt-6 text-lg font-medium  tracking-widest duration-75 ease-in-out">
          <SidebarItem
            isOpen={active === "yourBrain"}
            onClick={() => {
              if (active === "yourBrain") return;
              setActive("yourBrain");
            }}
            icon={<BrainIcon />}
            text="Your Brain"
          />
          <SidebarItem
            isOpen={active === "tweet"}
            onClick={() => {
              if (active === "tweet") return;
              setActive("tweet");
            }}
            icon={<TweetIcon />}
            text="Tweet"
          />
          <SidebarItem
            isOpen={active === "videos"}
            onClick={() => {
              if (active === "videos") return;
              setActive("videos");
            }}
            icon={<YoutubeIcon />}
            text="Videos"
          />
          <SidebarItem
            isOpen={active === "document"}
            onClick={() => {
              if (active === "document") return;
              setActive("document");
            }}
            icon={<DocumentIcon />}
            text="Document"
          />
          <SidebarItem
            isOpen={active === "inbox"}
            onClick={() => {
              if (active === "inbox") return;
              setActive("inbox");
            }}
            icon={<InboxIcon />}
            text="Inbox"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-72 p-4 transition-all">
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mb-6">
          <Button
            onClick={handleClick}
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon />}
            className="px-4 py-2 text-sm"
          />
          <Button
            variant="secondary"
            text="Share Knowledge"
            startIcon={<ShareIcon />}
            className="px-4 py-2 text-sm"
          />
        </div>

        {/* Card Grid */}

        {active === "yourBrain" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allContents.map((item, index) => (
              <div key={index}>
                <Card
                  id={item._id}
                  title={item.title}
                  link={item.link}
                  type={item.type}
                />
              </div>
            ))}
          </div>
        )}
        {active === "tweet" && (
          <div>
            <TweetSection />
          </div>
        )}
        {active === "videos" && (
          <div>
            <VideosSection />
          </div>
        )}
        {active === "document" && (
          <div className="h-full w-full flex justify-center items-\">
            <h1 className="text-4xl">
              Sorry !! we introduce this is next update
            </h1>
          </div>
        )}
        {active === "inbox" && (
          <div className="h-full w-full flex justify-center items-\">
            <h1 className="text-4xl">Nothing in your inbox</h1>
          </div>
        )}
      </main>
    </div>
  );
}
