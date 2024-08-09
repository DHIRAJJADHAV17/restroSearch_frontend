import React, { Dispatch, SetStateAction, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

import { Button } from "./ui/button";
import { getAllRestro, searchRestro } from "@/app/api/MyRestroApi";

type Props = {
  data: Dispatch<SetStateAction<any[]>>;
};

const SearchBar = ({ data }: Props) => {
  const [value, setvalue] = useState("");
  const handleReset = async () => {
    try {
      setvalue("");
      const result = await getAllRestro();
      data(result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async () => {
    try {
      if (value) {
        const result = await searchRestro(value);
        data(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3">
      <Search
        strokeWidth={2.5}
        size={30}
        className="ml-1 text-primary hidden md:block"
      />
      <div className="flex-1">
        <Input
          className="border-none shadow-none text-xl focus-visible:ring-0"
          placeholder="Search resto"
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        />
      </div>
      <Button
        className="rounded-full text-white"
        type="button"
        onClick={handleReset}
      >
        Reset
      </Button>
      <Button
        className="rounded-full bg-primary text-white"
        type="submit"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
