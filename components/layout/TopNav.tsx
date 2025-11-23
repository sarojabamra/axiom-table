"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export default function TopNav() {
  const links = [
    "Discover",
    "Pulse",
    "Trackers",
    "Perpetuals",
    "Yield",
    "Vision",
    "Portfolio",
    "Rewards",
  ];

  return (
    <nav
      className="
      border-b border-primaryStroke
      overflow-hidden
      flex flex-row w-full
      h-[52px] sm:h-[64px]
      min-h-[48px] sm:min-h-[64px]
      px-[16px] sm:px-[16px] lg:px-[24px]
      gap-[16px] sm:gap-[16px] lg:gap-[24px]
      justify-between sm:justify-start
      items-center
    "
    >
      {/* LEFT LOGO */}
      <div
        className="
        flex flex-row flex-shrink-0 gap-[0px]
        justify-start items-center
        w-[36px] sm:w-[24px] 2xl:w-[130px]
      "
      >
        <a href="/?chain=sol">
          <div className="flex flex-row items-center">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              className="w-[36px] h-[36px] sm:w-[36px] sm:h-[36px] text-textPrimary"
              fill="currentColor"
            >
              <g clipPath="url(#ax)">
                <path d="M24.1384 17.3876H11.8623L18.0001 7.00012L24.1384 17.3876Z" />
                <path d="M31 29.0003L5 29.0003L9.96764 20.5933L26.0324 20.5933L31 29.0003Z" />
              </g>
              <defs>
                <clipPath id="ax">
                  <rect width="26" height="22" transform="translate(5 7)" />
                </clipPath>
              </defs>
            </svg>

            {/* 2XL full logo */}
            <svg
              width="102"
              height="21"
              viewBox="0 0 103 19"
              className="max-w-[102px] hidden 2xl:block text-textPrimary"
              fill="currentColor"
            >
              {/* Entire path from production HTML */}
              <path d="M56.1914..." />
            </svg>
          </div>
        </a>
      </div>

      {/* NAV LINKS */}
      <div className="relative flex hidden sm:flex flex-1 min-w-[0px]">
        <div className="flex overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-row gap-[4px] items-center">
            {links.map((label) => (
              <a href={`/${label.toLowerCase()}?chain=sol`} key={label}>
                <button
                  className={`
                    flex flex-row h-[32px] text-nowrap px-[8px] xl:px-[14px]
                    justify-start items-center rounded-[4px]
                    [transition:none]
                    hover:bg-primaryBlue/20 hover:text-primaryBlue
                    duration-0 hover:[transition:background-color_135ms_ease-in-out,color_135ms_ease-in-out]

                    ${
                      label === "Pulse"
                        ? "text-primaryBlue"
                        : "text-textPrimary"
                    }
                  `}
                >
                  <span className="text-[14px] font-medium">{label}</span>
                </button>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <button
        className="
          hidden sm:flex flex-shrink-0 whitespace-nowrap
          border-primaryStroke border-[1px]
          h-[32px] sm:px-[8px] md:px-[8px] lg:px-[8px]
          2xl:pl-[12px] 2xl:pr-[6px]
          gap-[8px] justify-center items-center
          rounded-full hover:bg-primaryStroke/35
          transition-colors duration-125 cursor-pointer
        "
      >
        <i className="pt-[0px] ri-search-2-line text-[18px] text-textPrimary"></i>

        <span className="text-[12px] text-textTertiary font-medium hidden 2xl:block">
          Search by token or CA...
        </span>

        <div className="hidden 2xl:block border-primaryStroke border-[1px] text-[12px] h-[20px] px-[8px] flex items-center rounded-full">
          <span className="text-textPrimary">/</span>
        </div>
      </button>

      {/* SOL SELECTOR */}
      <div className="hidden sm:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="
                hover:brightness-125 border-[2px]
                flex flex-shrink-0 flex-row
                h-[32px] pl-[8px] pr-[6px] gap-[6px]
                justify-center items-center rounded-full
                transition-all duration-150 ease-in-out active:scale-[0.96]
              "
              style={{ borderColor: "rgba(20,241,149,0.1)" }}
            >
              <img
                src="/images/sol-fill.svg"
                className="w-[16px] h-[16px]"
                alt="Solana"
              />
              <span className="text-[14px] text-textPrimary font-medium">
                SOL
              </span>
              <i className="ri-arrow-down-s-line text-textPrimary text-[18px]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent />
        </DropdownMenu>
      </div>

      {/* RIGHT SIDE BUTTONS - PIXEL PERFECT */}
      <div className="flex items-center gap-[8px] sm:gap-[16px]">
        {/* DEPOSIT */}
        <button
          className="
            hidden sm:flex bg-primaryBlue h-[32px] px-[12px]
            flex-row justify-start items-center rounded-full
            hover:bg-primaryBlueHover
          "
        >
          <span className="text-nowrap text-background text-[14px] font-bold">
            Deposit
          </span>
        </button>

        {/* MOBILE TOOLBAR */}
        <div className="flex sm:hidden items-center gap-[8px]">
          <MobileNavButtons />
        </div>

        {/* DESKTOP STAR */}
        <button
          className="
          hidden sm:flex bg-primaryStroke hover:bg-secondaryStroke/80
          w-[32px] h-[32px] px-[12px] rounded-full justify-center items-center
        "
        >
          <i className="ri-star-line text-[18px] text-textPrimary" />
        </button>

        {/* DESKTOP BELL */}
        <button
          className="
          bg-primaryStroke hover:bg-secondaryStroke/80
          w-[32px] h-[32px] rounded-full justify-center items-center
        "
        >
          <i className="ri-notification-3-line text-[18px] text-textPrimary" />
        </button>

        {/* WALLET PILL */}
        <button
          className="
          bg-primaryStroke hover:bg-secondaryStroke/80
          w-fit min-w-max h-[32px]
          px-[12px] py-[8px] rounded-full
          flex items-center gap-[8px]
        "
        >
          <i className="ri-wallet-line text-[18px] text-textPrimary" />

          <div className="hidden xl:flex items-center gap-[4px]">
            <img src="/images/sol-fill.svg" className="w-[16px]" />
            <span className="text-[14px] font-semibold text-textPrimary">
              0
            </span>
          </div>

          <div className="hidden xl:block w-[1px] h-full bg-secondaryStroke"></div>

          <div className="hidden xl:flex items-center gap-[4px]">
            <img src="/images/usdc-perps.svg" className="w-[18px]" />
            <span className="text-[14px] font-semibold text-textPrimary">
              0
            </span>
          </div>

          <i className="ri-arrow-down-s-line text-[18px] text-textPrimary" />
        </button>

        {/* SETTINGS */}
        <button
          className="
          bg-primaryStroke hover:bg-secondaryStroke/80
          w-[32px] h-[32px] rounded-full justify-center items-center
        "
        >
          <i className="ri-user-settings-line text-[18px] text-textPrimary" />
        </button>
      </div>
    </nav>
  );
}

function MobileNavButtons() {
  return (
    <>
      {/* SOL mobile */}
      <button
        className="
        hover:brightness-125 border-[2px]
        h-[32px] pl-[8px] pr-[6px] gap-[6px]
        flex items-center rounded-full
      "
      >
        <img src="/images/sol-fill.svg" className="w-[16px]" />
        <span className="text-[14px] font-medium text-textPrimary">SOL</span>
        <i className="ri-arrow-down-s-line text-[18px] text-textPrimary" />
      </button>

      {/* GLOBAL */}
      <button
        className="
        bg-primaryStroke hover:bg-secondaryStroke/80
        h-[32px] px-[8px] gap-[4px]
        flex items-center rounded-full
      "
      >
        <i className="ri-global-line text-[18px] text-textPrimary" />
        <span className="text-[12px] font-medium sm:text-[14px]">GLOBAL</span>
        <i className="ri-arrow-down-s-line text-[18px] text-textPrimary" />
      </button>

      {/* BELL */}
      <button
        className="
        bg-primaryStroke hover:bg-secondaryStroke/80
        w-[32px] h-[32px] px-[10px] rounded-full flex items-center
      "
      >
        <i className="ri-notification-3-line text-[18px] text-textPrimary" />
      </button>

      {/* WALLET */}
      <button
        className="
        bg-primaryStroke hover:bg-secondaryStroke/80
        w-[32px] h-[32px] px-[10px] rounded-full flex items-center
      "
      >
        <i className="ri-wallet-line text-[18px] text-textPrimary" />
      </button>

      {/* SETTINGS */}
      <button
        className="
        bg-primaryStroke hover:bg-secondaryStroke/80
        w-[32px] h-[32px] px-[10px] rounded-full flex items-center
      "
      >
        <i className="ri-user-settings-line text-[18px] text-textPrimary" />
      </button>
    </>
  );
}
