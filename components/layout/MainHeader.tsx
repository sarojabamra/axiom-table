"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HoverPopover, FilterOptions } from "@/components/layout/FilterPopover";

// Memoized to prevent re-renders during real-time token updates
const MainHeader = React.memo(() => {
  const iconButtons = [
    { icon: "ri-bookmark-line", label: "Bookmark", tooltip: "Blacklist dev, handle, keywords" },
    { icon: "ri-keyboard-box-line", label: "Keyboard", tooltip: "Pulse Hotkeys" },
    { icon: "ri-volume-up-line", label: "Volume", tooltip: "Alerts" },
    { icon: "ri-crosshair-2-line", label: "Crosshair", hasOverlay: true, tooltip: "Snipe settings" },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className="
    flex-none flex flex-row w-full h-[32px]
    justify-start items-center mb-[16px]
  "
      >
        {/* Left side: Pulse title + SOL/BNB toggle */}
        <div className="flex-1 flex items-center gap-3">
          <span className="text-textPrimary text-[20px] font-medium">Pulse</span>

          {/* SOL / BNB toggle */}
          <div className="flex items-center gap-1">
            {/* SOL active */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label="Switch to Solana"
                  className="
          relative flex items-center justify-center
          w-[32px] h-[32px] rounded-full
          transition-all duration-150
          bg-primaryStroke/60 scale-110
        "
                >
                  <img
                    src="https://axiom.trade/images/sol-fill.svg"
                    width={20}
                    height={20}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Solana</p>
              </TooltipContent>
            </Tooltip>

            {/* BNB inactive */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label="Switch to BNB"
                  className="
          relative flex items-center justify-center
          w-[32px] h-[32px] rounded-full
          transition-all duration-150
          hover:bg-primaryStroke/30 opacity-60 hover:opacity-100
        "
                >
                  <img
                    src="https://axiom.trade/images/bnb-fill.svg"
                    width={20}
                    height={20}
                    className="grayscale-[0.3]"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>BNB</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex flex-row gap-4 items-center">
          {/* FAQ / help icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="flex w-[24px] h-[24px] justify-center items-center"
              >
                <i className="ri-question-line text-[20px] text-textTertiary hover:text-textSecondary transition-all" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Help with Pulse Filters, Settings</p>
            </TooltipContent>
          </Tooltip>

          {/* Display menu */}
          <div className="relative flex">
            <button
              className="
          bg-primaryStroke flex flex-row h-[32px] px-[12px] gap-[8px]
          justify-center items-center rounded-full
          hover:bg-secondaryStroke/80 transition-all duration-150
        "
            >
              <i className="ri-list-check text-[18px] text-textPrimary" />
              <span className="text-[14px] font-bold text-textPrimary">
                Display
              </span>
              <i className="ri-arrow-down-s-line text-[18px] text-textPrimary" />
            </button>
          </div>

          {/* Icon Loop */}
          {iconButtons.map((btn, idx) => (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className={`
        ${idx !== 0 ? "-mr-[5px]" : "-mr-[5px]"} 
        group flex items-center justify-center w-8 h-8
        ${
          btn.label === "Keyboard"
            ? "rounded-full hover:bg-primaryStroke/60"
            : "bg-background hover:bg-primaryStroke/60 rounded-full"
        }
        transition-colors relative
      `}
                >
                  <i
                    className={`${btn.icon} text-[16px] text-textSecondary group-hover:text-textPrimary`}
                  />
                  {btn.hasOverlay && (
                    <i className="ri-settings-3-line text-[12px] text-textSecondary group-hover:text-textPrimary absolute bottom-0 right-0" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{btn.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          {/* Wallet selector */}
          <div className="relative flex">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="
          flex border border-primaryStroke flex-row p-[4px] px-[12px]
          h-[32px] gap-[8px] items-center rounded-full
          hover:bg-primaryStroke/35 transition-all cursor-pointer
        "
                >
                  <div className="flex gap-[4px] items-center">
                    <i className="ri-wallet-line text-[18px] text-textSecondary group-hover:text-textPrimary" />
                    <span className="text-[14px] text-textSecondary font-medium group-hover:text-textPrimary">
                      1
                    </span>
                  </div>

                  <div className="flex gap-[4px] items-center">
                    <img
                      src="https://axiom.trade/images/sol-fill.svg"
                      width={16}
                      height={16}
                    />
                    <span className="text-[14px] text-textPrimary font-medium">
                      0
                    </span>
                  </div>

                  <i className="ri-arrow-down-s-line text-[18px] text-textSecondary group-hover:text-textPrimary" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Active wallets</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Mobile flash/P filters (only visible on some breakpoints) */}
          <div className="hidden sm:block lg:hidden">
            <div className="flex flex-row h-full gap-[8px] items-center">
              <div
                className="
            overflow-hidden whitespace-nowrap border border-primaryStroke
            flex flex-row min-w-[216px] h-[32px] pl-[12px] gap-[8px]
            items-center rounded-full hover:bg-primaryStroke/35 transition-colors
          "
              >
                <i className="ri-flashlight-fill text-textTertiary text-[14px]" />

                <div className="flex flex-1 min-w-0 max-w-[60px]">
                  <input
                    type="text"
                    placeholder="0.0"
                    defaultValue="0"
                    className="
                text-[14px] bg-transparent w-full outline-none
                text-textPrimary placeholder:text-textTertiary font-medium
              "
                  />
                </div>

                <img
                  src="https://axiom.trade/images/sol-fill.svg"
                  width={16}
                  height={16}
                />

                <div className="border-l border-primaryStroke flex h-full px-[3px] gap-[6px] items-center">
                  {["P1", "P2", "P3"].map((label) => {
                    const isActive = label === "P1";
                    const isLast = label === "P3";
                    return (
                      <HoverPopover
                        key={label}
                        trigger={
                          <button
                            type="button"
                            className={`
                                  group w-[24px] h-[24px] flex justify-center items-center
                                  ${
                                    isLast
                                      ? "rounded-r-full rounded-l-[4px]"
                                      : "rounded-[4px]"
                                  }
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
                                    text-[13px] font-medium
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
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
});

MainHeader.displayName = "MainHeader";

export default MainHeader;
