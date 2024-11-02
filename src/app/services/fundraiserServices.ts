import { Program, BN, Provider } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { Idl } from "@coral-xyz/anchor";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountIdempotent,
} from "@solana/spl-token";
import idl from "../../target/idl/funraiser.json";

const connection = new Connection("https://api.devnet.solana.com", {
  commitment: "confirmed",
});

const WSOL_ADDRESS = new PublicKey(
  "So11111111111111111111111111111111111111112"
);
const mintAddress = WSOL_ADDRESS;

export async function initializeFundraiser({
  userWallet,
  amount = 1_000_000,
  startTime = 0,
  provider,
}: {
  userWallet: any;
  amount?: number; // Amount to raise (in smallest units)
  startTime?: number; // Start time (unix timestamp)
  provider: Provider;
}) {
  try {
    const program = new Program(idl as Idl, provider);

    const [fundraiserAddress, bump] = await PublicKey.findProgramAddress(
      [Buffer.from("fundraiser"), userWallet.publicKey.toBuffer()],
      new PublicKey(idl.address)
    );

    // Get the associated token account (vault) for the fundraiser
    const vault = await getAssociatedTokenAddress(
      mintAddress, // mint
      fundraiserAddress, // owner
      true // allow owner off curve
    );
    // Create the transaction
    const tx = program.methods.initialize(new BN(amount), startTime).accounts({
      maker: userWallet.publicKey,
      fundraiser: fundraiserAddress,
      mintToRaise: mintAddress,
      vault: vault,
      systemProgram: PublicKey.default,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    });

    if ("secretKey" in userWallet) {
      tx.signers([userWallet]);
    }

    // Send and confirm transaction
    const signature = await tx.rpc();

    // Wait for confirmation
    const confirmation = await connection.confirmTransaction(signature);

    console.log(confirmation);

    return {
      success: true,
      signature,
      vault: vault.toString(),
    };
  } catch (error) {
    console.error("Error initializing fundraiser:", error);
    // throw error;
  }
}

export async function contributeToFundraiser({
  userWallet,
  provider,
}: {
  userWallet: any;
  provider: Provider;
}) {
  try {
    const program = new Program(idl as Idl, provider);
    const [fundraiserAddress, bump] = await PublicKey.findProgramAddress(
      [Buffer.from("fundraiser"), userWallet.publicKey.toBuffer()],
      new PublicKey(idl.address)
    );
    const vault = await getAssociatedTokenAddress(
      mintAddress, // mint
      fundraiserAddress, // owner
      true // allow owner off curve
    );
    const [contributor] = await PublicKey.findProgramAddress(
      [Buffer.from("contributor"), userWallet.publicKey.toBuffer()],
      new PublicKey(idl.address)
    );

    console.log(userWallet.publicKey.toString());
    const contributorATA = await createAssociatedTokenAccountIdempotent(
      connection,
      userWallet.publicKey,
      new PublicKey(mintAddress), // The token's mint address
      userWallet.publicKey,
      { commitment: "finalized" }
    );

    const tx = await program.methods.contribute(new BN(1_000_000)).accounts({
      contributor: userWallet.publicKey,
      fundraiser: fundraiserAddress,
      contributorAccount: contributor,
      contributorAta: contributorATA,
      vault,
      tokenProgram: TOKEN_PROGRAM_ID,
    });

    if ("secretKey" in userWallet) {
      tx.signers([userWallet]);
    }

    // Send and confirm transaction
    const signature = await tx.rpc();

    // Wait for confirmation
    const confirmation = await connection.confirmTransaction(signature);

    console.log(confirmation);

    return {
      success: true,
      signature,
      vault: vault.toString(),
    };
  } catch (error) {
    console.error("Error contributing to fundraiser:", error);
    // throw error;
  }
}
