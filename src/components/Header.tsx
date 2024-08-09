"use client";
import React, { useEffect, useState } from "react";
import MainNav from "./MainNav";
import Hero from "./Hero";
import AuthNav from "./AuthNav";
import Link from "next/link";

type Props = {
  showhero?: boolean;
};

const Header = ({ showhero = false }: Props) => {
  const [islogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLogin(!!accessToken);
  }, []);

  return (
    <>
      <div className="border-b-2 border-b-primary py-6">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-primary">
            <Link href="/">Find-Resto</Link>
          </h2>
          <div className="flex">
            {islogin ? (
              <MainNav setlogout={() => setIsLogin(false)} />
            ) : (
              <AuthNav />
            )}
          </div>
        </div>
      </div>
      {showhero && <Hero />}
    </>
  );
};

export default Header;
