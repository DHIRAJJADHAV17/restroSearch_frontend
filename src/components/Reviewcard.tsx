import React from "react";
import { CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { User2 } from "lucide-react";

type Props = {
  data: any;
};
const Reviewcard = ({ data }: Props) => {
  return (
    <CarouselItem className="pt-1 sm:basis-1/2">
      <div className="p-1">
        <Card>
          <CardContent className="flex items-center  p-6">
            <div className="bg-primary p-7 rounded ">
              <User2 style={{ color: "white" }} />
            </div>
            <div className="ml-4 mb-3">
              <h3 className="text-xl font-semibold">User: {data.name}</h3>
              <span className=" text-gray-600 ">Rating :{data.rating}/10</span>
              <p className="font-semibold"> Review: {data.about}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default Reviewcard;
