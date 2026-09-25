 "use client";

import { useEffect, useState } from "react";

type WalletResponse = {
  success: boolean;
  activityScore: number;
  activitySignal: string;
};

export default function VcxxRiskScore() {
  const [score, setScore] = useState<number | null>(null);
  const [signal, setSignal] = useState<string>("");

  useEffect(() => {
    async function loadScore() {
      try {
        const response = await fetch("/api/wallet", {
          cache: "no-store",
        });

        const data: WalletResponse = await response.json();

        if (data.success && typeof data.activityScore === "number") {
          setScore(data.activityScore);
          setSignal(
            data.activitySignal ||
              "No unusual transaction frequency detected"
          );
        } else {
          setScore(0);
          setSignal("Unable to analyze activity");
        }
      } catch {
        setScore(0);
        setSignal("Unable to analyze activity");
      }
    }

    loadScore();
  }, []);

  if (score === null) {
    return (
      <div>
        <p className="text-xs text-gray-500">Analyzing activity...</p>
      </div>
    );
  }

  const colorClass =
    score >= 20
      ? "text-red-400"
      : score >= 10
        ? "text-yellow-400"
        : "text-green-400";

  const borderClass =
    score >= 20
      ? "border-red-500/30"
      : score >= 10
        ? "border-yellow-500/30"
        : "border-green-500/30";

  const level =
    score >= 20
      ? "High"
      : score >= 10
        ? "Medium"
        : "Low";

  return (
    <div className={`rounded-xl border ${borderClass} bg-zinc-950 p-4`}>
      <p className="text-[10px] uppercase tracking-wider text-zinc-500">
        Activity Risk
      </p>

      <div className="mt-1 flex items-end gap-2">
        <p className={`text-2xl font-bold ${colorClass}`}>
          {score} / 30
        </p>

        <p className={`mb-1 text-xs font-medium ${colorClass}`}>
          {level} Risk
        </p>
      </div>

      <div className="mt-3 border-t border-zinc-800 pt-3">
        <p className="text-[10px] uppercase tracking-wider text-zinc-600">
          Detection Signal
        </p>

        <p className="mt-1 text-xs text-zinc-300">
          {signal}
        </p>
      </div>
    </div>
  );
}