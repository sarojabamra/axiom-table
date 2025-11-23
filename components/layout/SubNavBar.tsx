"use client";

export default function SubNavBar() {
  return (
    <div
      className="
        grayscale-[30%] hover:grayscale-0
        transition-[filter]
        relative flex flex-row w-full
        h-[28px] gap-[8px]
        px-[16px] pb-[1px]
        overflow-hidden
        border-b border-primaryStroke sm:border-primaryStroke/50
      "
    >
      {/* SETTINGS BUTTON */}
      <div className="flex flex-row h-full items-center z-20 gap-[8px]">
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
      </div>

      {/* DIVIDER */}
      <div className="flex flex-row h-full items-center z-20 gap-[8px]">
        <div className="w-[1px] h-[16px] bg-primaryStroke" />
      </div>

      {/* STAR + CHART BUTTONS */}
      <div className="flex flex-row h-full items-center z-20 gap-[8px]">
        {/* STAR */}
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

        {/* LINE CHART */}
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
        >
          {/* required empty spacer from Axiom HTML */}
          <div
            style={{
              width: "0px",
              height: "100%",
              position: "relative",
              display: "flex",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
