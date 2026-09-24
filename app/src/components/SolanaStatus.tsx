"use client";

import { useEffect, useState } from "react";

type SolanaStatusData = {
  success: boolean;
  network?: string;
  slot?: string;
};

export default function SolanaStatus() {
  const [data, setData] = useState<SolanaStatusData | null>(null);

  useEffect(() => {
    async function loadStatus() {
      try {
        const response = await fetch("/api/solana");
        const result = await response.json();

        setData(result);
      } catch {
        setData({ success: false });
      }
    }

    loadStatus();
  }, []);

  if (!data) {
    return (
      <div className="rounded-full border border-gray-800 px-4 py-2 text-xs text-gray-500">
        Connecting to Solana...
      </div>
    );
  }

  if (!data.success) {
    return (
      <div className="rounded-full border border-red-900 bg-red-950 px-4 py-2 text-xs text-red-400">
        Solana Offline
      </div>
    );
  }

  return (
    <div className="rounded-full border border-green-900 bg-green-950 px-4 py-2 text-xs text-green-400">
      ● {data.network} · Slot {data.slot}
    </div>
  );
}