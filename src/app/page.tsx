"use client";

import { useEffect, useState } from "react";
import CardItems from "@/components/CardItems";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { getAllRestro } from "./api/MyRestroApi";

export default function Home() {
  const [restaurantData, setRestaurantData] = useState<any[]>([]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const res = await getAllRestro();
        setRestaurantData(res);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurantData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header showhero />
      <div className="container mx-auto flex-1 py-10">
        <div className="flex flex-col gap-12">
          <div className="md:px-32 bg-gray-100 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-8">
            <h1 className="text-5xl font-bold tracking-tight text-primary">
              Tunk Into A Takeway Today
            </h1>
            <span className="text-xl">Food is just a click away!</span>
            <SearchBar data={setRestaurantData} />
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {restaurantData.map((data) => (
              <CardItems detail={data} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
