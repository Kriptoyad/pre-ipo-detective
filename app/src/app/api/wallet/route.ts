 import { NextResponse } from "next/server";
import { address } from "@solana/kit";
import { solanaRpc } from "@/lib/solana";
import { calculateOnChainActivityScore } from "@/lib/detection";

const DEFAULT_ASSET_ADDRESS =
  "Xs7UsqobM3EJgMeHwdAbmDBCZH1G5WTCjatpeYcCr8x";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const wallet =
      searchParams.get("address") ?? DEFAULT_ASSET_ADDRESS;

    const walletAddress = address(wallet);

    const signatures = await solanaRpc
      .getSignaturesForAddress(walletAddress, {
        limit: 5,
        commitment: "confirmed",
      })
      .send();

    const blockTimes = signatures
      .map((item) =>
        item.blockTime !== null ? Number(item.blockTime) : null
      )
      .filter((value): value is number => value !== null);

    const newestBlockTime =
      blockTimes.length > 0 ? blockTimes[0] : null;

    const oldestBlockTime =
      blockTimes.length > 0
        ? blockTimes[blockTimes.length - 1]
        : null;

    const activityScore = calculateOnChainActivityScore(
      signatures.length,
      newestBlockTime,
      oldestBlockTime
    );

    return NextResponse.json({
      success: true,
      network: "Solana Mainnet",
      address: wallet,
      activityScore,
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
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}
