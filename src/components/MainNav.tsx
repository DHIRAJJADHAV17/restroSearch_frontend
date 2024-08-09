import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  setlogout: (isLoggedIn: boolean) => void;
};

const MainNav = ({ setlogout }: Props) => {
  const router = useRouter();

  const handleclick = () => {
    localStorage.removeItem("accessToken"); // Remove the access token
    setlogout(false); // Update the state in the parent component (Header)
    router.replace("/"); // Redirect to the home page
  };

  return (
    <div className="flex gap-4">
      <Link href="/restro/manage">
        <Button
          className="font-bold hover:text-white hover:bg-primary"
          variant="ghost"
        >
          Manage Restro
        </Button>
      </Link>
      <Button
        className="font-bold hover:text-white hover:bg-primary"
        variant="ghost"
        onClick={handleclick}
      >
        Log-Out
      </Button>
    </div>
  );
};

export default MainNav;
