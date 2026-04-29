// Airdrop claim site config (edit before deploying).
// Keep this file at repo root so it can be updated without touching page code.
window.RSS3_AIRDROP_CONFIG = {
  // MerkleAirdrop contract address (MerkleAirdrop.sol).
  // TODO: set to the deployed contract address.
  contractAddress: "0x0000000000000000000000000000000000000000",

  // Target chain (Ethereum mainnet).
  // Wallet must be connected to this chain to claim.
  requiredChainId: "0x1",


  // Merkle JSON with { root, entries: { [address]: { amount, proof } } }
  merkleUrl: "/assets/final_airdrop_merkle.json",
};
