 import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.PYTH_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "PYTH_API_KEY missing" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://pyth-lazer.dourolabs.app/v1/latest_price",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceFeedIds: [1],
          properties: [
            "price",
            "exponent",
            "publisherCount",
            "feedUpdateTimestamp",
          ],
          formats: [],
          channel: "fixed_rate@1000ms",
        }),
        cache: "no-store",
      }
    );

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        status: response.status,
        error: text,
      });
    }

    return NextResponse.json({
      success: true,
      source: "Pyth Network",
      symbol: "Crypto.BTC/USD",
      data: JSON.parse(text),
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