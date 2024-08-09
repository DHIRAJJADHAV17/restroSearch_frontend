"use client";
import React from "react";
import { FormDescription, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import ReviewItemInput from "./ReviewItemInput";

const ReviewSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "review",
  });
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Review</h2>
        <FormDescription>Add your Review</FormDescription>
      </div>
      <FormField
        control={control}
        name="review"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <ReviewItemInput
                index={index}
                removeReviewItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button
        type="button"
        className="text-white"
        onClick={() => append({ name: "", price: "" })}
      >
        Add Review
      </Button>
    </div>
  );
};

export default ReviewSection;
