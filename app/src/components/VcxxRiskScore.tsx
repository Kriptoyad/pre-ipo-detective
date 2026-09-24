"use client";

import { useEffect, useState } from "react";

type WalletResponse = {
  success: boolean;
  activityScore?: number;
};

export default function VcxxRiskScore() {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    async function loadScore() {
      try {
        const response = await fetch("/api/wallet", {
          cache: "no-store",
        });

        const data: WalletResponse = await response.json();

        if (data.success && typeof data.activityScore === "number") {
          setScore(data.activityScore);
        } else {
          setScore(0);
        }
      } catch {
        setScore(0);
      }
    }

    loadScore();
  }, []);

  if (score === null) {
    return (
      <p className="mt-1 text-2xl font-bold text-gray-500">
        ...
      </p>
    );
  }

  const colorClass =
    score >= 20
      ? "text-red-400"
      : score >= 10
        ? "text-yellow-400"
        : "text-green-400";

  const level =
    score >= 20
      ? "High"
      : score >= 10
        ? "Medium"
        : "Low";

  return (
    <>
      <p className={`mt-1 text-2xl font-bold ${colorClass}`}>
        {score}
      </p>

      <p className="text-xs text-gray-500">
        {level} Risk
      </p>
    </>
  );
}
