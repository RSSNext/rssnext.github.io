const DEFAULT_CONTRACT = "0x0000000000000000000000000000000000000000";

// Precomputed selectors:
// - claim(uint256,bytes32[]) => 0x2f52ebb7
// - claimed(address)         => 0xc884ef83
const SELECTOR = {
  claim: "2f52ebb7",
  claimed: "c884ef83",
};

const els = {
  claimCard: document.getElementById("claimCard"),
  walletAddress: document.getElementById("walletAddress"),
  connect: document.getElementById("connect"),
  claimableHuman: document.getElementById("claimableHuman"),
  claimableRaw: document.getElementById("claimableRaw"),
  claim: document.getElementById("claim"),
  claimBtnLabel: document.getElementById("claimBtnLabel"),
  claimSpinner: document.getElementById("claimSpinner"),
  hint: document.getElementById("hint"),
  walletModal: document.getElementById("walletModal"),
  walletList: document.getElementById("walletList"),
};

let state = {
  contract: DEFAULT_CONTRACT,
  merkleUrl: "/assets/final_airdrop_merkle.json",
  requiredChainId: null, // e.g. "0x1"
  account: null,
  chainId: null,
  merkle: null,
  entry: null,
  isClaiming: false,
  provider: null,
  allowedWalletRdns: [],
  blockedWalletRdns: [],
};

let hasPromptedNetworkSwitch = false;

// EIP-6963 provider discovery (supports MetaMask + Brave + others).
const discoveredProviders = new Map(); // uuid -> { info, provider }

function normAddr(a) {
  return (a || "").trim().toLowerCase();
}

function shortenAddr(a) {
  const s = normAddr(a);
  if (!/^0x[0-9a-f]{40}$/.test(s)) return s || "";
  return `${s.slice(0, 6)}…${s.slice(-4)}`;
}

function setHint(html) {
  if (!els.hint) return;
  els.hint.innerHTML = html || "";
}

function setClaimable(rawWei) {
  const raw = rawWei ? String(rawWei) : "0";
  els.claimableRaw.textContent = raw;
  els.claimableHuman.textContent = rawWei ? formatUnits(rawWei, 18, 6) : "0";
}

function setClaimButton({ enabled, label, spinning }) {
  els.claim.disabled = !enabled;
  els.claimBtnLabel.textContent = label;
  if (spinning) els.claimSpinner.classList.add("is-on");
  else els.claimSpinner.classList.remove("is-on");
}

function setClaimState(stateName) {
  if (els.claimCard) els.claimCard.dataset.claimState = stateName;
}

function formatUnits(valueWei, decimals = 18, maxFraction = 6) {
  const n = BigInt(valueWei);
  const base = 10n ** BigInt(decimals);
  const whole = n / base;
  const frac = n % base;

  let fracStr = frac.toString().padStart(decimals, "0");
  fracStr = fracStr.slice(0, Math.min(maxFraction, fracStr.length)).replace(/0+$/, "");
  return fracStr ? `${whole.toString()}.${fracStr}` : whole.toString();
}

function pad32(hexNo0x) {
  return hexNo0x.padStart(64, "0");
}

function encodeUint256(value) {
  const n = BigInt(value);
  if (n < 0n) throw new Error("uint256 cannot be negative");
  return pad32(n.toString(16));
}

function encodeBytes32(hex) {
  const h = String(hex).toLowerCase();
  if (!/^0x[0-9a-f]{64}$/.test(h)) throw new Error(`Invalid bytes32: ${hex}`);
  return h.slice(2);
}

function encodeAddress(addr) {
  const a = normAddr(addr);
  if (!/^0x[0-9a-f]{40}$/.test(a)) throw new Error(`Invalid address: ${addr}`);
  return pad32(a.slice(2));
}

function encodeClaimCalldata(amountWei, proof) {
  const selector = "0x" + SELECTOR.claim;
  const headAmount = encodeUint256(amountWei);
  const headOffset = encodeUint256(64); // 0x40: start of proof tail
  const tailLen = encodeUint256(proof.length);
  const tailElems = proof.map(encodeBytes32).join("");
  return selector + headAmount + headOffset + tailLen + tailElems;
}

function encodeClaimedCalldata(addr) {
  const selector = "0x" + SELECTOR.claimed;
  return selector + encodeAddress(addr);
}

async function ethCall(to, data) {
  return await state.provider.request({
    method: "eth_call",
    params: [{ to, data }, "latest"],
  });
}

async function switchToRequiredNetwork() {
  if (!state.requiredChainId) throw new Error("requiredChainId not set");
  if (!state.provider?.request) throw new Error("No wallet detected");
  await state.provider.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: state.requiredChainId }],
  });
}

