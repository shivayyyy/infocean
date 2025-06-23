"use client";

import React, { useEffect, useState } from "react";
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
  };
  const [allContent, setAllContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await axios.get(
          "http://localhost:3000/api/v1/content/fetchContent"
        );
        console.log(data);
        setAllContent(data);
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
          {allContent.map((item, index) => (
            <>all conmtent here</>
          ))}
        </div>
      </main>
    </div>
  );
}
