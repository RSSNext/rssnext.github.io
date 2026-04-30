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
          <h1 className="claim-title">Access VSL Assets</h1>
          <p className="claim-subtitle">
            VSL users can access their migrated assets here. $POWER is
            automatically migrated to $RSS3. For Folo wallets, migration is
            completed automatically; transfers, withdrawals, and other wallet
            actions should continue through Folo Wallet.
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
            Claim
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
