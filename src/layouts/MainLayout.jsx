import React from "react";
import StickyHeader from "../components/StickyHeader";
import StickyFooter from "../components/StickyFooter";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a1a2f] text-white">
      <StickyHeader />

      <main className="flex-grow px-4 py-6">
        <Outlet />
      </main>

      <StickyFooter />
    </div>
  );
}

