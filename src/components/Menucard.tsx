import { ForkKnifeCrossed } from "lucide-react";
import React from "react";

type Props = {
  menu: any;
};
const Menucard = ({ menu }: Props) => {
  return (
    <div className="flex items-center bg-gray-100  rounded-lg shadow">
      <div className="bg-primary p-7 rounded">
        <ForkKnifeCrossed style={{ color: "white" }} />
      </div>
      <div className="ml-4 mb-3">
        <h3 className="text-xl font-semibold">{menu.name}</h3>
        <p className="text-gray-600"> ₹ {menu.price}</p>
      </div>
    </div>
  );
};

export default Menucard;
