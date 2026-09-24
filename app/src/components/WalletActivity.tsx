"use client";

import { useEffect, useState } from "react";

type WalletTransaction = {
  signature: string;
  slot: string;
  blockTime: string | null;
  confirmationStatus: string | null;
  failed: boolean;
};

type WalletResponse = {
  success: boolean;
  network?: string;
  address?: string;
  transactions?: WalletTransaction[];
};

export default function WalletActivity() {
  const [data, setData] = useState<WalletResponse | null>(null);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response = await fetch("/api/wallet");
        const result = await response.json();

        setData(result);
      } catch {
        setData({ success: false });
      }
    }

    loadTransactions();
  }, []);

  if (!data) {
    return (
      <div className="mt-12 rounded-2xl border border-gray-800 bg-gray-950 p-6 text-gray-500">
        Loading Solana activity...
      </div>
    );
  }

  if (!data.success || !data.transactions) {
    return (
      <div className="mt-12 rounded-2xl border border-red-900 bg-red-950 p-6 text-red-400">
        Unable to load Solana activity.
      </div>
    );
  }

  return (
    <section className="mt-12">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">
          Live Solana Activity
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Recent confirmed transactions from a public Solana test address
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
        {data.transactions.map((tx) => (
          <div
            key={tx.signature}
            className="grid gap-5 border-b border-gray-800 p-6 last:border-b-0 md:grid-cols-4 md:items-center"
          >
            <div>
              <p className="text-xs text-gray-500">
                Signature
              </p>

              <p className="mt-1 font-mono text-sm">
                {tx.signature.slice(0, 8)}...
                {tx.signature.slice(-8)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Slot
              </p>

              <p className="mt-1 text-sm">
                {tx.slot}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Status
              </p>

              <p
                className={`mt-1 text-sm ${
                  tx.failed ? "text-red-400" : "text-green-400"
                }`}
              >
                {tx.failed ? "Failed" : "Confirmed"}
              </p>
            </div>

            <div className="md:text-right">
              <p className="text-xs text-gray-500">
                Network
              </p>

              <p className="mt-1 text-sm">
                Solana Mainnet
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-gray-600">
        Demo feed only. These transactions are not attributed to any pre-IPO asset.
      </p>
    </section>
  );
}