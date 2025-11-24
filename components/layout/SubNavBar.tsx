"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SubNavBar() {
  return (
    <div
      className="
        grayscale-[30%] hover:grayscale-0
        transition-[filter]
        relative flex flex-row w-full
        h-[28px] gap-[8px]
        px-[16px] py-[2px]
        border-b border-primaryStroke sm:border-primaryStroke/50
      "
    >
      {/* SETTINGS BUTTON */}
      <div className="flex flex-row h-full items-center z-20 gap-[8px]">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="
                  min-w-[24px] min-h-[24px]
                  flex items-center justify-center
                  text-textTertiary hover:text-textSecondary
                  hover:bg-primaryStroke/60
                  transition-colors duration-125 ease-in-out
                  rounded-[4px]
                "
              >
                <i className="ri-settings-3-line text-[14px]" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* DIVIDER */}
      <div className="flex flex-row h-full items-center z-20 gap-[8px]">
        <div className="w-[1px] h-[16px] bg-primaryStroke" />
      </div>

      {/* STAR + CHART BUTTONS */}
      <div className="flex flex-row h-full items-center z-20 gap-[8px]">
        {/* STAR */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="
                  min-w-[24px] min-h-[24px]
                  flex items-center justify-center
                  text-textSecondary hover:text-textSecondary
                  hover:bg-primaryStroke/60
                  transition-colors duration-125 ease-in-out
                  rounded-[4px]
                "
              >
                <i className="ri-star-line text-[14px]" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Watchlist</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* LINE CHART */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="
                  min-w-[24px] min-h-[24px]
                  flex items-center justify-center
                  text-textTertiary hover:text-textSecondary
                  hover:bg-primaryStroke/60
                  transition-colors duration-125 ease-in-out
                  rounded-[4px]
                "
              >
                <i className="ri-line-chart-line text-[14px]" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Active positions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* DIVIDER */}
      <div className="flex flex-row h-full items-center z-20 gap-[8px]">
        <div className="w-[1px] h-[16px] bg-primaryStroke" />
      </div>

      {/* TICKER SCROLL CONTAINER */}
      <div className="flex flex-row justify-start items-center flex-1 overflow-hidden show-bins-container duration-150 ease-in-out">
        <div
          className="
            h-full flex flex-row gap-[1px]
            pt-[1px] items-center
            overflow-x-auto ticker-scroll-container
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            animate-ticker
          "
        ></div>
      </div>
    </div>
  );
}
