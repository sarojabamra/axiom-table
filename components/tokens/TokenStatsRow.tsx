"use client";

import React from "react";
import type { Token } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Memoized component to prevent unnecessary re-renders during real-time updates
const TokenStatsRow = React.memo(({ token }: { token: Token }) => {
  const makePill = (
    value?: number,
    icon?: string,
    extra?: string,
    isSpecial?: boolean,
    tooltipText?: string
  ) => {
    const v = value ?? 0;

    // Color logic
    let color = "text-textSecondary";
    let border = "border-primaryStroke/50";

    if (isSpecial) {
      // Special case for blue DS pill
      color = "text-primaryBlue";
      border = "border-primaryStroke/50";
    } else if (v > 0) {
      color = "text-[#14F195]"; // Green for positive
      border = "border-primaryStroke/50";
    } else if (v < 0) {
      color = "text-[#FF4662]"; // Red for negative
      border = "border-primaryStroke/50";
    }

    const pillContent = (
      <div
        className={`flex gap-[4px] flex-shrink-0 h-[24px] px-[5px] items-center 
          rounded-full bg-transparent border-[1px] ${color} ${border}`}
      >
        {icon && (
          <div className="w-[16px] h-[16px] flex items-center justify-center">
            <i className={`${icon} ${isSpecial ? 'text-primaryBlue' : color}`} style={{ fontSize: "12px" }} />
          </div>
        )}
        {isSpecial ? (
          <span className={`${color} text-[12px] font-medium`}>
            {extra}
          </span>
        ) : (
          <span
            className={`text-[10px] font-bold ${color} transition-colors duration-300`}
          >
            {Math.abs(v)}%
          </span>
        )}
        {extra && !isSpecial && (
          <span className="text-textSecondary text-[11px] leading-[16px] font-medium whitespace-nowrap">
            {extra}
          </span>
        )}
      </div>
    );

    if (tooltipText) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              {pillContent}
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="border-border text-white text-[12px] font-medium px-[8px] py-[4px]"
            >
              {tooltipText}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return pillContent;
  };

  // Check if p2 should be displayed as special "DS" pill
  const isP2Special = token.p2 === 0; 

  return (
    <>
      {makePill(token.p1, "ri-user-star-line")}
      {isP2Special ? (
        makePill(token.p2, "ri-cake-3-line", "DS", true)
      ) : (
        makePill(token.p2, "ri-cake-3-line")
      )}
      {makePill(token.p3, "ri-crosshair-2-line", undefined, undefined, "Snipers Holding")}
      {makePill(token.p4, "ri-ghost-line", undefined, undefined, "Insiders Holding")}
      {makePill(token.p5, "ri-archive-fill", undefined, undefined, "Bundles Holding")}
    </>
  );
});

TokenStatsRow.displayName = "TokenStatsRow";

export default TokenStatsRow;
