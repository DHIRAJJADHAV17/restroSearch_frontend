"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import Link from "next/link";

type Props = {
  detail: any;
};

const CardItems = ({ detail }: Props) => {
  const totalrating =
    detail.review.reduce((i: number, item: any) => i + item.rating, 0) /
    detail.review.length;
  return (
    <Link href={`/restro/discription/${detail._id}`}>
      <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 ">
        <CardHeader>
          <CardTitle>{detail.restaurantName}</CardTitle>
          <CardDescription>
            location: {detail.city},{detail.country}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <img
            className="w-full max-h-[100px] object-cover"
            src={detail.imageUrl}
            width={400}
            height={100}
            alt="Restaurant Image"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="mb-2">Rating:{totalrating}</p>
          <ul className="flex space-x-2">
            {detail.cuisines.map((cuisine: string, index: number) => (
              <li key={index}>{cuisine}</li>
            ))}
            ...
          </ul>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CardItems;
