 import Link from "next/link";
import { assets } from "@/data/assets";
import SolanaStatus from "@/components/SolanaStatus";
import WalletActivity from "@/components/WalletActivity";

export default function Home() {
  const assetList = Object.values(assets);

  const activeAlerts = assetList.filter((asset) => asset.risk >= 60).length;
  const highRiskCases = assetList.filter((asset) => asset.risk >= 80).length;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-sm font-medium text-green-400">
                ON-CHAIN INTELLIGENCE
              </p>

              <h1 className="text-5xl font-bold">
                Pre-IPO Detective
              </h1>

              <p className="mt-4 max-w-2xl text-gray-400">
                Detect suspicious activity in tokenized pre-IPO markets.
              </p>
            </div>

            <SolanaStatus />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">
              Assets Monitored
            </p>

            <p className="mt-2 text-3xl font-bold">
              {assetList.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">
              Active Alerts
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-400">
              {activeAlerts}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">
              High Risk Cases
            </p>

            <p className="mt-2 text-3xl font-bold text-red-400">
              {highRiskCases}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                Detective Watchlist
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Assets currently monitored for unusual activity
              </p>
            </div>

            <span className="rounded-full border border-green-900 bg-green-950 px-3 py-1 text-xs text-green-400">
              LIVE MONITORING
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
            {assetList.map((asset) => (
              <Link
                href={`/asset/${asset.symbol.toLowerCase()}`}
                key={asset.symbol}
                className="grid cursor-pointer gap-5 border-b border-gray-800 p-6 last:border-b-0 hover:bg-gray-900 md:grid-cols-5 md:items-center"
              >
                <div>
                  <p className="font-semibold">
                    {asset.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {asset.symbol}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Price
                  </p>

                  <p className="mt-1 font-medium">
                    {asset.price}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    24h Volume
                  </p>

                  <p className="mt-1 font-medium">
                    {asset.volume}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Latest Signal
                  </p>

                  <p className="mt-1 text-sm text-gray-300">
                    {asset.signal}
                  </p>
                </div>

                <div className="md:text-right">
                  <p className="text-xs text-gray-500">
                    Risk Score
                  </p>

                  <p
                    className={`mt-1 text-2xl font-bold ${
                      asset.risk >= 80
                        ? "text-red-400"
                        : asset.risk >= 60
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {asset.risk}
                  </p>

                  <p className="text-xs text-gray-500">
                    {asset.level} Risk
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <WalletActivity />
      </div>
    </main>
  );
}