"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatUnits, isAddress, zeroAddress } from "viem";
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from "wagmi";

const DEFAULT_CONFIG = {
  contractAddress: zeroAddress,
  requiredChainId: "0x1",
  merkleUrl: "/assets/final_airdrop_merkle.json",
};

const AIRDROP_ABI = [
  {
    type: "function",
    name: "claimed",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "claim",
    stateMutability: "nonpayable",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "proof", type: "bytes32[]" },
    ],
    outputs: [],
  },
];

function normalizeAddress(value) {
  return String(value || "").trim().toLowerCase();
}

function parseChainId(value) {
  if (typeof value === "number" && Number.isSafeInteger(value)) {
    return value;
  }

  const text = String(value || "").trim();
  if (/^0x[0-9a-f]+$/i.test(text)) {
    return Number.parseInt(text, 16);
  }

  const parsed = Number(text);
  return Number.isSafeInteger(parsed) ? parsed : 1;
}

function formatTokenAmount(rawValue) {
  if (!rawValue) {
    return "0";
  }

  const formatted = formatUnits(BigInt(rawValue), 18);
  const [whole, fraction = ""] = formatted.split(".");
  const trimmedFraction = fraction.slice(0, 6).replace(/0+$/, "");
  return trimmedFraction ? `${whole}.${trimmedFraction}` : whole;
}

function getErrorMessage(error) {
  return error?.shortMessage || error?.message || "Something went wrong. Please try again.";
}

