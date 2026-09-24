import { NextResponse } from "next/server";
import { solanaRpc } from "@/lib/solana";

export async function GET() {
  try {
    const slot = await solanaRpc
      .getSlot({ commitment: "confirmed" })
      .send();

    return NextResponse.json({
      success: true,
      network: "Solana Mainnet",
      slot: slot.toString(),
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