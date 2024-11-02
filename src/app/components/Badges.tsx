import { useAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Badges() {
  const { isConnected: isEthereumConnected } = useAccount();
  const { connected: isSolanaConnected } = useWallet();

  const badgeStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 12px',
    borderRadius: '16px',
    backgroundColor: '#2F855A',
    color: '#F5F5F5',
    fontSize: '14px',
    margin: '4px',
  };

  const statusDotStyle = (isConnected: boolean) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: isConnected ? '#4ADE80' : '#EF4444',
  });

  return (
    <div className="flex">
      <div style={badgeStyle}>
        <div style={statusDotStyle(isEthereumConnected)} />
        Ethereum
      </div>
      <div style={badgeStyle}>
        <div style={statusDotStyle(isSolanaConnected)} />
        Solana
      </div>
    </div>
  );
}