export default function ClaimClient() {
  const { address, chainId, isConnected, status: accountStatus } = useAccount();
  const { switchChainAsync, isPending: isSwitchingNetwork } = useSwitchChain();
  const { writeContractAsync, isPending: isConfirmingInWallet } = useWriteContract();

  const [airdropConfig, setAirdropConfig] = useState(DEFAULT_CONFIG);
  const [merkle, setMerkle] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [isAirdropDataLoading, setIsAirdropDataLoading] = useState(true);
  const [claimMessage, setClaimMessage] = useState("");
  const [claimState, setClaimState] = useState("idle");

  const requiredChainId = useMemo(
    () => parseChainId(airdropConfig.requiredChainId),
    [airdropConfig.requiredChainId]
  );

  const publicClient = usePublicClient({ chainId: requiredChainId });

  const contractAddress = useMemo(() => {
    const candidate = String(airdropConfig.contractAddress || "").trim();
    return isAddress(candidate) ? candidate : zeroAddress;
  }, [airdropConfig.contractAddress]);

  const isConfigured = contractAddress !== zeroAddress;
  const normalizedAccount = normalizeAddress(address);
  const entry = normalizedAccount ? merkle?.entries?.[normalizedAccount] || null : null;
  const wrongNetwork = Boolean(isConnected && chainId && chainId !== requiredChainId);
  const shouldReadClaimed =
    Boolean(address) &&
    Boolean(entry) &&
    isConfigured &&
    isConnected &&
    !wrongNetwork &&
    claimState !== "success";

  const {
    data: hasClaimed,
    error: claimedReadError,
    refetch: refetchClaimed,
  } = useReadContract({
    address: contractAddress,
    abi: AIRDROP_ABI,
    functionName: "claimed",
    args: address ? [address] : undefined,
    chainId: requiredChainId,
    query: {
      enabled: shouldReadClaimed,
    },
  });

  useEffect(() => {
    let cancelled = false;

    async function loadAirdropData() {
      setLoadError("");
      setIsAirdropDataLoading(true);

      try {
        const configResponse = await fetch("/airdrop.config.json", { cache: "no-store" });
        if (!configResponse.ok) {
          throw new Error(`Failed to load airdrop config: ${configResponse.status}`);
        }

        const loadedConfig = await configResponse.json();
        if (cancelled) {
          return;
        }

        const mergedConfig = { ...DEFAULT_CONFIG, ...loadedConfig };
        setAirdropConfig(mergedConfig);

        const merkleResponse = await fetch(mergedConfig.merkleUrl, { cache: "force-cache" });
        if (!merkleResponse.ok) {
          throw new Error(`Failed to load Merkle data: ${merkleResponse.status}`);
        }

        const loadedMerkle = await merkleResponse.json();
        const normalizedEntries = {};
        for (const [account, accountEntry] of Object.entries(loadedMerkle.entries || {})) {
          normalizedEntries[normalizeAddress(account)] = accountEntry;
        }

        if (!cancelled) {
          setMerkle({ ...loadedMerkle, entries: normalizedEntries });
          setIsAirdropDataLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(getErrorMessage(error));
          setIsAirdropDataLoading(false);
        }
      }
    }

    loadAirdropData();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSwitchNetwork = useCallback(async () => {
    setClaimMessage("");
    try {
      await switchChainAsync({ chainId: requiredChainId });
    } catch (error) {
      setClaimMessage(getErrorMessage(error));
    }
  }, [requiredChainId, switchChainAsync]);

  const handleClaim = useCallback(async () => {
    if (!entry || !address || !publicClient) {
      return;
    }

    setClaimState("claiming");
    setClaimMessage("Confirm the transaction in your wallet...");

    try {
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: AIRDROP_ABI,
        functionName: "claim",
        args: [BigInt(entry.amount), entry.proof || []],
        chainId: requiredChainId,
      });

      setClaimMessage("Transaction submitted. Waiting for confirmation...");
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      if (receipt.status === "reverted") {
        throw new Error("Transaction failed");
      }

      setClaimState("success");
      setClaimMessage("You've already claimed with this wallet.");
      await refetchClaimed().catch(() => undefined);
    } catch (error) {
      setClaimState("error");
      setClaimMessage(getErrorMessage(error));
    }
  }, [address, contractAddress, entry, publicClient, refetchClaimed, requiredChainId, writeContractAsync]);

  const isClaiming = claimState === "claiming" || isConfirmingInWallet;
  const isWalletStatusSettling = accountStatus === "connecting" || accountStatus === "reconnecting";
  const claimableHuman = entry ? formatTokenAmount(entry.amount) : "0";
  const isAlreadyClaimed = Boolean(hasClaimed || claimState === "success");
  const isClaimStatusLoading = shouldReadClaimed && hasClaimed === undefined && !claimedReadError;
  const isAmountLoading = isAirdropDataLoading || isWalletStatusSettling || isClaimStatusLoading;
  const canClaim =
    isConfigured &&
    isConnected &&
    !wrongNetwork &&
    Boolean(merkle) &&
    Boolean(entry) &&
    !isAirdropDataLoading &&
    !isWalletStatusSettling &&
    !isClaimStatusLoading &&
    !isAlreadyClaimed &&
    !claimedReadError &&
    !isClaiming;

  const cardState = canClaim ? "ready" : isClaiming ? "claiming" : "disabled";
  const claimButtonLabel = isClaiming ? "Claiming..." : isAlreadyClaimed ? "Claimed" : "Claim";

  let hint = claimMessage;
  if (!hint) {
    if (isAirdropDataLoading) {
      hint = "Loading eligibility data...";
    } else if (!isConfigured) {
      hint = "Migration is not configured yet.";
    } else if (loadError) {
      hint = loadError;
    } else if (isWalletStatusSettling) {
      hint = "Loading wallet...";
    } else if (!isConnected) {
      hint = "Connect your wallet to check eligibility.";
    } else if (wrongNetwork) {
      hint = "Wrong network.";
    } else if (!merkle) {
      hint = "Loading eligibility data...";
    } else if (!entry) {
      hint = "This wallet is not eligible for migration.";
    } else if (isClaimStatusLoading) {
      hint = "Checking claim status...";
    } else if (isAlreadyClaimed) {
      hint = "You've already claimed with this wallet.";
    } else if (claimedReadError) {
      hint = "Unable to check migration status. Please try again.";
    } else {
      hint = "You'll confirm a transaction in your wallet.";
    }
  }

  return (
    <main className="wrap claim-main" id="main">
      <section className="claim-card" data-claim-state={cardState}>
        <header className="claim-card__header">
          <h1 className="claim-title">Access VSL Assets</h1>
          <p className="claim-subtitle">
            Your assets from VSL have been migrated to Ethereum. $POWER has
            been automatically converted into $RSS3. If you are using a Folo
            wallet, no action is required.
          </p>
        </header>

        <div className="claim-grid claim-grid--compact">
          <div className="claim-row claim-row--stack">
            <div className="claim-label">Wallet</div>
            <div className="claim-value claim-wallet">
              <code>{normalizedAccount || "Not connected"}</code>
              <ConnectButton.Custom>
                {({ account, chain, mounted, openAccountModal, openChainModal, openConnectModal }) => {
                  const connected = mounted && account && chain;

                  if (!connected) {
                    return (
                      <button className="button" type="button" onClick={openConnectModal}>
                        Connect
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button className="button" type="button" onClick={openChainModal}>
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <button className="button" type="button" onClick={openAccountModal}>
                      {account.displayName}
                    </button>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </div>

          <div className="claim-row claim-row--stack">
            <div className="claim-label">Migration amount</div>
            <div className="claim-value">
              <div className="claim-amount">
                {isAmountLoading ? (
                  <div className="claim-amount__loading" role="status" aria-label="Loading migration amount">
                    <span className="spinner is-on" aria-hidden="true" />
                    <span>Loading</span>
                  </div>
                ) : (
                  <div className="claim-amount__primary">
                    <span>{claimableHuman}</span>
                    <span className="claim-amount__unit">$RSS3</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="claim-actions">
          <button
            className="button button--primary"
            type="button"
            disabled={!canClaim}
            onClick={handleClaim}
          >
            <span className="btn-label">{claimButtonLabel}</span>
            <span className={`spinner${isClaiming ? " is-on" : ""}`} aria-hidden="true" />
          </button>
          <div className="claim-hint">
            <span>{hint}</span>
            {wrongNetwork ? (
              <>
                {" "}
                <button
                  className="linklike"
                  type="button"
                  onClick={handleSwitchNetwork}
                  disabled={isSwitchingNetwork}
                >
                  {isSwitchingNetwork ? "Switching..." : "Switch to Ethereum mainnet"}
                </button>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
