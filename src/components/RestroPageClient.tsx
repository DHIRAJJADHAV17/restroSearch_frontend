// RestroPageClient.tsx
"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Menucard from "./Menucard";
import Reviewcard from "./Reviewcard";
import { Button } from "./ui/button";

export default function RestroPageClient({
  restaurant,
  onclick,
}: {
  restaurant: any;
  onclick: () => void;
}) {
  const totalRating =
    restaurant.review.reduce((i: number, item: any) => i + item.rating, 0) /
    restaurant.review.length;

  return (
    <>
      <Button
        className="font-bold hover:text-white hover:bg-primary"
        variant="ghost"
        onClick={onclick}
      >
        Back
      </Button>
      <div className="flex flex-col px-20 py-8">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="relative flex flex-col gap-4">
            <h1 className="text-3xl font-bold md:hidden">
              {restaurant.restaurantName}
            </h1>
            <h1 className="font-light md:hidden">
              location: {restaurant.city}
            </h1>
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
                <CarouselContent className="-mt-1 h-[200px]">
                  {restaurant.review.map((review: any, index: number) => (
                    <Reviewcard key={index} data={review} />
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
            {restaurant.menuItems.map((data: any, index: number) => (
              <Menucard key={index} menu={data} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
