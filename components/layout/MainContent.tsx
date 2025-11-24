"use client";

import React, { useMemo } from "react";
import TokenCard from "@/components/tokens/TokenCard";
import TokenCardSkeleton from "@/components/tokens/TokenCardSkeleton";
import mockTokens from "@/lib/mockTokens";

import { HoverPopover, FilterOptions } from "@/components/layout/FilterPopover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MainHeader from "@/components/layout/MainHeader";
import TradingSettingsModal from "@/components/modals/TradingSettingsModal";
import { useAppSelector } from "@/lib/redux/hooks";
import { useWebSocketUpdates } from "@/hooks/useWebSocketUpdates";
import type { Token } from "@/lib/types";



type ColumnKey = "new" | "final" | "migrated";

const columns: { key: ColumnKey; title: string }[] = [
  { key: "new", title: "New Pairs" },
  { key: "final", title: "Final Stretch" },
  { key: "migrated", title: "Migrated" },
];

export default function MainContent() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState<string>("P1");
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize WebSocket with mock data
  useWebSocketUpdates(mockTokens);

  // Get tokens from Redux store (real-time updates)
  const tokens = useAppSelector((state) => state.tokens.tokens);

  // Memoized token distribution to prevent unnecessary recalculations
  // Newest tokens (first 6) go to "new", next 6 to "final", rest to "migrated"
  const tokensByColumn: Record<ColumnKey, Token[]> = useMemo(() => {
    // Sort tokens by bonding progress for Final Stretch and Migrated
    // "New Pairs" uses the newest tokens (first 6 in the array)
    // Sort by time - newest first (smallest time value)
    const newTokens = [...tokens]
      .sort((a, b) => {
        const parseTime = (timeStr: string) => {
          const match = timeStr.match(/^(\d+)([smh])$/);
          if (!match) return 0;
          const value = parseInt(match[1]);
          const unit = match[2];
          switch (unit) {
            case 's': return value;
            case 'm': return value * 60;
            case 'h': return value * 3600;
            default: return 0;
          }
        };
        return parseTime(a.timeString || "0s") - parseTime(b.timeString || "0s");
      })
      .slice(0, 6);
    
    // Remaining tokens for other columns
    const remainingTokens = tokens.slice(6);
    
    // Filter tokens for "Final Stretch" (bondingProgress < 100 OR status === 'migrating') and "Migrated" (status === 'migrated')
    // Sort Final Stretch by bonding progress (descending) - those nearing completion first
    const finalStretchTokens = remainingTokens
      .filter(t => (t.bondingProgress || 0) < 100 || t.status === "migrating")
      .sort((a, b) => (b.bondingProgress || 0) - (a.bondingProgress || 0))
      .slice(0, 6); // Take top 6 nearing completion
      
    // Migrated tokens (completed bonding AND migration)
    const migratedTokens = remainingTokens
      .filter(t => t.status === "migrated")
      .sort((a, b) => (b.bondingProgress || 0) - (a.bondingProgress || 0)) // Sort by progress (all 100, but maybe stable sort) or age
      .slice(0, 6);

    return {
      new: newTokens,
      final: finalStretchTokens,
      migrated: migratedTokens,
    };
  }, [tokens]);

  return (
    <main className="flex-1 py-[24px] px-[16px] lg:px-[24px] ">
      {/* Page header */} 
      <MainHeader />

      {/* 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 h-[calc(100vh-220px)]">
        {columns.map((col, index) => (
          <section
            key={col.key}
            className={`flex flex-col bg-card border border-border bg-primaryStroke/30 overflow-hidden ${
              index === 0 ? 'rounded-l-sm' : index === columns.length - 1 ? 'rounded-r-sm' : ''
            }`}
          >
            {/* Column header */}
            <div
              className="
    hidden sm:flex sticky top-0 z-30
    whitespace-nowrap flex-row w-full gap-[12px]
    min-h-[48px] justify-end items-center
    pr-[12px] pl-[4px] lg:pl-[12px] xl:pl-[12px]
    border-b border-primaryStroke
  "
            >
              {/* Title (Left) */}
              <div className="flex flex-row items-center gap-[16px] flex-1">
                <span className="text-textPrimary text-[16px] font-medium flex-1">
                  {col.title}
                </span>
              </div>

              {/* Right Controls */}
              <div className="flex flex-row items-center gap-[12px]">
                {/* Flash / Amount / SOL / P1 P2 P3 */}
                <div className="hidden lg:block">
                  <div
                    className="
          overflow-hidden whitespace-nowrap border-primaryStroke
          font-normal border flex flex-row h-[28px] pl-[4px] gap-[6px]
          justify-start items-center rounded-full
          hover:bg-primaryStroke/35 transition-colors duration-125 cursor-pointer
        "
                  >
                    {/* Flash Icon */}
                    <span className="flex text-[14px] text-textTertiary font-medium">
                      <i className="ri-flashlight-fill"></i>
                    </span>

                    {/* Input “0.0” */}
                    <div className="flex flex-1 sm:max-w-[32px] min-w-0">
                      <input
                        type="text"
                        placeholder="0.0"
                        defaultValue="0"
                        className="
              text-[12px] w-full outline-none bg-transparent
              text-textPrimary placeholder:text-textTertiary
              font-medium text-left
            "
                      />
                    </div>

                    {/* SOL Icon */}
                    <img
                      src="https://axiom.trade/images/sol-fill.svg"
                      width={14}
                      height={14}
                      alt="SOL"
                      className="w-[14px] h-[14px]"
                    />

                    {/* Divider + P1 / P2 / P3 */}
                    <div
                      className="
            border-primaryStroke border-l flex h-full px-[2px] gap-[3px]
            justify-center items-center cursor-pointer
          "
                    >
                      {["P1", "P2", "P3"].map((label) => {
                        const isActive = label === "P1";
                        const isLast = label === "P3";
                        return (
                          <HoverPopover
                            key={label}
                            trigger={
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedPreset(label);
                                  setModalOpen(true);
                                }}
                                className={`
                                  group w-[22px] h-[22px] flex justify-center items-center
                                  ${isLast ? "rounded-r-full rounded-l-[4px]" : "rounded-[4px]"}
                                  transition-colors duration-125
                                  ${
                                    isActive
                                      ? "hover:bg-primaryBlueHover/10"
                                      : "hover:bg-primaryStroke/60"
                                  }
                                `}
                              >
                                <span
                                  className={`
                                    text-[12px] font-medium
                                    ${
                                      isActive
                                        ? "text-primaryBlue group-hover:text-primaryBlueHover"
                                        : "text-textSecondary"
                                    }
                                  `}
                                >
                                  {label}
                                </span>
                              </button>
                            }
                          >
                            <FilterOptions />
                          </HoverPopover>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Equalizer icon */}
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="
        flex flex-row p-[4px] w-[24px] h-[24px] justify-center items-center
        rounded-[8px] sm:rounded-[4px]
        hover:bg-primaryStroke/30 cursor-pointer
        transition-opacity duration-150 ease-in-out
      "
                      >
                        <i className="ri-equalizer-3-line text-[16px] text-textSecondary"></i>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Filters</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3a3a3a] scrollbar-track-[#1a1a1a] hover:scrollbar-thumb-[#4a4a4a]">
              <div>
                {isLoading ? (
                  // Show 6 skeletons per column while loading
                  Array.from({ length: 6 }).map((_, i) => (
                    <TokenCardSkeleton key={i} />
                  ))
                ) : (
                  tokensByColumn[col.key].map((t) => (
                    <TokenCard key={t.id} token={t} />
                  ))
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      <TradingSettingsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        preset={selectedPreset}
      />
    </main>
  );
}
