"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "@wagmi/core";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import Badges from "./Badges";
import Link from "next/link";
import { WalletButton } from "./providers/solana-provider";
import SwapWidget from "./SwapWidget";
import { useSwap } from "./SwapContext";

export default function Navbar() {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { publicKey, connect: connectSolana, wallets, select } = useWallet();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSwapOpen, setIsSwapOpen } = useSwap();

  let solAddr = null;
  if (publicKey) {
    solAddr = new PublicKey(publicKey).toString();
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("wallet-dropdown");
      const button = document.getElementById("wallet-button");
      if (
        dropdown &&
        button &&
        !dropdown.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleEthereumConnect = async () => {
    console.log("Ethereum connect clicked");
    try {
      await connect({ connector: injected() });
      setDropdownOpen(false);
    } catch (error) {
      console.error("Failed to connect to Ethereum:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#A3A830] shadow-lg"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <div className="max-w-full px-4 py-3 flex justify-between items-center">
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center cursor-pointer">
            <img src="/favicon.ico" alt="Favicon" className="h-8 w-8 mr-2" />
            <div className="text-[#F5F5F5] text-2xl font-bold">
              Treetherium Launchpad
            </div>
          </Link>
        </div>
        <div
          className={`relative flex items-center gap-4 flex-grow transition-all duration-300 ${
            isScrolled ? "justify-end" : "justify-end pr-30"
          }`}
        >
          <div
            className={`relative transition-all duration-300 flex gap-4 ${
              isScrolled
                ? "transform translate-x-0"
                : "transform translate-x-[180px]"
            }`}
          >
            <button
              onClick={() => setIsSwapOpen(true)}
              className="text-[#F5F5F5] bg-[#1B4332] hover:bg-[#143728] rounded-full w-[240px] h-[60px] flex items-center justify-center gap-2 text-center font-inter font-extrabold text-lg uppercase tracking-tight"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="currentColor"
                className="w-6 h-6"
              >
                <title>swap-vertical</title>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="invisible_box" data-name="invisible box">
                    <rect width="48" height="48" fill="none" />
                  </g>
                  <g id="icons_Q2" data-name="icons Q2">
                    <g>
                      <path
                        d="M24.4,33.5a2.1,2.1,0,0,0,.2-2.7,1.9,1.9,0,0,0-3-.2L17,35.2V8a2,2,0,0,0-4,0V35.2L8.4,30.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7l8,7.9a1.9,1.9,0,0,0,2.8,0Z"
                        fill="white"
                      />
                      <path
                        d="M23.6,14.5a2.1,2.1,0,0,0-.2,2.7,1.9,1.9,0,0,0,3,.2L31,12.8V40a2,2,0,0,0,4,0V12.8l4.6,4.6a1.9,1.9,0,0,0,3-.2,2.1,2.1,0,0,0-.2-2.7l-8-7.9a1.9,1.9,0,0,0-2.8,0Z"
                        fill="white"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              Swap Tokens
            </button>
            <button
              id="wallet-button"
              onClick={toggleDropdown}
              className="text-[#F5F5F5] bg-[#1B4332] hover:bg-[#143728] rounded-full w-[240px] h-[60px] flex items-center justify-center gap-2 text-center font-inter font-extrabold text-lg uppercase tracking-tight"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 969.486 969.486"
                fill="currentColor"
                className="w-6 h-6"
              >
                <g>
                  <path
                    d="M806.582,235.309L766.137,87.125l-137.434,37.51L571.451,9.072L114.798,235.309H0v725.105h907.137V764.973h62.35v-337.53h-62.352V235.309H806.582z M718.441,170.63l17.654,64.68h-52.561h-75.887h-126.19l111.159-30.339l66.848-18.245L718.441,170.63z M839.135,892.414H68V522.062v-129.13v-10.233v-69.787v-9.602h35.181h27.538h101.592h409.025h75.889h37.43h35.242h35.244h13.994v51.272v72.86h-15.357h-35.244h-87.85H547.508h-55.217v27.356v75.888v8.758v35.244v35.244v155.039h346.846v127.441H839.135z M901.486,696.973h-28.352h-34H560.291V591.375v-35.244v-35.244v-23.889v-1.555h3.139h90.086h129.129h56.492h34h4.445h23.904V696.973z M540.707,100.191l21.15,42.688l-238.955,65.218L540.707,100.191z"
                    fill="white"
                  />
                  <polygon
                    points="614.146,564.57 614.146,576.676 614.146,631.152 680.73,631.152 680.73,564.57 658.498,564.57"
                    fill="white"
                  />
                </g>
              </svg>
              Select Wallet
            </button>
            {dropdownOpen && (
              <div
                id="wallet-dropdown"
                className="absolute right-0 mt-2 bg-white shadow-lg w-[240px] p-2"
                style={{
                  borderRadius: "20px",
                  zIndex: 9999,
                  top: "100%", // Position below the button
                  marginTop: "0.5rem", // Add some spacing
                }}
                role="menu"
                aria-label="Wallet selection"
              >
                <button
                  onClick={handleEthereumConnect}
                  className="wallet-button-wrapper"
                  role="menuitem"
                  tabIndex={0}
                >
                  {isConnected && address
                    ? address.toString().slice(0, 6) +
                      "..." +
                      address.toString().slice(-4)
                    : "Connect Ethereum"}
                </button>
                <WalletButton />
              </div>
            )}
          </div>
          <div
            className={`transition-all duration-300 ${
              isScrolled
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <Badges />
          </div>
        </div>
      </div>
      <SwapWidget isOpen={isSwapOpen} onClose={() => setIsSwapOpen(false)} />
    </nav>
  );
}
