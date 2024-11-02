import { useAccount, useBalance } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export default function Badges() {
  const { address, isConnected: isEthereumConnected } = useAccount();
  const { connected: isSolanaConnected, publicKey } = useWallet();
  const [showEthTooltip, setShowEthTooltip] = useState(false);
  const [showSolTooltip, setShowSolTooltip] = useState(false);
  const [solanaBalance, setSolanaBalance] = useState<number | null>(null);

  // Get Ethereum balance using wagmi
  const { data: ethBalance } = useBalance({
    address: address,
  });

  // Get Solana balance
  useEffect(() => {
    const getSolanaBalance = async () => {
      if (publicKey) {
        try {
          const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com");
          const balance = await connection.getBalance(publicKey);
          setSolanaBalance(balance / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Error fetching Solana balance:", error);
        }
      }
    };

    if (isSolanaConnected) {
      getSolanaBalance();
    }
  }, [publicKey, isSolanaConnected]);

  const badgeStyle = {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 12px',
    borderRadius: '16px',
    backgroundColor: '#2F855A',
    color: '#F5F5F5',
    fontSize: '14px',
    margin: '4px',
    cursor: 'pointer',
  };

  const tooltipStyle = {
    position: 'absolute' as const,
    bottom: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    color: '#1B4332',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    whiteSpace: 'nowrap' as const,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: 10,
  };

  const statusDotStyle = (isConnected: boolean) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: isConnected ? '#4ADE80' : '#EF4444',
  });

  return (
    <div className="flex">
      <div
        style={badgeStyle}
        onMouseEnter={() => setShowEthTooltip(true)}
        onMouseLeave={() => setShowEthTooltip(false)}
      >
        <div style={statusDotStyle(isEthereumConnected)} />
        Ethereum
        {showEthTooltip && isEthereumConnected && (
          <div style={tooltipStyle}>
            Balance: {ethBalance?.formatted || '0'} {ethBalance?.symbol || 'ETH'}
          </div>
        )}
      </div>

      <div
        style={badgeStyle}
        onMouseEnter={() => setShowSolTooltip(true)}
        onMouseLeave={() => setShowSolTooltip(false)}
      >
        <div style={statusDotStyle(isSolanaConnected)} />
        Solana
        {showSolTooltip && isSolanaConnected && (
          <div style={tooltipStyle}>
            Balance: {solanaBalance?.toFixed(4) || '0'} SOL
          </div>
        )}
      </div>
    </div>
  );
}