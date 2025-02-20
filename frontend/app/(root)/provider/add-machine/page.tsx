"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { images } from "@/constants/images/images";
import axios from "axios";
import Image from "next/image";
import React, { useState, FormEvent } from "react";

interface FormData {
  cpuCores: string;
  ram: string;
  storage: string;
  rentalTime: string;
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    cpuCores: "",
    ram: "",
    storage: "",
    rentalTime: "",
  });

  // Handle form data change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { cpuCores, ram, storage, rentalTime } = formData;

    try {
      const res = await axios.post("http://localhost:4000/machines/create", {
        title: cpuCores, // You might want to update this logic as needed
        ram,
        size: storage,  // You might want to update this logic as needed
        time: rentalTime,
        email: localStorage.getItem("user"),
      });

      if (res.status === 201) {
        alert("Machine added successfully");
      }
    } catch (error) {
      console.error("Error adding machine:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="px-[5%] py-[3%] flex justify-between">
      <form onSubmit={formSubmit} className="w-[50%] py-2 flex flex-col gap-2">
        <h1 className="text-lg font-semibold">Add a new machine</h1>
        <div className="flex flex-col gap-1 py-2">
          <span>Enter CPU cores, you have</span>
          <Input
            name="cpuCores"
            value={formData.cpuCores}
            onChange={handleChange}
            className="offsetstyle generalTabsBorder bg-white"
            placeholder="2, 4, 8 GB"
          />
        </div>
        <div className="flex flex-col gap-1 py-2">
          <span>Enter amount of RAM, you have</span>
          <Input
            name="ram"
            value={formData.ram}
            onChange={handleChange}
            className="offsetstyle generalTabsBorder bg-white"
            placeholder="4, 8, 16 GB"
          />
        </div>
        <div className="flex flex-col gap-1 py-2">
          <span>Enter amount of space, you have</span>
          <Input
            name="storage"
            value={formData.storage}
            onChange={handleChange}
            className="offsetstyle generalTabsBorder bg-white"
            placeholder="512GB, 1TB"
          />
        </div>
        <div className="flex flex-col gap-1 py-2">
          <span>Enter amount of time, you want to rent it out for</span>
          <Input
            name="rentalTime"
            value={formData.rentalTime}
            onChange={handleChange}
            className="offsetstyle generalTabsBorder bg-white"
            placeholder="12hrs"
          />
        </div>
        <Button className="offsetstyle generalBorder bg-green-300 text-black hover:text-white">
          Add request
        </Button>
      </form>
      <div>
        <Image
          src={images.machineAdd}
          height={400}
          width={600}
          alt="machine add"
          className=""
        />
      </div>
    </div>
  );
}
