"use client";

import React from "react";

/* --------------------
   TYPES
   -------------------- */

interface QuickItemProps {
  icon: string;
  label: string;
  dot?: boolean;
}

interface PriceProps {
  icon: string;
  value: string;
  className?: string;
}

interface RightIconProps {
  icon: string;
}

/* --------------------
   MAIN COMPONENT
   -------------------- */

export default function BottomFooter(): JSX.Element {
  const quickItems: QuickItemProps[] = [
    { icon: "ri-wallet-3-line", label: "Wallet", dot: true },
    { icon: "ri-twitter-x-line", label: "Twitter", dot: true },
    { icon: "ri-compass-3-line", label: "Discover", dot: true },
    { icon: "ri-pulse-line", label: "Pulse", dot: true },
    { icon: "ri-bar-chart-line", label: "PnL", dot: false },
  ];

  const rightIcons: RightIconProps[] = [
    { icon: "ri-layout-top-line" },
    { icon: "ri-notification-3-line" },
    { icon: "ri-palette-line" },
  ];

  return (
    <div className="border-t border-primaryStroke w-full h-[36px] min-h-[36px] text-nowrap">
      <div className="relative flex w-full h-full">
        <div
          className="flex overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          flex-row justify-between w-full h-full px-[24px] gap-[16px] items-center min-w-0"
        >
          {/* LEFT GROUP */}
          <div className="flex flex-row flex-shrink-0 gap-[8px] items-center">
            <button
              className="text-primaryBlue bg-primaryBlue/20 flex h-[24px] px-[8px] gap-[4px] items-center rounded-[4px]
              hover:bg-primaryBlue/25 transition-colors duration-150"
            >
              <i className="ri-list-settings-line text-[16px]" />
              <span className="text-[12px] font-semibold">PRESET 1</span>
            </button>

            <WalletSelector />

            <div className="w-[1px] h-[20px] bg-primaryStroke" />

            {quickItems.map((item, idx) => (
              <QuickItem key={idx} {...item} />
            ))}
          </div>

          {/* CENTER ICONS */}
          <CenterBadges />

          {/* RIGHT GROUP */}
          <div className="flex flex-row flex-shrink-0 gap-[8px] items-center">
            <RightMetrics />

            <div className="hidden 2xl:flex w-[1px] h-[20px] bg-primaryStroke" />

            <ConnectionStatus />
            <GlobalSelect />

            <div className="w-[1px] h-[20px] bg-primaryStroke" />

            <div className="text-textSecondary flex flex-row gap-[8px] items-center">
              {rightIcons.map((item, i) => (
                <RightIcon key={i} icon={item.icon} />
              ))}

              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------
   SUBCOMPONENTS
   -------------------------- */

function WalletSelector(): JSX.Element {
  return (
    <button
      className="group flex border border-primaryStroke h-[24px] pl-[8px] pr-[5px] gap-[6px] items-center rounded-full
      hover:bg-primaryStroke/60 transition-colors duration-125"
    >
      <div className="flex gap-[4px] items-center">
        <i className="ri-wallet-line text-[14px] text-textTertiary group-hover:text-textSecondary transition" />
        <span className="text-[12px] font-medium text-textSecondary">1</span>
      </div>

      <div className="flex gap-[4px] items-center">
        <img
          src="https://axiom.trade/images/sol-fill.svg"
          width={14}
          height={14}
          alt="SOL"
        />
        <span className="text-[12px] font-medium text-textSecondary">0</span>
      </div>

      <i className="ri-arrow-down-s-line text-[14px] text-textSecondary" />
    </button>
  );
}

function QuickItem({ icon, label, dot }: QuickItemProps): JSX.Element {
  return (
    <button
      className="group relative flex h-[24px] px-[4px] gap-[4px] items-center rounded-[4px]
      hover:bg-primaryStroke/60 transition border border-transparent"
    >
      {dot && (
        <div
          className="border border-background absolute top-[-1px] right-[-3px]
          w-[7px] h-[7px] bg-decrease rounded-full"
        />
      )}

      <i
        className={`${icon} text-[16px] text-textTertiary group-hover:text-textSecondary`}
      />
      <span className="text-textSecondary text-[12px] font-medium">
        {label}
      </span>
    </button>
  );
}

function CenterBadges(): JSX.Element {
  return (
    <div className="flex flex-1 flex-row gap-[8px] items-center">
      {/* Rainbow pill */}
      <div className="hidden lg:flex h-[24px] items-center">
        <div className="relative">
          <div
            className="h-[20px] px-[4px] rounded-full opacity-30"
            style={{
              background:
                "linear-gradient(to right, #53D38E, #E78C19, #FF4662)",
              width: 40,
            }}
          />
          <div className="absolute inset-[2px] bg-background rounded-full flex items-center justify-center gap-[0px]">
            <img
              src="https://axiom.trade/images/pump.svg"
              width={11}
              height={11}
              alt="pump"
            />
            <img
              src="https://axiom.trade/images/bonk.svg"
              width={11}
              height={11}
              alt="bonk"
            />
            <img
              src="https://axiom.trade/images/virtual-curve.svg"
              width={11}
              height={11}
              alt="vc"
            />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-[1px] h-[20px] bg-primaryStroke" />

      {/* Prices */}
      <Price
        icon="/images/btc-fill.svg"
        value="$86.7K"
        className="hidden 2xl:flex text-[#F7931A]"
      />
      <Price
        icon="/images/eth-fill.svg"
        value="$2795"
        className="hidden 2xl:flex text-[#497493]"
      />
      <Price
        icon="https://axiom.trade/images/sol-fill.svg"
        value="$131.18"
        className="hidden lg:flex text-[#14F195]"
      />
    </div>
  );
}

function Price({ icon, value, className = "" }: PriceProps): JSX.Element {
  return (
    <button className={`${className} flex items-center gap-[4px] h-[24px]`}>
      <img src={icon} width={16} height={16} alt={value} />
      <span className="text-[12px]">{value}</span>
    </button>
  );
}

function RightMetrics(): JSX.Element {
  return (
    <>
      <div className="hidden 2xl:flex">
        <button className="-mr-[8px] group flex items-center gap-[4px] h-[24px] px-2 rounded hover:bg-secondaryStroke/40 text-textTertiary">
          <i className="icon-pump text-[14px]" />
          <span className="text-[12px] group-hover:text-textSecondary">
            $53.9K
          </span>
        </button>
      </div>

      <div className="hidden 2xl:flex items-center gap-[4px]">
        <i className="ri-gas-station-line text-[16px] text-textTertiary" />
        <span className="text-[12px] text-textTertiary">
          0.0<sub>2</sub>2
        </span>
      </div>

      <div className="hidden 2xl:flex items-center gap-[4px]">
        <i className="ri-coin-line text-[16px] text-textTertiary" />
        <span className="text-[12px] text-textTertiary">0.0322</span>
      </div>
    </>
  );
}

function ConnectionStatus(): JSX.Element {
  return (
    <button
      className="flex items-center gap-[6px] h-[24px] px-[10px] rounded-[4px]
      bg-[#0D2B23]/90 text-[#14F195] font-medium text-[12px]"
    >
      <span className="flex items-center">
        <span className="w-[12px] h-[12px] rounded-full bg-[#14F195]/30 flex items-center justify-center">
          <span className="w-[8px] h-[8px] rounded-full bg-[#14F195]" />
        </span>
      </span>

      <span>Connection is stable</span>
    </button>
  );
}

function GlobalSelect(): JSX.Element {
  return (
    <button className="flex items-center gap-1 px-2 h-[24px] text-[12px] font-medium rounded hover:bg-secondaryStroke/40 text-textSecondary">
      GLOBAL
      <i className="ri-arrow-down-s-line text-[14px]" />
    </button>
  );
}

function RightIcon({ icon }: RightIconProps): JSX.Element {
  return (
    <button className="w-[24px] h-[24px] rounded-[4px] flex items-center justify-center hover:bg-secondaryStroke/40">
      <i className={`${icon} text-[16px]`} />
    </button>
  );
}

function SocialIcons(): JSX.Element {
  return (
    <>
      <div className="hidden md:flex w-[1px] h-[20px] bg-primaryStroke" />

      <div className="hidden md:flex gap-[16px] items-center">
        <a href="#" className="hover:opacity-80">
          <i className="ri-discord-fill text-[16px]" />
        </a>
        <a href="#" className="hover:opacity-80">
          <i className="ri-twitter-x-line text-[16px]" />
        </a>
      </div>

      <a
        href="#"
        className="hidden md:flex gap-[2px] h-[24px] px-[8px] items-center rounded-[4px] hover:bg-hoverPrimary"
      >
        <i className="ri-article-line text-[16px]" />
        <span className="hidden lg:flex text-[12px]">Docs</span>
      </a>
    </>
  );
}
