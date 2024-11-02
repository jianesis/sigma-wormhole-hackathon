'use client'

import { AnchorProvider } from '@coral-xyz/anchor'
import { WalletError } from '@solana/wallet-adapter-base'
import {
  AnchorWallet,
  useConnection,
  useWallet,
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { ReactNode, useCallback, useMemo } from 'react'
import { useCluster } from '../cluster/cluster-data-access'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

require('@solana/wallet-adapter-react-ui/styles.css')
require('./../../wallet-button.css')

export const WalletButton = () => {
  const { publicKey } = useWallet();

  return (
    <WalletMultiButton>
      {publicKey ? publicKey.toString().slice(0, 4) + '..' + publicKey.toString().slice(-4) : 'Connect Solana'}
    </WalletMultiButton>
  );
};

export function SolanaProvider({ children }: { children: ReactNode }) {
  const { cluster } = useCluster()
  const endpoint = useMemo(() => cluster.endpoint, [cluster])
  const onError = useCallback((error: WalletError) => {
    console.error(error)
  }, [])

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      // Add other wallet adapters as needed
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export function useAnchorProvider() {
  const { connection } = useConnection()
  const wallet = useWallet()

  return new AnchorProvider(connection, wallet as AnchorWallet, { commitment: 'confirmed' })
}
