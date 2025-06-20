"use client";
import React from "react";
import { CrossIcon } from "./Icons";
import { Button } from "./Button";

const Input = ({ placeholder, onChange }) => {
  return (
    <input
      placeholder={placeholder}
      onChange={onChange}
      className="border border-gray-300 rounded-md p-2 w-full"
    />
  );
};

export function PopupForm({ open, onClose }) {
  const onChange = (e) => {
    console.log(e.target.value);
  };
  const handleClick = () => {
    e.preventDefault();
  };
  return (
    <>
      {open && (
        <div className="fixed h-screen w-screen  z-400 flex items-center justify-center bg-slate-500 opacity-90">
          {/* Popup Card */}
          <span className="bg-white rounded p-4 opacity-100 w-11/12 sm:w-1/2 md:w-1/3   relative">
            <div
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <CrossIcon size="5" />
            </div>

            <div className="mt-6">
              <Input placeholder="Title of content" onChange={onChange} />
            </div>
            <div className="flex justify-center">
              <Button variant="primary" text="Submit" onClick={handleClick} />
            </div>
          </span>
        </div>
      )}
    </>
  );
}
