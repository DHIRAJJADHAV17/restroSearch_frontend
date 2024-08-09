"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getRestroDetail } from "@/app/api/MyRestroApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Menucard from "@/components/Menucard";
import Reviewcard from "@/components/Reviewcard";

const Page = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<any>(null);

  useEffect(() => {
    if (typeof id === "string") {
      const fetchRestaurantData = async () => {
        try {
          const res = await getRestroDetail(id);
          setRestaurant(res);
        } catch (error) {
          console.error("Error fetching restaurant data:", error);
        }
      };

      fetchRestaurantData();
    }
  }, [id]);

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  const totalRating =
    restaurant.review.reduce((i: number, item: any) => i + item.rating, 0) /
    restaurant.review.length;

  return (
    <div className="flex flex-col px-20 py-8">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="relative flex flex-col gap-4">
          <h1 className="text-3xl font-bold md:hidden">
            {restaurant.restaurantName}
          </h1>
          <h1 className="font-light md:hidden">location: {restaurant.city}</h1>
          <Carousel className="w-full max-w-lg rounded">
            <CarouselContent>
              <CarouselItem>
                <img
                  className="w-full h-full object-cover"
                  src={restaurant.imageUrl}
                  width={400}
                  height={400}
                  alt="Restaurant Image"
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          <p className="text-justify pr-16">{restaurant.description}</p>

          <ul className="flex space-x-2">
            {restaurant.cuisines.map((cuisine: string) => (
              <li key={cuisine}>{cuisine}</li>
            ))}
          </ul>
          <p className="">Rating: {totalRating}/10</p>
          <span>Reviews</span>
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
              }}
              orientation="vertical"
              className="w-full max-w-lg"
            >
              {" "}
              <CarouselContent className="-mt-1 h-[200px]">
                {restaurant.review.map((review: any) => (
                  <Reviewcard data={review} />
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -top-2  z-10" />
              <CarouselNext className="absolute  -bottom-2 z-10" />
            </Carousel>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold hidden md:block">
            {restaurant.restaurantName}
          </h1>
          <h1 className="font-light hidden md:block">
            location: {restaurant.city}
          </h1>
          <span className="font-bold">Menu</span>
          {restaurant.menuItems.map((data: any) => (
            <Menucard menu={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
