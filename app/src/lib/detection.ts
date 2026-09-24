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
  if (score >= 80) {
    return "High";
  }

  if (score >= 60) {
    return "Medium";
  }

  return "Low";
}