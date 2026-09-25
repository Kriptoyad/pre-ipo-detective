 import Link from "next/link";
import { assets } from "@/data/assets";
import SolanaStatus from "@/components/SolanaStatus";
import WalletActivity from "@/components/WalletActivity";
import VcxxRiskScore from "@/components/VcxxRiskScore";
import PythMarketData from "@/components/PythMarketData";

export default function Home() {
  const assetList = Object.values(assets);

  const activeAlerts = assetList.filter(
    (asset) => asset.risk >= 60
  ).length;

  const highRiskCases = assetList.filter(
    (asset) => asset.risk >= 80
  ).length;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-zinc-500">
              ON-CHAIN INVESTIGATION DASHBOARD
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              Pre-IPO Detective
            </h1>

            <p className="mt-3 max-w-2xl text-zinc-400">
              Monitor unusual on-chain activity around tokenized
              pre-IPO exposure using live Solana data and transparent
              risk scoring.
            </p>
          </div>

          <SolanaStatus />
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm text-zinc-500">Assets Monitored</p>

            <p className="mt-2 text-3xl font-bold">
              {assetList.length}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm text-zinc-500">Active Alerts</p>

            <p className="mt-2 text-3xl font-bold">
              {activeAlerts}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm text-zinc-500">
              High Risk Cases
            </p>

            <p className="mt-2 text-3xl font-bold">
              {highRiskCases}
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="border-b border-zinc-800 p-6">
            <h2 className="text-xl font-semibold">
              Investigation Watchlist
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Live and demo investigation cases
            </p>
          </div>

          <div className="divide-y divide-zinc-800">
            {assetList.map((asset) => (
              <Link
                key={asset.symbol}
                href={`/asset/${asset.symbol.toLowerCase()}`}
                className="block p-6 transition hover:bg-zinc-900/70"
              >
                <div className="grid gap-5 md:grid-cols-5 md:items-center">
                  <div>
                    <p className="font-semibold">
                      {asset.name}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      {asset.symbol}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-zinc-600">
                      Price
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {asset.price}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-zinc-600">
                      24h Volume
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {asset.volume}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-zinc-600">
                      Latest Signal
                    </p>

                    <p className="mt-1 text-sm text-zinc-300">
                      {asset.signal}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-zinc-600">
                      Risk Score
                    </p>

                    <div className="mt-1">
                      {asset.symbol === "VCXX" ? (
                        <VcxxRiskScore />
                      ) : (
                        <div>
                          <span className="text-lg font-bold">
                            {asset.risk}
                          </span>

                          <span
                            className={`ml-2 text-sm font-medium ${
                              asset.level === "High"
                                ? "text-red-400"
                                : asset.level === "Medium"
                                ? "text-yellow-400"
                                : "text-green-400"
                            }`}
                          >
                            {asset.level} Risk
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <PythMarketData />
        </section>

        <section>
          <WalletActivity />
        </section>

        <footer className="mt-10 border-t border-zinc-900 pt-6 text-center text-xs text-zinc-600">
          Pre-IPO Detective • Solana Mainnet • Pyth Network
        </footer>
      </div>
    </main>
  );
}