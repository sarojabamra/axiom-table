"use client";

import React, { memo } from "react";
import TokenMeta from "./TokenMeta";
import TokenStatsRow from "./TokenStatsRow";
import type { Token } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function TokenCard({
  token,
  onClick,
}: {
  token: Token;
  onClick?: (t: Token) => void;
}) {
  // Determine tooltip content and color based on status and bonding type
  let tooltipText = "";
  let tooltipColor = "";
  let strokeHex = "transparent"; // Default no stroke
  let showOverlay = false;

  const bondingType = token.bondingType || "Virtual Curve";
  const bondingColorHex = bondingType === "Pump V1" ? "#14F195" : "#FF4662";
  const bondingColorClass = bondingType === "Pump V1" ? "text-[#14F195]" : "text-[#FF4662]";

  if (token.status === "migrating") {
    tooltipText = "Migrating";
    tooltipColor = "text-[#5B7FFF]"; // Purple
    strokeHex = bondingColorHex; 
    showOverlay = true;
  } else if (token.status === "migrated") {
    tooltipText = bondingType;
    tooltipColor = "text-[#FFD700]"; // Yellow
    strokeHex = "#FFD700";
  } else {
    // Bonding
    tooltipText = `Bonding: ${Math.floor(token.bondingProgress || 0)}%`;
    tooltipColor = bondingColorClass;
    strokeHex = bondingColorHex;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            role="button"
            onClick={() => onClick?.(token)}
            className="
              group relative cursor-pointer w-full
              border-b border-primaryStroke/50
              hover:bg-primaryStroke/50 transition-colors
              h-[142px] min-h-[142px] sm:h-[116px] sm:min-h-[116px] md:h-[116px] md:min-h-[116px] 
              lg:h-[142px] lg:min-h-[142px] xl:h-[142px] xl:min-h-[142px]
              overflow-hidden
            "
          >
            {/* Migrating Overlay */}
            {showOverlay && (
              <div className="absolute inset-0 z-[60] pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[#091E36]/80 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
            )}

            {/* LEFT HOVER ICONS */}
            <button
              type="button"
              className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity
                text-textTertiary hover:text-[#5B7FFF] w-[24px] h-[24px] 
                flex items-center justify-center rounded-[4px] bg-gray-950
                border border-secondaryStroke/50"
              style={{ top: "6px", left: "6px" }}
            >
              <i className="ri-eye-off-line text-[14px]" />
            </button>
            
            <button
              type="button"
              className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity
                bg-gray-950 text-textTertiary hover:text-[#5B7FFF] 
                w-[24px] h-[24px] flex items-center justify-center rounded-[4px] 
                border border-secondaryStroke/50"
              style={{ top: "32px", left: "6px" }}
            >
              <i className="ri-close-line text-[12px]" />
            </button>
            
            <button
              type="button"
              className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity
                bg-gray-950 text-textTertiary hover:text-[#5B7FFF] 
                w-[24px] h-[24px] flex items-center justify-center rounded-[4px] 
                border border-secondaryStroke/50"
              style={{ top: "58px", left: "6px" }}
            >
              <i className="ri-user-unfollow-line text-[12px]" />
            </button>

            {/* Quick Buy button - Only visible on hover */}
            <div className="absolute right-[16px] bottom-[18px] z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                className="bg-[#5B7FFF] hover:bg-[#5B7FFF]/80 text-black
                  flex items-center gap-[4px] rounded-full h-[28px] px-[8px] 
                  text-[12px] font-bold transition-all"
              >
                <i className="ri-flashlight-fill text-[16px]" />
                <span>0 SOL</span>
              </button>
            </div>

            {/* TOP-RIGHT: Stats */}
            <div className="absolute right-[16px] top-[16px] z-10">
              <div className="flex flex-col gap-[6px] items-end">
                {/* V and MC Row */}
                <div className="relative">
                  <div className="absolute z-0" style={{ inset: "-12px -8px 1px -4px" }}>
                    <div className="absolute inset-0 z-[5]" />
                    <div className="bg-backgroundSecondary absolute inset-0 z-0" />
                  </div>
                  <div className="relative flex gap-[8px] items-end z-20">
                    <div className="flex gap-[4px] items-center">
                      <span className="text-textTertiary text-[12px] font-medium">V</span>
                      <span className="text-[12px] font-medium text-white transition-all duration-300">
                        ${(token.volume24h / 1000).toFixed(token.volume24h >= 1000 ? 0 : 2)}K
                      </span>
                    </div>
                    <div className="flex gap-[4px] items-center">
                      <span className="text-textTertiary text-[12px] font-medium">MC</span>
                      <span className="text-[12px] font-medium text-[#52C5FF] transition-all duration-300">
                        ${token.marketCap >= 1000000 
                          ? `${(token.marketCap / 1000000).toFixed(2)}M`
                          : `${(token.marketCap / 1000).toFixed(2)}K`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* F and TX Row */}
                <div className="relative flex gap-[8px] items-end">
                  <div className="absolute z-0" style={{ inset: "-2px -8px -4px -4px" }}>
                    <div className="absolute inset-0 z-[5]" />
                    <div className="bg-backgroundSecondary absolute inset-0 z-0" />
                  </div>
                  <div className="relative flex items-center h-[12px] gap-[4px] z-20">
                    <span className="text-textTertiary text-[12px] font-medium">F</span>
                    <div className="flex gap-[2px] items-center">
                      <img
                        src="https://axiom.trade/images/sol-fill.svg"
                        alt="SOL"
                        className="w-[14px] h-[14px]"
                      />
                      <span className="text-textPrimary text-[12px] font-medium">
                        {token.fValue?.toFixed(3) ?? "0"}
                      </span>
                    </div>
                  </div>
                  <div className="relative flex items-center h-[12px] gap-[4px] z-20">
                    <span className="text-textTertiary text-[12px] font-medium">
                      TX <span className="text-textPrimary text-[12px] font-medium transition-all duration-300">{token.txCount ?? 0}</span>
                    </span>
                    <div className="flex min-w-[24px] max-w-[24px] h-[2px] bg-secondaryStroke rounded-full overflow-hidden">
                      <div 
                        className="h-[3px] bg-increase" 
                        style={{ width: `${token.txBuyPercent ?? 50}%` }}
                      />
                      <div 
                        className="h-[3px] bg-decrease" 
                        style={{ width: `${100 - (token.txBuyPercent ?? 50)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex flex-col w-full h-full">
              <div className="flex w-full gap-[12px] px-[12px] pt-[12px]">
                {/* AVATAR BLOCK */}
                <div className="flex flex-col items-center gap-[4px]">
                  <div className="relative w-[74px] h-[74px]">
                    {/* Badge */}
                    <div className="flex bg-pump absolute bottom-[-4px] right-[-4px] p-[1px] w-[16px] h-[16px] rounded-full z-30"
                    >
                      <div className="flex bg-background absolute w-[14px] h-[14px] rounded-full z-30 items-center justify-center"
                      style={{ border: `1.5px solid ${bondingColorHex}` }}>
                        <img
                          src={token.bondingType === "Pump V1" ? "https://axiom.trade/images/pump.svg" : "https://axiom.trade/images/virtual-curve.svg"}
                          alt="Badge"
                          className="w-[10px] h-[10px]"
                        />
                      </div>
                    </div>

                    {/* Image container */}
                    <HoverCard openDelay={0} closeDelay={0}>
                      <HoverCardTrigger asChild>
                        <div className={`bg-pump/20 absolute flex p-[1px] rounded-[4px] z-20 cursor-pointer`}>
                          <div className="bg-backgroundSecondary flex p-[2px] rounded-[3px]">
                            <div className="w-[68px] h-[68px] relative">
                              <div className="w-full h-full relative">
                                {/* Stroke Overlay based on status */}
                                <div 
                                  className="pointer-events-none absolute w-[68px] h-[68px] z-10 rounded-[1px]" 
                                  style={{ 
                                    boxShadow: strokeHex !== "transparent" 
                                      ? `0 0 0 3px #0a0a0adc, 0 0 0 3.5px ${strokeHex}` 
                                      : "none" 
                                  }} 
                                />
                                
                                {token.icon ? (
                                  <img
                                    src={token.icon}
                                    alt={token.name}
                                    className="rounded-[1px] w-[68px] h-[68px] object-cover"
                                    onError={(e) => {
                                      // Fallback to default image if Unsplash fails
                                      e.currentTarget.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=68&h=68&fit=crop";
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-green-700/40 to-green-400/40 rounded-[1px]" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent 
                        side="bottom" 
                        align="center"
                        className="z-[900] w-[180px] h-[180px] p-[4px] border-secondaryStroke bg-backgroundSecondary"
                      >
                        <div className="w-full h-full overflow-hidden">
                          {token.icon ? (
                            <img
                              src={token.icon.replace(/w=68&h=68/, "w=180&h=180")}
                              alt={token.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=180&h=180&fit=crop";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-700/40 to-green-400/40" />
                          )}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  {/* Address */}
                  <span className="text-textTertiary text-[12px] font-medium text-center max-w-[74px]">
                    <button
                      type="button"
                      className="text-textTertiary hover:text-primaryBlueHover transition-colors text-[12px] font-medium"
                    >
                      {token.address ?? "52US...pump"}
                    </button>
                  </span>
                </div>

                {/* NAME + META */}
                <div className="flex flex-col flex-1 min-w-0 pt-[0px]">
                  <div className="flex flex-col w-full gap-[2px] min-w-0">
                    {/* Name row */}
                    <div className="flex min-h-[18px] w-full gap-[4px] items-end min-w-0">
                      <div className="overflow-hidden">
                        <div className="flex gap-[4px] items-center">
                          <div className="min-w-0 whitespace-nowrap overflow-hidden truncate text-textPrimary text-[16px] font-medium max-w-[120px]">
                            {token.name}
                          </div>
                          <div className="min-w-0 flex-1 overflow-hidden">
                            <button className="flex gap-[4px] items-center text-textTertiary hover:text-primaryBlueHover transition-colors min-w-0 overflow-hidden">
                              <div className="min-w-0 whitespace-nowrap overflow-hidden truncate text-inherit text-[14px] font-medium max-w-[48px]">
                                {token.symbol}
                              </div>
                              <i className="text-inherit ri-file-copy-fill text-[14px]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Meta row */}
                    <div className="min-w-0">
                      <TokenMeta token={token} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats pills - at the very bottom of the card */}
              <div className="flex h-[24px] gap-[4px] items-end px-[12px] pb-[6px] mt-auto">
                <TokenStatsRow token={token} />
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="border-border text-white text-[12px] font-medium px-[8px] py-[4px]"
        >
          <span className={tooltipColor}>
            {tooltipText}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default memo(TokenCard);
