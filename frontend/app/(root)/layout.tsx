import NavBar from "@/components/nav-bar";
import React from "react";

export default function MainLayout( { children }: { children: React.ReactNode } ) {
  return (
    <>
      <NavBar/>
      { children }
    </>
  );
}