"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function HoverPopover({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 100);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="center"
        className="w-[75px] p-0 bg-[#111111] border-primaryStroke flex flex-col gap-[1px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}

export function FilterOptions() {
  const options = [
    { icon: "ri-run-line", label: "20%", color: "text-textPrimary", iconColor: "text-textTertiary" },
    { icon: "ri-gas-station-line", label: "0.001", color: "text-[#E78C19]", iconColor: "text-[#E78C19]" },
    { icon: "ri-coin-line", label: "0.01", color: "text-textPrimary", iconColor: "text-textTertiary" },
    { icon: "ri-prohibited-line", label: "Off", color: "text-textTertiary", iconColor: "text-textTertiary" },
  ];

  return (
    <>
      {options.map((opt, idx) => (
        <div
          key={idx}
          className="flex items-center gap-1 px-2 py-1 transition-colors"
        >
          <i className={`${opt.icon} ${opt.iconColor} text-[12px]`} />
          <span className={`text-[12px] font-medium ${opt.color}`}>{opt.label
            }</span>
        </div>
      ))}
    </>
  );
}
