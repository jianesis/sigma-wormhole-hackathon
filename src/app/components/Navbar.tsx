"use client";

import { useState, CSSProperties } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "@wagmi/core";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect } from "react";
import Badges from './Badges';

export default function Navbar() {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect();
  const { publicKey, connect: connectSolana, wallets, select } = useWallet();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleMetaMaskConnect = async () => {
    console.log('MetaMask connect clicked');
    try {
      await connect({ connector: injected() });
      setDropdownOpen(false);
    } catch (error) {
      console.error("Failed to connect to MetaMask:", error);
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

  const buttonStyle: CSSProperties = {
    width: '100%',
    color: '#F5F5F5',
    backgroundColor: '#2F855A',
    borderRadius: '20px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: '1px solid #4F3738',
    marginBottom: '3px',
  };

  return (
    <nav className="bg-[#A3A830] shadow-lg w-full">
      <div className="max-w-full px-4 py-3 flex justify-between items-center">
        <div className="flex items-center flex-shrink-0">
          <img src="/favicon.ico" alt="Favicon" className="h-8 w-8 mr-2" />
          <div className="text-[#F5F5F5] text-2xl font-bold">Bamboo$prout</div>
        </div>
        <div className="flex items-center gap-4 flex-grow justify-end pr-8">
          <div className="relative">
            <button
              id="wallet-button"
              onClick={toggleDropdown}
              className="text-[#F5F5F5] bg-green-900 hover:bg-green-800 rounded-full w-[240px] h-[60px] flex items-center justify-center text-center"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Select Wallet
            </button>
            {dropdownOpen && (
              <div
                id="wallet-dropdown"
                className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-lg rounded-md w-[240px] p-2"
                style={{ borderRadius: '20px', zIndex: 9999 }}
                role="menu"
                aria-label="Wallet selection"
              >
                <button
                  onClick={handleMetaMaskConnect}
                  style={buttonStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#276749')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2F855A')}
                  role="menuitem"
                  tabIndex={0}
                >
                  {isConnected && address
                    ? address.toString().slice(0, 6) +
                      "..." +
                      address.toString().slice(-4)
                    : "Connect Metamask"}
                </button>
                <button
                  onClick={handleSolanaConnect}
                  style={buttonStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#276749')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2F855A')}
                  role="menuitem"
                  tabIndex={0}
                >
                  {solAddr
                    ? solAddr.toString().slice(0, 6) +
                      "..." +
                      solAddr.toString().slice(-4)
                    : "Connect Solana"}
                </button>
              </div>
            )}
          </div>
          <Badges />
        </div>
      </div>
    </nav>
  );
}
