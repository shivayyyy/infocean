"use client";

import React, { useState } from "react";
import { Button } from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

const Input = ({ placeholder, name, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <input
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`border-2 rounded-md p-3 w-full focus:outline-none transition duration-200 ${
          error
            ? "border-red-500"
            : "border-gray-500 focus:ring-2 focus:ring-blue-400"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default function login() {
  const router = useRouter();
  const [data, setData] = useState({
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));

    // Clear error while typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      console.log("Form Submitted ✅", data);
      // submit to backend or clear the form

      await axios.post("http://localhost:3000/api/v1/login", data);
      alert("Logged in successfully");
      router.push("/dashboard");
    } catch (error) {
      console.log("error while sending user data for signup ");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-90 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>

        <Input
          placeholder="Phone Number"
          name="phoneNumber"
          value={data.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
        />
        <Input
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="mt-4 flex justify-center">
          <Button variant="primary" text="Submit" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
}