async function waitForReceipt(txHash) {
  for (;;) {
    const receipt = await state.provider.request({
      method: "eth_getTransactionReceipt",
      params: [txHash],
    });
    if (receipt) {
      if (receipt.status === "0x0") throw new Error("Transaction failed");
      return receipt;
    }
    await new Promise((r) => setTimeout(r, 1200));
  }
}

async function refreshUI() {
  els.walletAddress.textContent = state.account ? shortenAddr(state.account) : "Not connected";

  if (state.isClaiming) {
    setClaimState("claiming");
    setClaimButton({ enabled: false, label: "Claiming…", spinning: true });
    return;
  }

  if (state.contract === DEFAULT_CONTRACT) {
    setClaimState("disabled");
    setClaimable("0");
    setClaimButton({ enabled: false, label: "Claim", spinning: false });
    setHint("Airdrop is not configured yet.");
    return;
  }

  if (!state.account) {
    setClaimState("disabled");
    setClaimable("0");
    setClaimButton({ enabled: false, label: "Claim", spinning: false });
    setHint("Connect your wallet to check eligibility.");
    return;
  }

  if (state.requiredChainId && state.chainId && state.chainId.toLowerCase() !== state.requiredChainId.toLowerCase()) {
    setClaimState("disabled");
    setClaimable("0");
    setClaimButton({ enabled: false, label: "Claim", spinning: false });
    setHint(
      `Wrong network. <button class="linklike" id="hintSwitch">Click to switch</button> to Ethereum mainnet.`
    );
    const btn = document.getElementById("hintSwitch");
    if (btn) btn.addEventListener("click", () => switchToRequiredNetwork().catch(() => {}), { once: true });
    return;
  }

  if (!state.merkle) {
    setClaimState("disabled");
    setClaimable("0");
    setClaimButton({ enabled: false, label: "Claim", spinning: false });
    setHint("Loading eligibility data…");
    return;
  }

  const entry = state.merkle.entries?.[state.account];
  state.entry = entry || null;

  if (!entry) {
    setClaimState("disabled");
    setClaimable("0");
    setClaimButton({ enabled: false, label: "Claim", spinning: false });
    setHint("This wallet is not eligible for the airdrop.");
    return;
  }

  setClaimable(entry.amount);

  try {
    const res = await ethCall(state.contract, encodeClaimedCalldata(state.account));
    const claimed = res && res !== "0x" ? BigInt(res) !== 0n : false;
    if (claimed) {
      setClaimState("disabled");
      setClaimButton({ enabled: false, label: "Claimed", spinning: false });
      setHint("You’ve already claimed with this wallet.");
      return;
    }
  } catch {
    setClaimState("disabled");
    setClaimButton({ enabled: false, label: "Claim", spinning: false });
    setHint("Unable to check claim status. Please try again.");
    return;
  }

  setClaimState("ready");
  setClaimButton({ enabled: true, label: "Claim", spinning: false });
  setHint("You’ll confirm a transaction in your wallet.");
}

