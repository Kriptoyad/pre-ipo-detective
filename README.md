 # Pre-IPO Detective

Pre-IPO Detective is an on-chain investigation dashboard for monitoring unusual activity around tokenized pre-IPO exposure.

The project combines live Solana data with a lightweight risk-detection engine to surface suspicious transaction activity, recent signals, and investigation context in a simple dashboard.

## Live Demo

https://pre-ipo-detective.vercel.app

## What it does

- Connects to Solana Mainnet
- Monitors live on-chain activity for VCXx
- Pulls recent confirmed transactions from the monitored Solana address
- Calculates an activity-risk score from recent transaction frequency
- Displays investigation signals, timelines, and evidence
- Includes demo investigation cases for SpaceX, OpenAI, and Stripe to demonstrate the broader investigation workflow

## Live On-chain Asset

**VCXx — Fundrise Innovation Fund xStock**

Pre-IPO Detective monitors the Solana asset address:

`Xs7UsqobM3EJgMeHwdAbmDBCZH1G5WTCjatpeYcCr8x`

The dashboard fetches confirmed Solana transactions for this address and calculates an on-chain activity score.

## Risk Detection

The current MVP evaluates signals such as:

- Transaction activity frequency
- Volume anomalies
- Large-transfer flags
- Wallet concentration

The live VCXx activity score is derived from real Solana transaction frequency.

The SpaceX, OpenAI, and Stripe investigation cases are demo scenarios used to demonstrate the full detective workflow and are not presented as live on-chain findings.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Solana Kit
- Solana Mainnet RPC
- Vercel

## Architecture

```text
Solana Mainnet
      |
      v
/api/wallet
      |
      v
Detection Engine
      |
      v
Activity Risk Score
      |
      v
Pre-IPO Detective Dashboard