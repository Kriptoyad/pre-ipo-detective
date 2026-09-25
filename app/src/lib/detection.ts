 export type DetectionInput = {
  volumeMultiplier: number;
  largeTransfer: boolean;
  walletConcentration: number;
};

export function calculateRiskScore(input: DetectionInput) {
  let score = 0;

  if (input.volumeMultiplier >= 4) {
    score += 40;
  } else if (input.volumeMultiplier >= 2) {
    score += 25;
  } else if (input.volumeMultiplier >= 1.5) {
    score += 10;
  }

  if (input.largeTransfer) {
    score += 30;
  }

  if (input.walletConcentration >= 70) {
    score += 30;
  } else if (input.walletConcentration >= 50) {
    score += 20;
  } else if (input.walletConcentration >= 30) {
    score += 10;
  }

  return Math.min(score, 100);
}

export function getRiskLevel(score: number) {
  if (score >= 80) return "High";
  if (score >= 60) return "Medium";
  return "Low";
}

export function calculateOnChainActivityScore(
  transactionCount: number,
  newestBlockTime: number | null,
  oldestBlockTime: number | null
) {
  if (
    transactionCount < 2 ||
    newestBlockTime === null ||
    oldestBlockTime === null
  ) {
    return 0;
  }

  const windowSeconds = Math.max(newestBlockTime - oldestBlockTime, 1);
  const transactionsPerHour =
    transactionCount / (windowSeconds / 3600);

  if (transactionsPerHour >= 20) return 30;
  if (transactionsPerHour >= 10) return 20;
  if (transactionsPerHour >= 5) return 10;

  return 0;
}
export type RiskSignal = {
  label: string;
  points: number;
  severity: "Low" | "Medium" | "High";
};

export function getRiskSignals(input: DetectionInput): RiskSignal[] {
  const signals: RiskSignal[] = [];

  if (input.volumeMultiplier >= 4) {
    signals.push({
      label: "Extreme transaction volume spike",
      points: 40,
      severity: "High",
    });
  } else if (input.volumeMultiplier >= 2) {
    signals.push({
      label: "Elevated transaction volume",
      points: 25,
      severity: "Medium",
    });
  } else if (input.volumeMultiplier >= 1.5) {
    signals.push({
      label: "Moderate transaction volume increase",
      points: 10,
      severity: "Low",
    });
  }

  if (input.largeTransfer) {
    signals.push({
      label: "Large transfer detected",
      points: 30,
      severity: "High",
    });
  }

  if (input.walletConcentration >= 70) {
    signals.push({
      label: "Very high wallet concentration",
      points: 30,
      severity: "High",
    });
  } else if (input.walletConcentration >= 50) {
    signals.push({
      label: "High wallet concentration",
      points: 20,
      severity: "Medium",
    });
  } else if (input.walletConcentration >= 30) {
    signals.push({
      label: "Elevated wallet concentration",
      points: 10,
      severity: "Low",
    });
  }

  return signals;
}