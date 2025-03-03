import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import Navbar from "./components/Navbar";
import { SolanaProvider } from "./components/providers/solana-provider";
import { ClusterProvider } from "./components/cluster/cluster-data-access";
import { EVMProvider } from "./components/providers/evm-provider";
import { SwapProvider } from "./components/SwapContext";

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

// Remove or modify the config export
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClusterProvider>
          <SolanaProvider>
            <EVMProvider>
              <SwapProvider>
                <Navbar />
                {children}
              </SwapProvider>
            </EVMProvider>
          </SolanaProvider>
        </ClusterProvider>
      </body>
    </html>
  );
}
