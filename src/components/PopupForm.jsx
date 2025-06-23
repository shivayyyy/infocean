"use client";
import axios from "axios";
import React, { useState } from "react";
import { CrossIcon } from "./Icons";
import { Button } from "./Button";

const Input = ({ placeholder, onChange, name, value }) => {
  return (
    <input
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="border-2 border-gray-700 rounded-md p-2 w-full"
    />
  );
};

export function PopupForm({ open, onClose }) {
  const [type, setType] = useState("youtube");
  const [content, setContent] = useState({
    title: "",
    link: "",
    type: type,
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setContent((data) => ({ ...data, [name]: value }));
  };
  async function submit() {
    try {
      console.log(content);
      axios.post("http://localhost:3000/api/v1/content/add", content, type);
      console.log("content send successfully");
    } catch (error) {
      console.log("something wrong during api call");
    }
  }

  return (
    <>
      {open && (
        <div>
          <div className="fixed h-screen w-screen  z-400 flex items-center justify-center bg-gray-700 opacity-80"></div>
          <div className="fixed h-screen w-screen  z-400 flex items-center justify-center bg-gray-700 opacity-60">
            <span className="bg-white  rounded p-4 opacity-100 w-11/12 sm:w-1/2 md:w-1/3  fixed">
              <div
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                <CrossIcon size="5" />
              </div>

              <div className="mt-6">
                <Input
                  placeholder="Title of content"
                  name="title"
                  value={content.title}
                  onChange={onChange}
                />
                <Input
                  placeholder="Paste the link"
                  name="link"
                  value={content.link}
                  onChange={onChange}
                />
                <div className="flex mt-4 justify-center items-center p-6">
                  <h1 className="pr-4 text-2xl md:text-xl">Type</h1>
                  <div className="flex">
                    <div className="pr-4">
                      <Button
                        variant={type === "youtube" ? "primary" : "secondary"}
                        text="Youtube"
                        onClick={() => {
                          setType("youtube");
                        }}
                      />
                    </div>
                    <div>
                      <Button
                        variant={type === "tweeter" ? "primary" : "secondary"}
                        text="Tweeter"
                        onClick={() => {
                          setType("tweeter");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button variant="primary" text="Submit" onClick={submit} />
              </div>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
