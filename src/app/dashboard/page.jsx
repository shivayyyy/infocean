"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/Button";
import { PlusIcon, ShareIcon } from "@/components/Icons";
import { Card } from "@/components/Card";
import { Sidebar } from "@/components/Sidebar";
import { PopupForm } from "@/components/PopupForm";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = () => setModalOpen(true);
  const onclose = () => {
    setModalOpen(false);
    console.log(allContents);
  };
  const [allContents, setAllContents] = useState([]);

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

  return (
    <div className="h-screen flex flex-col">
      <PopupForm open={modalOpen} onClose={onclose} />
      {/* Sidebar */}
      <Sidebar />

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
          <Card
            type="tweeter"
            link="https://x.com/TimesAlgebraIND/status/1937153112726212711"
            title="first tweet"
          />
        </div>
      </main>
    </div>
  );
}
