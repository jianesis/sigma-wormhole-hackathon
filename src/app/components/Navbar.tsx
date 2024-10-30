"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { WalletButton } from "./providers/solana-provider";
import { injected } from "@wagmi/core";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Navbar() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { publicKey } = useWallet();

  let solAddr = null;
  if (publicKey) {
    solAddr = new PublicKey(publicKey).toString();
  }
  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Wormhole Launchpad</div>
        <div className="flex items-center">
          {isConnected ? (
            <div className="mr-4">
              <button className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-md">
                {address &&
                  address?.toString().slice(0, 6) +
                    "..." +
                    address?.toString().slice(-4)}
              </button>
            </div>
          ) : (
            <div className="mr-4">
              <button
                onClick={() => connect({ connector: injected() })} // Updated here
                className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-md"
              >
                Connect Metamask
              </button>
            </div>
          )}

          <WalletButton>
            {solAddr
              ? solAddr?.toString().slice(0, 6) +
                "..." +
                solAddr?.toString().slice(-4)
              : "Connect Solana"}
          </WalletButton>
        </div>
      </div>
    </nav>
  );
}
