 import { calculateRiskScore, getRiskLevel } from "@/lib/detection";

const spacexRisk = calculateRiskScore({
  volumeMultiplier: 4.8,
  largeTransfer: true,
  walletConcentration: 62,
});

const openaiRisk = calculateRiskScore({
  volumeMultiplier: 3.1,
  largeTransfer: true,
  walletConcentration: 38,
});

const stripeRisk = calculateRiskScore({
  volumeMultiplier: 1.2,
  largeTransfer: false,
  walletConcentration: 28,
});

const vcxxRisk = calculateRiskScore({
  volumeMultiplier: 1,
  largeTransfer: false,
  walletConcentration: 0,
});

export const assets = {
  vcxx: {
    name: "Fundrise Innovation Fund xStock",
    symbol: "VCXX",
    price: "Live",
    risk: vcxxRisk,
    level: getRiskLevel(vcxxRisk),
    volume: "On-chain",
    status: "Live Monitoring",
    signal:
      "Monitoring confirmed Solana activity for unusual transaction frequency.",

    onChainAddress:
      "6ujZxnphRxTqveaQtLAQHFoWz16xhLWZbTijcgZN4fRp",

    dataMode: "live",

    metrics: {
      volumeMultiplier: 1,
      largeTransfer: false,
      walletConcentration: 0,
    },

    timeline: [
      {
        time: "Live",
        title: "Solana monitoring active",
        detail:
          "Confirmed transactions are being monitored directly from Solana Mainnet.",
      },
      {
        time: "Live",
        title: "Activity frequency analysis",
        detail:
          "Recent transaction frequency is evaluated for abnormal activity.",
      },
      {
        time: "Live",
        title: "Risk signal",
        detail:
          "The live activity score is calculated separately from the demo case metrics.",
      },
    ],

    evidence: [
      {
        wallet: "6ujZ...4fRp",
        tx: "Live feed",
        amount: "On-chain",
        type: "Solana Activity",
      },
    ],
  },

  spacex: {
    name: "SpaceX",
    symbol: "SPACEX",
    price: "$214.80",
    risk: spacexRisk,
    level: getRiskLevel(spacexRisk),
    volume: "$1.24M",
    status: "Under Investigation",
    signal:
      "Large wallet activity detected before unusual market movement.",

    metrics: {
      volumeMultiplier: 4.8,
      largeTransfer: true,
      walletConcentration: 62,
    },

    timeline: [
      {
        time: "09:42",
        title: "Large wallet transfer",
        detail: "$420K equivalent moved into a monitored wallet.",
      },
      {
        time: "10:18",
        title: "Volume anomaly detected",
        detail: "Trading volume increased 4.8x above recent average.",
      },
      {
        time: "11:03",
        title: "Price movement detected",
        detail: "Asset price moved sharply after wallet activity.",
      },
    ],

    evidence: [
      {
        wallet: "7QxP...4mN2",
        tx: "5Hd9...Kp31",
        amount: "$420K",
        type: "Large Transfer",
      },
      {
        wallet: "9LmR...2Qa8",
        tx: "8Js4...Vr72",
        amount: "$186K",
        type: "Wallet Accumulation",
      },
    ],
  },

  openai: {
    name: "OpenAI",
    symbol: "OPENAI",
    price: "$382.40",
    risk: openaiRisk,
    level: getRiskLevel(openaiRisk),
    volume: "$842K",
    status: "Monitoring",
    signal:
      "Unusual volume spike detected across recent transactions.",

    metrics: {
      volumeMultiplier: 3.1,
      largeTransfer: true,
      walletConcentration: 38,
    },

    timeline: [
      {
        time: "08:15",
        title: "Volume spike",
        detail:
          "Trading activity increased rapidly within a short window.",
      },
      {
        time: "09:05",
        title: "Wallet concentration change",
        detail:
          "A small group of wallets accumulated a larger position.",
      },
      {
        time: "10:21",
        title: "Monitoring activated",
        detail:
          "The asset was added to the investigation queue.",
      },
    ],

    evidence: [
      {
        wallet: "3FaK...91Xe",
        tx: "2Pn7...Lm44",
        amount: "$242K",
        type: "Volume Spike",
      },
      {
        wallet: "6RtB...8Nz3",
        tx: "7Yu2...Qe19",
        amount: "$118K",
        type: "Wallet Concentration",
      },
    ],
  },

  stripe: {
    name: "Stripe",
    symbol: "STRIPE",
    price: "$167.25",
    risk: stripeRisk,
    level: getRiskLevel(stripeRisk),
    volume: "$396K",
    status: "Normal",
    signal:
      "No major suspicious activity detected.",

    metrics: {
      volumeMultiplier: 1.2,
      largeTransfer: false,
      walletConcentration: 28,
    },

    timeline: [
      {
        time: "07:30",
        title: "Routine market activity",
        detail:
          "Volume remained inside the expected range.",
      },
      {
        time: "09:40",
        title: "Wallet scan completed",
        detail:
          "No unusual concentration or large transfer detected.",
      },
      {
        time: "11:10",
        title: "Risk score unchanged",
        detail:
          "Current activity remains within normal parameters.",
      },
    ],

    evidence: [
      {
        wallet: "4DeN...7Lp2",
        tx: "1As8...Jk55",
        amount: "$48K",
        type: "Normal Transfer",
      },
      {
        wallet: "8QwM...3Ty9",
        tx: "6Gh3...Bc12",
        amount: "$36K",
        type: "Normal Activity",
      },
    ],
  },
};