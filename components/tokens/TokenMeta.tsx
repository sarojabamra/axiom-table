"use client";

import React from "react";
import type { Token } from "@/lib/types";

// Memoized component to prevent unnecessary re-renders during real-time updates
const TokenMeta = React.memo(({ token }: { token: Token }) => {
  return (
    <div className="mt-[2px] flex w-[200px] gap-[6px] items-start flex-wrap">
      {/* Time badge */}
      <div className="flex items-center gap-[6px] flex-shrink-0">
        <span className="text-[#14F195] text-[14px] font-medium">
          {token.timeString ?? "5s"}
        </span>
      </div>

      {/* Social icons */}
      <div className="flex flex-shrink-0 gap-[6px] items-center [&_i]:text-[14px]">
        <i className="ri-quill-pen-line text-primaryGreen" />
        <i className="icon-pill text-textSecondary hover:text-primaryBlueHover transition-colors cursor-pointer" />
        <i className="ri-search-line text-textSecondary hover:text-primaryBlueHover transition-colors cursor-pointer" />
      </div>

      {/* Counters */}
      <div className="flex gap-[6px] items-center flex-wrap">
        {/* Users */}
        <div className="flex gap-[2px] h-[16px] items-center flex-shrink-0">
          <i className="text-textTertiary ri-group-line text-[12px]" />
          <span className="text-[12px] font-medium text-white">
            {token.userCount ?? 3}
          </span>
        </div>

        {/* Pro Traders */}
        {token.proTraderCount !== undefined && (
          <div className="flex gap-[2px] h-[16px] items-center flex-shrink-0">
            <i className="icon-pro-trader text-textTertiary text-[12px]" />
            <span className="text-textPrimary text-[12px] font-medium">
              {token.proTraderCount}
            </span>
          </div>
        )}

        {/* Trophies */}
        <div className="flex gap-[2px] h-[16px] items-center flex-shrink-0">
          <i className="ri-trophy-line text-textTertiary text-[14px]" />
          <span className="text-textPrimary text-[12px] font-medium">
            {token.trophyCount ?? 0}
          </span>
        </div>

        {/* Crown */}
        <div className="flex gap-[2px] h-[16px] items-center flex-shrink-0 cursor-pointer">
          <i className="text-primaryYellow ri-vip-crown-2-line text-[14px] pb-[1.2px]" />
          <span className="text-textPrimary text-[12px] font-medium">
            {token.crownCount ?? "0/1"}
          </span>
        </div>
      </div>
    </div>
  );
});

TokenMeta.displayName = "TokenMeta";

export default TokenMeta;
