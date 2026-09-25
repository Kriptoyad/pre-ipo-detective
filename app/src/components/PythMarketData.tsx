"use client";

import { useEffect, useState } from "react";

type PythResponse = {
  success: boolean;
  source: string;
  symbol: string;
  data?: {
    parsed?: {
      priceFeeds?: Array<{
        price: string;
        exponent: number;
        publisherCount: number;
        feedUpdateTimestamp: number;
      }>;
    };
  };
};

export default function PythMarketData() {
  const [price, setPrice] = useState<number | null>(null);
  const [publishers, setPublishers] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/pyth", {
          cache: "no-store",
        });

        const result: PythResponse = await response.json();

        const feed = result.data?.parsed?.priceFeeds?.[0];

        if (result.success && feed) {
          const value =
            Number(feed.price) * Math.pow(10, feed.exponent);

          setPrice(value);
          setPublishers(feed.publisherCount);
        }
      } catch (error) {
        console.error("Pyth error:", error);
      }
    }

    load();
  }, []);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">Pyth Market Data</p>

          <h2 className="mt-1 text-xl font-semibold text-white">
            BTC / USD
          </h2>
        </div>

        <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
          LIVE PYTH DATA
        </span>
      </div>

      <div className="mt-6">
        <p className="text-3xl font-bold text-white">
          {price !== null
            ? `$${price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            : "Loading..."}
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          {publishers !== null
            ? `${publishers} Pyth publishers`
            : "Fetching market data..."}
        </p>
      </div>

      <p className="mt-5 text-xs text-zinc-500">
        Live market context provided by Pyth Network.
      </p>
    </div>
  );
}