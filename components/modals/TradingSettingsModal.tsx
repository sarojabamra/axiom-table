"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface TradingSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preset: string;
}

export default function TradingSettingsModal({
  open,
  onOpenChange,
}: TradingSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [slippage, setSlippage] = useState("20");
  const [priority, setPriority] = useState("0.001");
  const [bribe, setBribe] = useState("0.01");
  const [autoFee, setAutoFee] = useState(false);
  const [maxFee, setMaxFee] = useState("0.1");
  const [mevMode, setMevMode] = useState<"off" | "reduced" | "secure">("off");
  const [rpc, setRpc] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="z-[999] w-[364px] max-h-[880px] p-0 gap-0 bg-transparent border-none shadow-none"
        overlayClassName="bg-black/50"
      >
        <div 
          className="relative w-[364px] max-h-[880px]" 
          tabIndex={0} 
          style={{ opacity: 1, transform: "translateY(4px)" }}
        >
          <div className="flex flex-col w-full h-full bg-[#121212] border-[1px] border-secondaryStroke rounded-[8px] sm:rounded-[4px] shadow-[0_4px_4px_0_rgba(0,0,0,0.30),0_8px_8px_0_rgba(0,0,0,0.45)]">
            {/* Header */}
            <div className="flex flex-row w-full h-[44px] pl-[16px] pr-[12px] justify-between items-center border-b-[1px] border-b-secondaryStroke">
              <span className="text-textPrimary text-[14px] leading-[20px] tracking-[-0.02em] font-medium">
                Trading Settings
              </span>
            </div>

            {/* Tabs */}
            <div className="flex flex-col p-[16px] gap-[16px]">
              <div className="border border-secondaryStroke/50 flex flex-row rounded-[8px] p-[4px]">
                <button 
                  onClick={() => setActiveTab("buy")}
                  className={`flex-1 h-[28px] rounded-[4px] sm:rounded-[4px] transition-colors ${
                    activeTab === "buy" 
                      ? "bg-[#14F195]/[12%] text-[#14F195]" 
                      : "bg-transparent text-[#CCCCCC] hover:bg-primaryStroke/40"
                  }`}
                >
                  <span className="text-[14px] font-medium">Buy Settings</span>
                </button>
                <button 
                  onClick={() => setActiveTab("sell")}
                  className={`flex-1 h-[28px] rounded-[4px] sm:rounded-[4px] transition-colors ${
                    activeTab === "sell" 
                      ? "bg-[#14F195]/[12%] text-[#14F195]" 
                      : "bg-transparent text-[#CCCCCC] hover:bg-primaryStroke/40"
                  }`}
                >
                  <span className="text-[14px] font-medium">Sell Settings</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 p-[16px] gap-[16px] justify-start pt-0">
              {/* Inputs Row */}
              <div className="flex flex-row w-full gap-[16px] justify-start items-center">
                <div className="flex flex-row flex-1 gap-[16px] justify-start items-center">
                  {/* Slippage */}
                  <div className="border border-secondaryStroke flex flex-col flex-1 h-[52px] justify-center items-center rounded-[8px] sm:rounded-[4px] group hover:border-textPrimary/10 focus-within:border-textPrimary/10 transition-colors duration-[150ms] ease-in-out cursor-text">
                    <div className="bg-secondaryStroke/50 border-b border-secondaryStroke flex flex-row w-full h-[28px]">
                      <div className="relative flex flex-row w-full h-full items-center justify-center">
                        <input 
                          placeholder="0.0" 
                          className="w-[calc(100%-20px)] px-[12px] text-textPrimary text-[14px] outline-none placeholder:text-textTertiary leading-[28px] text-center align-middle bg-transparent" 
                          type="text" 
                          value={slippage}
                          onChange={(e) => setSlippage(e.target.value)}
                        />
                        <span className="pointer-events-none absolute right-[0px] text-textTertiary text-[14px] w-[20px]">%</span>
                      </div>
                    </div>
                    <div className="flex flex-row w-full h-[24px] justify-center items-center">
                      <i className="ri-percent-line text-textTertiary mr-[4px] text-[12px]" />
                      <span className="text-textTertiary text-[12px] leading-[16px] font-normal">SLIPPAGE</span>
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="border border-secondaryStroke flex flex-col flex-1 h-[52px] justify-center items-center rounded-[8px] sm:rounded-[4px] group hover:border-textPrimary/10 focus-within:border-textPrimary/10 transition-colors duration-[150ms] ease-in-out cursor-text">
                    <input 
                      placeholder="0.0" 
                      className="rounded-0 bg-secondaryStroke/50 border-b border-secondaryStroke flex flex-row w-full h-[28px] px-[12px] text-textPrimary text-[14px] outline-none placeholder:text-textTertiary leading-[28px] text-center" 
                      type="text" 
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    />
                    <div className="flex flex-row w-full h-[24px] justify-center items-center">
                      <i className="ri-gas-station-line text-textTertiary text-[12px] mr-[4px]"></i>
                      <span className="text-textTertiary text-[12px] leading-[16px] font-normal">PRIORITY</span>
                    </div>
                  </div>

                  {/* Bribe */}
                  <div className="border border-secondaryStroke flex flex-col flex-1 h-[52px] justify-center items-center rounded-[8px] sm:rounded-[4px] group hover:border-textPrimary/10 focus-within:border-textPrimary/10 transition-colors duration-[150ms] ease-in-out cursor-text">
                    <input 
                      placeholder="0.0" 
                      className="rounded-0 bg-secondaryStroke/50 border-b border-secondaryStroke flex flex-row w-full h-[28px] px-[12px] text-textPrimary text-[14px] outline-none placeholder:text-textTertiary leading-[28px] text-center" 
                      type="text" 
                      value={bribe}
                      onChange={(e) => setBribe(e.target.value)}
                    />
                    <div className="flex flex-row w-full h-[24px] justify-center items-center">
                      <i className="ri-coin-line text-textTertiary text-[12px] mr-[4px]"></i>
                      <span className="text-textTertiary text-[12px] leading-[16px] font-normal">BRIBE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto Fee & Max Fee */}
              <div className="flex flex-row w-full h-[32px] gap-[16px] justify-start items-center">
                <div className="flex flex-row w-full max-w-[100px] min-w-[100px] h-[32px] gap-[16px] justify-start items-center">
                  <span className="contents">
                    <div className="flex-1 whitespace-nowrap">
                      <div 
                        className="inline-flex flex-row h-[16px] gap-[8px] justify-start items-center cursor-pointer"
                        onClick={() => setAutoFee(!autoFee)}
                      >
                        <div className={`border-[1px] border-secondaryStroke flex flex-row w-[16px] h-[16px] p-[2px] justify-center items-center rounded-[4px] cursor-pointer ${autoFee ? 'bg-primaryBlue border-primaryBlue' : ''}`}>
                          {autoFee && <div className="w-[10px] h-[10px] bg-white rounded-[1px]"></div>}
                          {!autoFee && <div className="w-[10px] h-[10px] bg-transparent rounded-[1px]"></div>}
                        </div>
                        <span className="text-textPrimary text-[12px] font-medium text-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span>Auto Fee</span>
                          </div>
                        </span>
                      </div>
                    </div>
                  </span>
                </div>
                <div className={`relative overflow-hidden border-secondaryStroke hover:border-textPrimary/10 focus-within:border-textPrimary/10 hover:bg-primaryStroke/10 focus-within:bg-primaryStroke/10 font-normal border-[1px] flex flex-row w-full h-[32px] pl-[12px] gap-[8px] justify-start items-center rounded-full ${autoFee ? 'opacity-[0.5] cursor-not-allowed pointer-events-none' : ''}`}>
                  <span className="flex-shrink-0 text-[14px] text-textTertiary font-medium">MAX FEE</span>
                  <input 
                    placeholder="0.0" 
                    className="flex-1 min-w-0 text-[14px] text-textPrimary placeholder:text-textTertiary font-normal outline-none bg-transparent" 
                    type="text" 
                    value={maxFee}
                    onChange={(e) => setMaxFee(e.target.value)}
                    disabled={autoFee}
                  />
                </div>
              </div>

              {/* MEV Mode */}
              <div className="flex flex-row w-full justify-start items-center gap-[16px]">
                <div className="flex flex-row w-full h-[32px] gap-[16px] max-w-[100px] min-w-[100px] justify-start items-center">
                  <span className="contents">
                    <div className="flex flex-row h-[32px] gap-[4px] justify-start items-center">
                      <h3 className="text-textPrimary text-[12px] font-medium">MEV Mode</h3>
                      <i className="ri-information-line text-textTertiary text-[14px]"></i>
                    </div>
                  </span>
                </div>
                <div className="border border-secondaryStroke/50 flex flex-row w-full gap-[1px] rounded-[8px] p-[4px]">
                  <button 
                    onClick={() => setMevMode("off")}
                    className={`flex-1 h-[24px] rounded-[4px] sm:rounded-[4px] transition-colors ${
                      mevMode === "off" 
                        ? "bg-primaryBlue/15 text-primaryBlue" 
                        : "bg-transparent text-textSecondary hover:bg-primaryStroke/40"
                    }`}
                  >
                    <div className="flex flex-row justify-center items-center gap-[2px]">
                      <i className={`ri-shield-line ${mevMode === "off" ? "text-primaryBlue" : "text-textTertiary"}`} style={{ fontSize: "10px" }}></i>
                      <span className="text-[12px] font-medium">Off</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setMevMode("reduced")}
                    className={`flex-1 h-[24px] rounded-[4px] sm:rounded-[4px] transition-colors ${
                      mevMode === "reduced" 
                        ? "bg-primaryBlue/15 text-primaryBlue" 
                        : "bg-transparent text-textSecondary hover:bg-primaryStroke/40"
                    }`}
                  >
                    <div className="flex flex-row justify-center items-center gap-[2px]">
                      <i className={`ri-shield-check-line text-[12px] ${mevMode === "reduced" ? "text-primaryBlue" : "text-textTertiary"}`}></i>
                      <span className="text-[12px] font-medium">Reduced</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setMevMode("secure")}
                    className={`flex-1 h-[24px] rounded-[4px] sm:rounded-[4px] transition-colors ${
                      mevMode === "secure" 
                        ? "bg-primaryBlue/15 text-primaryBlue" 
                        : "bg-transparent text-textSecondary hover:bg-primaryStroke/40"
                    }`}
                  >
                    <div className="flex flex-row justify-center items-center gap-[2px]">
                      <i className={`ri-lock-2-line mr-[1px] ${mevMode === "secure" ? "text-primaryBlue" : "text-textTertiary"}`} style={{ fontSize: "11px" }}></i>
                      <span className="text-[12px] font-medium">Secure</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* RPC */}
              <div className="flex flex-row w-full gap-[16px] justify-start items-center">
                <div className="relative overflow-hidden border-secondaryStroke hover:border-textPrimary/10 focus-within:border-textPrimary/10 hover:bg-primaryStroke/10 focus-within:bg-primaryStroke/10 font-normal border-[1px] flex flex-row w-full h-[32px] pl-[12px] gap-[8px] justify-start items-center rounded-full">
                  <span className="flex-shrink-0 text-[14px] text-textTertiary font-medium">RPC</span>
                  <input 
                    placeholder="https://a...e.com" 
                    className="flex-1 min-w-0 text-[14px] text-textPrimary placeholder:text-textTertiary font-normal outline-none bg-transparent" 
                    type="text" 
                    value={rpc}
                    onChange={(e) => setRpc(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-secondaryStroke/50 flex flex-row w-full h-[68px] justify-end items-center p-[16px] pb-[20px]">
              <div className="flex flex-row flex-1 justify-end items-center">
                <button 
                  onClick={() => onOpenChange(false)}
                  className="flex-1 bg-primaryBlue flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center rounded-full hover:bg-primaryBlue/80 hover:brightness-110 transition-all duration-[150ms] cursor-pointer"
                >
                  <span className="text-[14px] font-bold text-background">Continue</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
