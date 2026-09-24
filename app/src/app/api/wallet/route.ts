import { NextResponse } from "next/server";
import { address } from "@solana/kit";
import { solanaRpc } from "@/lib/solana";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const wallet =
      searchParams.get("address") ??
      "Vote111111111111111111111111111111111111111";

    const walletAddress = address(wallet);

    const signatures = await solanaRpc
      .getSignaturesForAddress(walletAddress, {
        limit: 5,
        commitment: "confirmed",
      })
      .send();

    return NextResponse.json({
      success: true,
      network: "Solana Mainnet",
      address: wallet,
      transactions: signatures.map((item) => ({
        signature: item.signature,
        slot: item.slot.toString(),
        blockTime:
          item.blockTime !== null
            ? item.blockTime.toString()
            : null,
        confirmationStatus: item.confirmationStatus,
        failed: item.err !== null,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}