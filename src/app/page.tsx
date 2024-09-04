"use client";

import { useEffect, useState } from "react";
import CardItems from "@/components/CardItems";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { getAllRestro } from "./api/MyRestroApi";
import RestroPageClient from "@/components/RestroPageClient";

export default function Home() {
  const [restaurantData, setRestaurantData] = useState<any[]>([]); // State to store all restaurants data
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null); // State to store selected restaurant

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

  const handleCardClick = (restaurant: any) => {
    setSelectedRestaurant(restaurant); // Set the selected restaurant on card click
  };

  const resetSelection = () => {
    setSelectedRestaurant(null); // Reset the selected restaurant to null
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass the reset function as a prop */}
      <Header showhero={!selectedRestaurant} />
      <div className="container mx-auto flex-1 py-10">
        {selectedRestaurant ? (
          <RestroPageClient
            restaurant={selectedRestaurant}
            onclick={resetSelection}
          />
        ) : (
          <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-gray-100 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-8">
              <h1 className="text-5xl font-bold tracking-tight text-primary">
                Tuck Into A Takeaway Today
              </h1>
              <span className="text-xl">Food is just a click away!</span>
              <SearchBar data={setRestaurantData} />
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              {restaurantData.map((data, index) => (
                <CardItems
                  key={index}
                  detail={data}
                  onClick={() => handleCardClick(data)} // Pass the onClick handler to each CardItems
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
