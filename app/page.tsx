"use client";

import TopNav from "@/components/layout/TopNav";
import SubNavBar from "@/components/layout/SubNavBar";
import BottomFooter from "@/components/layout/BottomFooter";

export default function Home() {

  return (
    <div className="flex flex-col h-screen bg-background dark">
      <TopNav />
      <SubNavBar />
      <BottomFooter />
    </div>
  );
}
