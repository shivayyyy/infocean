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

export default function Signup() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
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

  const validate = () => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/^\d{10}$/.test(data.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const validationErrors = validate();

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        console.log("Form Submitted ✅", data);
        // submit to backend or clear the form
      }

      await axios.post("http://localhost:3000/api/v1/signup", data);
      alert("Signed up successfully");
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
          Sign Up
        </h2>

        <Input
          placeholder="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />
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
