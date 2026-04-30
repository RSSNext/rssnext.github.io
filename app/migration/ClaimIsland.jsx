"use client";

import dynamic from "next/dynamic";

const ClaimRuntime = dynamic(() => import("./ClaimRuntime"), {
  ssr: false,
  loading: () => <ClaimFallback />,
});

function ClaimFallback() {
  return (
    <main className="wrap claim-main" id="main">
      <section className="claim-card" data-claim-state="disabled">
        <header className="claim-card__header">
          <h1 className="claim-title">Migrate RSS3</h1>
          <p className="claim-subtitle">
            Connect your wallet to check migration eligibility, then migrate.
          </p>
        </header>

        <div className="claim-grid claim-grid--compact">
          <div className="claim-row claim-row--stack">
            <div className="claim-label">Wallet</div>
            <div className="claim-value claim-wallet">
              <code>Not connected</code>
              <button className="button" type="button" disabled>
                Connect
              </button>
            </div>
          </div>

          <div className="claim-row claim-row--stack">
            <div className="claim-label">Migration amount</div>
            <div className="claim-value">
              <div className="claim-amount">
                <div className="claim-amount__primary">
                  <span>0</span>
                </div>
                <div className="claim-amount__secondary">
                  <span className="muted">0 (raw)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="claim-actions">
          <button className="button button--primary" type="button" disabled>
            Migrate
          </button>
          <div className="claim-hint">Loading wallet interface...</div>
        </div>
      </section>
    </main>
  );
}

export default function ClaimIsland() {
  return <ClaimRuntime />;
}
