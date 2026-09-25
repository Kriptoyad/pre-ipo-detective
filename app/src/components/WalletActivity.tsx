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
  transactionCount?: number;
  transactions?: WalletTransaction[];
};

export default function WalletActivity() {
  const [data, setData] = useState<WalletResponse | null>(null);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response = await fetch("/api/wallet", {
          cache: "no-store",
        });

        const result: WalletResponse = await response.json();
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

  const score = data.activityScore ?? 0;

  const riskLevel =
    score >= 20
      ? "High"
      : score >= 10
        ? "Medium"
        : "Low";

  const riskColor =
    score >= 20
      ? "text-red-400"
      : score >= 10
        ? "text-yellow-400"
        : "text-green-400";

  const activitySignal =
    score >= 30
      ? "Unusually high transaction frequency detected"
      : score >= 20
        ? "Elevated transaction frequency detected"
        : score >= 10
          ? "Moderate transaction activity detected"
          : "No unusual transaction frequency detected";

  return (
    <section className="mt-12">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium text-green-400">
            REAL SOLANA MAINNET DATA
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Solana Activity Monitor
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recent confirmed transactions from a monitored Solana account.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-950 px-5 py-3">
          <p className="text-xs text-gray-500">
            Activity Risk
          </p>

          <div className="mt-1 flex items-end gap-2">
            <p className={`text-2xl font-bold ${riskColor}`}>
              {score} / 30
            </p>

            <p className={`mb-1 text-xs font-medium ${riskColor}`}>
              {riskLevel} Risk
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-xl border border-gray-800 bg-gray-950 px-5 py-4">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          Detection Signal
        </p>

        <p className={`mt-1 text-sm font-medium ${riskColor}`}>
          {activitySignal}
        </p>

        <p className="mt-2 text-xs text-gray-600">
          Based on the frequency of the most recent confirmed transactions.
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
                  tx.failed
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {tx.failed ? "Failed" : "Success"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-2 text-xs text-gray-600 md:flex-row md:items-center md:justify-between">
        <p>
          {data.transactionCount ?? data.transactions.length} recent
          transactions analyzed on {data.network ?? "Solana Mainnet"}.
        </p>

        <p className="break-all font-mono md:text-right">
          {data.address}
        </p>
      </div>
    </section>
  );
}