async function loadMerkle() {
  const res = await fetch(state.merkleUrl, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to fetch merkle json: ${res.status}`);
  const merkle = await res.json();

  const entries = merkle.entries || {};
  const normalizedEntries = {};
  for (const [k, v] of Object.entries(entries)) normalizedEntries[normAddr(k)] = v;
  state.merkle = { ...merkle, entries: normalizedEntries };
}

function setupProviderDiscovery() {
  window.addEventListener("eip6963:announceProvider", (event) => {
    const detail = event?.detail;
    if (!detail?.info?.uuid || !detail?.provider?.request) return;
    discoveredProviders.set(detail.info.uuid, { info: detail.info, provider: detail.provider });
  });

  // Request providers to announce themselves.
  window.dispatchEvent(new Event("eip6963:requestProvider"));
}

async function pickProvider() {
  // Give EIP-6963 a moment to populate.
  await new Promise((r) => setTimeout(r, 50));

  const allow = (state.allowedWalletRdns || []).map((x) => String(x).toLowerCase()).filter(Boolean);
  const block = new Set((state.blockedWalletRdns || []).map((x) => String(x).toLowerCase()).filter(Boolean));

  let list = [...discoveredProviders.values()].filter((item) => {
    const rdns = String(item.info?.rdns || "").toLowerCase();
    if (rdns && block.has(rdns)) return false;
    if (allow.length > 0) return allow.includes(rdns);
    return true;
  });

  if (list.length === 0) {
    // Fallback to legacy injected provider.
    if (window.ethereum?.request) return window.ethereum;
    return null;
  }

  if (list.length === 1) return list[0].provider;

  // Multiple providers: show a tiny chooser modal.
  return await new Promise((resolve) => {
    const modal = els.walletModal;
    const container = els.walletList;
    if (!modal || !container) return resolve(list[0].provider);

    container.innerHTML = "";

    const close = () => {
      modal.hidden = true;
      resolve(null);
    };

    const onCloseClick = (e) => {
      if (e.target && e.target.closest("[data-wallet-close]")) close();
    };

    modal.addEventListener("click", onCloseClick, { once: true });

    for (const item of list) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "button button--ghost wallet-option";

      const iconWrap = document.createElement("span");
      iconWrap.className = "wallet-option__icon";
      if (item.info?.icon) {
        const img = document.createElement("img");
        img.src = item.info.icon;
        img.alt = "";
        iconWrap.appendChild(img);
      }

      const name = document.createElement("span");
      name.className = "wallet-option__name";
      name.textContent = item.info?.name || "Wallet";

      btn.appendChild(iconWrap);
      btn.appendChild(name);

      btn.addEventListener(
        "click",
        () => {
          modal.hidden = true;
          resolve(item.provider);
        },
        { once: true }
      );

      container.appendChild(btn);
    }

    modal.hidden = false;
  });
}

async function connectWallet() {
  if (!state.provider) state.provider = await pickProvider();
  if (!state.provider?.request) throw new Error("No wallet detected. Please install a wallet.");

  const accounts = await state.provider.request({ method: "eth_requestAccounts" });
  state.account = normAddr(accounts?.[0] || "") || null;
  state.chainId = await state.provider.request({ method: "eth_chainId" });

  if (
    state.requiredChainId &&
    state.chainId &&
    state.chainId.toLowerCase() !== state.requiredChainId.toLowerCase() &&
    !hasPromptedNetworkSwitch
  ) {
    hasPromptedNetworkSwitch = true;
    try {
      await switchToRequiredNetwork();
      state.chainId = await state.provider.request({ method: "eth_chainId" });
    } catch {
      // ignore; UI will show wrong network hint
    }
  }

  if (!state.merkle) {
    try {
      await loadMerkle();
    } catch {
      // UI will surface loading state
    }
  }

  await refreshUI();
}

async function doClaim() {
  if (!state.account) throw new Error("Connect wallet first");
  if (!state.entry) throw new Error("Not eligible");
  if (state.contract === DEFAULT_CONTRACT) throw new Error("Contract not configured");

  state.isClaiming = true;
  setHint("Confirm the transaction in your wallet…");
  await refreshUI();

  const amount = state.entry.amount;
  const proof = state.entry.proof || [];
  const data = encodeClaimCalldata(amount, proof);

  const txHash = await state.provider.request({
    method: "eth_sendTransaction",
    params: [{ from: state.account, to: state.contract, data }],
  });

  setHint("Transaction submitted. Waiting for confirmation…");
  await waitForReceipt(txHash);

  state.isClaiming = false;
  setClaimButton({ enabled: false, label: "Claimed", spinning: false });
  setHint("Claim successful. Tokens are now in your wallet.");
  await refreshUI();
}

function readConfig() {
  const cfg = window.RSS3_AIRDROP_CONFIG || {};
  const contract = normAddr(cfg.contractAddress || DEFAULT_CONTRACT);
  state.contract = /^0x[0-9a-f]{40}$/.test(contract) ? contract : DEFAULT_CONTRACT;
  state.merkleUrl = String(cfg.merkleUrl || "/assets/final_airdrop_merkle.json");
  const requiredChainId = String(cfg.requiredChainId || "").trim();
  state.requiredChainId = requiredChainId || null;

  state.allowedWalletRdns = Array.isArray(cfg.allowedWalletRdns) ? cfg.allowedWalletRdns : [];
  state.blockedWalletRdns = Array.isArray(cfg.blockedWalletRdns) ? cfg.blockedWalletRdns : [];
}

els.connect.addEventListener("click", () => {
  connectWallet().catch((e) => alert(e?.message || String(e)));
});

els.claim.addEventListener("click", () => {
  doClaim()
    .catch((e) => alert(e?.message || String(e)))
    .finally(() => {
      state.isClaiming = false;
      refreshUI();
    });
});

function attachProviderListeners() {
  if (!state.provider?.on) return;
  state.provider.on("accountsChanged", (accounts) => {
    state.account = normAddr(accounts?.[0] || "") || null;
    hasPromptedNetworkSwitch = false;
    refreshUI();
  });
  state.provider.on("chainChanged", (chainId) => {
    state.chainId = chainId;
    refreshUI();
  });
}

readConfig();
setupProviderDiscovery();
loadMerkle().finally(() => refreshUI());

// Attach listeners after first provider selection.
els.connect.addEventListener(
  "click",
  () => {
    setTimeout(() => attachProviderListeners(), 0);
  },
  { once: true }
);
