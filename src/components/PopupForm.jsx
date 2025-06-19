"use client";
import React, { useState } from "react";
import { Button } from "@/components/Button";
import { CrossIcon, ShareIcon } from "./Icons";

const Input = ({ placeholder, type, name, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-md p-2 w-full"
    />
  );
};

export function PopupForm({ open, onClose }) {
  return (
    <div>
      {open && (
        <div className="z-50 fixed opacity-60 h-screen w-screen top-0 left-0 bg-slate-700 flex flex-col align-center itmes-center justify-center ">
          <span className="bg-white h-1/2 w-1/2 sm:w-1/3 sm:h-1/3  rounded p-4 opacity-100 ">
            <div className="flex justify-end ">
              <div onClick={onClose} className="cursor-pointer">
                <CrossIcon />
              </div>
            </div>
            <div>
              <Input placeholder="name" value="name" name="name" type="text" />
            </div>
          </span>
        </div>
      )}
    </div>
  );
}
