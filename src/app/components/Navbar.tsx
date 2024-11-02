"use client";

import { useState, CSSProperties, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "@wagmi/core";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import Badges from './Badges';
import Link from 'next/link';
import { WalletButton } from "./providers/solana-provider";

export default function Navbar() {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { publicKey, connect: connectSolana, wallets, select } = useWallet();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  let solAddr = null;
  if (publicKey) {
    solAddr = new PublicKey(publicKey).toString();
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('wallet-dropdown');
      const button = document.getElementById('wallet-button');
      if (
        dropdown &&
        button &&
        !dropdown.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleEthereumConnect = async () => {
    console.log('Ethereum connect clicked');
    try {
      await connect({ connector: injected() });
      setDropdownOpen(false);
    } catch (error) {
      console.error("Failed to connect to Ethereum:", error);
    }
  };

  const handleSolanaConnect = async () => {
    console.log('Solana connect clicked');
    console.log('Available wallets:', wallets);
    if (wallets.length > 0) {
      try {
        const phantomWallet = wallets.find(wallet =>
          wallet.adapter.name === 'Phantom'
        );

        if (phantomWallet) {
          select(phantomWallet.adapter.name);
          await connectSolana();
          setDropdownOpen(false);
        }
      } catch (error) {
        console.error("Failed to connect to Solana wallet:", error);
      }
    } else {
      console.error("No Solana wallets available");
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-[#A3A830] shadow-lg'
        : 'bg-gradient-to-b from-black/40 to-transparent'
    }`}>
      <div className="max-w-full px-4 py-3 flex justify-between items-center">
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center cursor-pointer">
            <img src="/favicon.ico" alt="Favicon" className="h-8 w-8 mr-2" />
            <div className="text-[#F5F5F5] text-2xl font-bold">Treetherium Launchpad</div>
          </Link>
        </div>
        <div className={`relative flex items-center gap-4 flex-grow transition-all duration-300 ${
          isScrolled ? 'justify-end' : 'justify-end pr-30'
        }`}>
          <div className={`relative transition-all duration-300 flex gap-4 ${
            isScrolled ? 'transform translate-x-0' : 'transform translate-x-[180px]'
          }`}>
            <button className="text-[#F5F5F5] bg-[#1B4332] hover:bg-[#143728] rounded-full w-[240px] h-[60px] flex items-center justify-center gap-2 text-center font-inter font-extrabold text-lg uppercase tracking-tight">
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
                    <rect width="48" height="48" fill="none"/>
                  </g>
                  <g id="icons_Q2" data-name="icons Q2">
                    <g>
                      <path d="M24.4,33.5a2.1,2.1,0,0,0,.2-2.7,1.9,1.9,0,0,0-3-.2L17,35.2V8a2,2,0,0,0-4,0V35.2L8.4,30.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7l8,7.9a1.9,1.9,0,0,0,2.8,0Z" fill="white"/>
                      <path d="M23.6,14.5a2.1,2.1,0,0,0-.2,2.7,1.9,1.9,0,0,0,3,.2L31,12.8V40a2,2,0,0,0,4,0V12.8l4.6,4.6a1.9,1.9,0,0,0,3-.2,2.1,2.1,0,0,0-.2-2.7l-8-7.9a1.9,1.9,0,0,0-2.8,0Z" fill="white"/>
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
              SELECT WALLET
            </button>
            {dropdownOpen && (
              <div
                id="wallet-dropdown"
                className="absolute right-0 mt-2 bg-white shadow-lg w-[240px] p-2"
                style={{
                  borderRadius: '20px',
                  zIndex: 9999,
                  top: '100%',  // Position below the button
                  marginTop: '0.5rem' // Add some spacing
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
          <div className={`transition-all duration-300 ${
            isScrolled
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}>
            <Badges />
          </div>
        </div>
      </div>
    </nav>
  );
}
