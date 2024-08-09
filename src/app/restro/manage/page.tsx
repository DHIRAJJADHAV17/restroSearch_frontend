"use client";

import CuisinesSection from "@/components/restoform/CuisinesSection";
import DetailsSection from "@/components/restoform/DetailsSection";
import ImageSection from "@/components/restoform/ImageSection";
import MenuSection from "@/components/restoform/MenuSection";
import ReviewSection from "@/components/restoform/ReviewSection";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  getMyRestro,
  updateRestro,
  useCreateRestro,
} from "@/app/api/MyRestroApi";
import { useEffect, useState } from "react";
import withAuth from "@/components/hoc/withauth";

const formSchema = z
  .object({
    restaurantName: z.string({
      message: "Restaurant name is required",
    }),
    city: z.string({
      message: "City is required",
    }),
    country: z.string({
      message: "Country is required",
    }),
    description: z.string({ required_error: "Description is required" }),
    cuisines: z.array(z.string()).nonempty({
      message: "Please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required"),
      })
    ),
    review: z.array(
      z.object({
        name: z.string().min(1, "Name is required"),
        rating: z.coerce.number().min(1, "Rating is required"),
        about: z.string().min(1, "About is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image file must be provided",
    path: ["imageFile"],
  });

export type RestaurantFormData = z.infer<typeof formSchema>;

const Page = () => {
  const [isExistingRestaurant, setIsExistingRestaurant] = useState(false);
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
    },
  });

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const restaurant = await getMyRestro();
        form.reset(restaurant);
        setIsExistingRestaurant(true);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [form]);

  const onSubmit = async (data: RestaurantFormData) => {
    try {
      const formData = new FormData();
      formData.append("restaurantName", data.restaurantName);
      formData.append("city", data.city);
      formData.append("country", data.country);
      formData.append("description", data.description);

      data.cuisines.forEach((cuisine, index) => {
        formData.append(`cuisines[${index}]`, cuisine);
      });

      data.menuItems.forEach((menuItem, index) => {
        formData.append(`menuItems[${index}][name]`, menuItem.name);
        formData.append(
          `menuItems[${index}][price]`,
          menuItem.price.toString()
        );
      });

      data.review.forEach((reviewItem, index) => {
        formData.append(`review[${index}][name]`, reviewItem.name);
        formData.append(`review[${index}][about]`, reviewItem.about);
        formData.append(
          `review[${index}][rating]`,
          reviewItem.rating.toString()
        );
      });

      if (data.imageFile) {
        formData.append("imageFile", data.imageFile);
      }

      let result;
      console.log(formData);

      if (isExistingRestaurant) {
        result = await updateRestro(formData);
      } else {
        result = await useCreateRestro(formData);
      }
      console.log(result);
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ReviewSection />
        <ImageSection />
        <Button className="text-white" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default withAuth(Page);
