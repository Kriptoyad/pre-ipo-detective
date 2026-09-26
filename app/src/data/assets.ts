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
    onChainAddress: "6ujZxnphRxTqveaQtLAQHFoWz16xhLWZbTijcgZN4fRp",
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
          "The live activity score is calculated from recent confirmed Solana transactions.",
      },
    ],

    evidence: [
      {
        wallet: "6ujZ...N4fRp",
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
    status: "Demo Case",
    signal:
      "Illustrative anomaly scenario showing how large wallet activity could be investigated.",
    dataMode: "demo",

    metrics: {
      volumeMultiplier: 4.8,
      largeTransfer: true,
      walletConcentration: 62,
    },

    timeline: [
      {
        time: "Demo",
        title: "Large wallet transfer",
        detail:
          "Illustrative $420K transfer used to demonstrate the investigation workflow.",
      },
      {
        time: "Demo",
        title: "Volume anomaly",
        detail:
          "Simulated trading volume increased 4.8x above the scenario baseline.",
      },
      {
        time: "Demo",
        title: "Market movement",
        detail:
          "Illustrative market movement used to demonstrate signal correlation.",
      },
    ],

    evidence: [
      {
        wallet: "Demo wallet",
        tx: "Demo transaction",
        amount: "$420K",
        type: "Illustrative Transfer",
      },
      {
        wallet: "Demo wallet",
        tx: "Demo transaction",
        amount: "$186K",
        type: "Illustrative Accumulation",
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
    status: "Demo Case",
    signal:
      "Illustrative volume anomaly scenario used to demonstrate risk detection.",
    dataMode: "demo",

    metrics: {
      volumeMultiplier: 3.1,
      largeTransfer: true,
      walletConcentration: 38,
    },

    timeline: [
      {
        time: "Demo",
        title: "Volume spike",
        detail:
          "Simulated activity increased rapidly within the demonstration window.",
      },
      {
        time: "Demo",
        title: "Wallet concentration change",
        detail:
          "Illustrative wallet concentration change used by the demo risk model.",
      },
      {
        time: "Demo",
        title: "Investigation triggered",
        detail:
          "The scenario demonstrates how an asset could enter the investigation queue.",
      },
    ],

    evidence: [
      {
        wallet: "Demo wallet",
        tx: "Demo transaction",
        amount: "$242K",
        type: "Illustrative Volume Spike",
      },
      {
        wallet: "Demo wallet",
        tx: "Demo transaction",
        amount: "$118K",
        type: "Illustrative Concentration",
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
    status: "Demo Case",
    signal:
      "Illustrative normal-activity scenario used as a low-risk comparison.",
    dataMode: "demo",

    metrics: {
      volumeMultiplier: 1.2,
      largeTransfer: false,
      walletConcentration: 28,
    },

    timeline: [
      {
        time: "Demo",
        title: "Routine market activity",
        detail:
          "Simulated volume remains inside the expected scenario range.",
      },
      {
        time: "Demo",
        title: "Wallet scan",
        detail:
          "No simulated concentration or large-transfer anomaly is present.",
      },
      {
        time: "Demo",
        title: "Risk score unchanged",
        detail:
          "The demonstration scenario remains within normal parameters.",
      },
    ],

    evidence: [
      {
        wallet: "Demo wallet",
        tx: "Demo transaction",
        amount: "$48K",
        type: "Illustrative Transfer",
      },
      {
        wallet: "Demo wallet",
        tx: "Demo transaction",
        amount: "$36K",
        type: "Illustrative Activity",
      },
    ],
  },
};