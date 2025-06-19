"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { PlusIcon, ShareIcon } from "@/components/Icons";
import { Card } from "@/components/Card";
import { PopupForm } from "@/components/PopupForm";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
    setModalOpen(true);
  };
  return (
    <div className="">
      <div className="flex items-center justify-end gap-8 pt-5">
        <Button
          onClick={handleClick}
          variant="primary"
          text="Add content"
          startIcon={<PlusIcon />}
        />
        <Button
          variant="secondary"
          text="Share Infocean"
          startIcon={<ShareIcon />}
        />
        <PopupForm open={modalOpen} />
      </div>
      <div className="flex flex-wrap justify-center gap-4 ">
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
    </div>
  );
}
