"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeReviewItem: () => void;
};

const ReviewItemInput = ({ index, removeReviewItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`review.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`review.${index}.about`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Review <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Add Review" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`review.${index}.rating`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Rating (/10) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="8.00" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={removeReviewItem}
        className="bg-red-500 max-h-fit "
      >
        Remove
      </Button>
    </div>
  );
};

export default ReviewItemInput;
