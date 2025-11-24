"use client";

import TopNav from "@/components/layout/TopNav";
import SubNavBar from "@/components/layout/SubNavBar";
import BottomFooter from "@/components/layout/BottomFooter";
import MainContent from "@/components/layout/MainContent";

export default function Home() {

  return (
    <div className="flex flex-col h-screen bg-background dark">
      <TopNav />
      <SubNavBar />
      <MainContent />
      <BottomFooter />
    </div>
  );
}
