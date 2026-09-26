 import Link from "next/link";
import { assets } from "@/data/assets";
import SolanaStatus from "@/components/SolanaStatus";
import WalletActivity from "@/components/WalletActivity";
import VcxxRiskScore from "@/components/VcxxRiskScore";
import PythMarketData from "@/components/PythMarketData";

export default function Home() {
  const assetList = Object.values(assets);

  const liveAssets = assetList.filter(
    (asset) => asset.dataMode === "live"
  );

  const demoAssets = assetList.filter(
    (asset) => asset.dataMode === "demo"
  );

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
            <p className="text-sm text-zinc-500">
              Live Assets Monitored
            </p>

            <p className="mt-2 text-3xl font-bold">
              {liveAssets.length}
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              Connected to Solana Mainnet
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm text-zinc-500">
              Demo Investigation Cases
            </p>

            <p className="mt-2 text-3xl font-bold">
              {demoAssets.length}
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              Illustrative scenarios, not live alerts
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm text-zinc-500">
              Live Detection
            </p>

            <p className="mt-2 text-lg font-bold text-green-400">
              Active
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              Transaction frequency monitoring
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="border-b border-zinc-800 p-6">
            <h2 className="text-xl font-semibold">
              Investigation Watchlist
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Live Solana monitoring and clearly labeled
              demonstration scenarios
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
                    <div className="mb-2">
                      {asset.dataMode === "live" ? (
                        <span className="inline-flex rounded-full border border-green-800 bg-green-950 px-2 py-1 text-[10px] font-semibold tracking-wide text-green-400">
                          LIVE ON-CHAIN
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full border border-yellow-800 bg-yellow-950 px-2 py-1 text-[10px] font-semibold tracking-wide text-yellow-400">
                          DEMO CASE
                        </span>
                      )}
                    </div>

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

                    {asset.dataMode === "demo" && (
                      <p className="mt-1 text-xs text-yellow-600">
                        Illustrative
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs uppercase text-zinc-600">
                      24h Volume
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {asset.volume}
                    </p>

                    {asset.dataMode === "demo" && (
                      <p className="mt-1 text-xs text-yellow-600">
                        Illustrative
                      </p>
                    )}
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
                      {asset.dataMode === "demo"
                        ? "Demo Risk Score"
                        : "Activity Risk"}
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

                          <p className="mt-2 text-xs text-zinc-500">
                            Calculated from demo inputs
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t border-zinc-800 bg-zinc-900/30 px-6 py-4">
            <p className="text-xs leading-relaxed text-zinc-500">
              Data transparency: VCXX activity monitoring uses
              confirmed Solana Mainnet transactions. SpaceX,
              OpenAI and Stripe are illustrative scenarios with
              simulated prices, volumes and risk inputs.
              Demo values are not live market observations.
            </p>
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