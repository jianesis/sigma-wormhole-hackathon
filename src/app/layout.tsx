import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { createConfig } from "wagmi";
import { http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import Navbar from "./components/Navbar";
import { SolanaProvider } from "./components/providers/solana-provider";
import { ClusterProvider } from "./components/cluster/cluster-data-access";
import { injected } from "@wagmi/core";
import { EVMProvider } from "./components/providers/evm-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Treetherium Launchpad",
  description: "Multichain launchpad",
};

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [injected()],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EVMProvider>
          <ClusterProvider>
            <SolanaProvider>
              <Navbar />
              <main className="bg-black">{children}</main>
            </SolanaProvider>
          </ClusterProvider>
        </EVMProvider>
      </body>
    </html>
  );
}
