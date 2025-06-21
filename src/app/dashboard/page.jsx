"use client";

import React, { useState } from "react";
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
          <Card
            type="tweet"
            title="The Physics of History"
            description="A fascinating thread exploring the intersection of physics and historical events."
            link="https://x.com/PhysInHistory/status/1935533428558184822"
          />
          <Card
            type="youtube"
            link="https://www.youtube.com/watch?v=bqQrnVn2CJY"
          />
          <Card
            type="tweet"
            title="The Physics of History"
            description="A fascinating thread exploring the intersection of physics and historical events."
            link="https://x.com/PhysInHistory/status/1935533428558184822"
          />
          <Card
            type="youtube"
            link="https://www.youtube.com/watch?v=bqQrnVn2CJY"
          />
        </div>
      </main>
    </div>
  );
}
