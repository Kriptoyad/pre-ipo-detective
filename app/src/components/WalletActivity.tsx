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
  activityScore?: number;
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
        Loading VCXx on-chain activity...
      </div>
    );
  }

  if (!data.success || !data.transactions) {
    return (
      <div className="mt-12 rounded-2xl border border-red-900 bg-red-950 p-6 text-red-400">
        Unable to load VCXx on-chain activity.
      </div>
    );
  }

  const score = data.activityScore ?? 0;

  return (
    <section className="mt-12">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium text-green-400">
            REAL SOLANA DATA
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            VCXx On-chain Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recent confirmed transactions from the monitored Solana asset address
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-950 px-5 py-3">
          <p className="text-xs text-gray-500">
            Activity Risk
          </p>

          <p
            className={`mt-1 text-2xl font-bold ${
              score >= 20
                ? "text-red-400"
                : score >= 10
                  ? "text-yellow-400"
                  : "text-green-400"
            }`}
          >
            {score} / 30
          </p>
        </div>
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
                Confirmation
              </p>

              <p className="mt-1 text-sm text-green-400">
                {tx.confirmationStatus ?? "confirmed"}
              </p>
            </div>

            <div className="md:text-right">
              <p className="text-xs text-gray-500">
                Result
              </p>

              <p
                className={`mt-1 text-sm ${
                  tx.failed ? "text-red-400" : "text-green-400"
                }`}
              >
                {tx.failed ? "Failed" : "Success"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-1 text-xs text-gray-600 md:flex-row md:items-center md:justify-between">
        <p>
          Activity score is calculated from recent transaction frequency.
        </p>

        <p className="font-mono">
          {data.address}
        </p>
      </div>
    </section>
  );
}
