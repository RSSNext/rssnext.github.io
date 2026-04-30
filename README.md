# rssnext.github.io

Static RSS3 site built with Next.js.

## Development

```bash
pnpm install
pnpm dev
```

## Static export

```bash
pnpm build
```

The build writes a fully static site to `out/`, including `CNAME`, `.nojekyll`,
the Merkle JSON, and the static blog HTML files under `public/`.

## Migration portal config

The migration page uses RainbowKit for wallet connection and wagmi/viem for contract
reads and writes. Update `public/airdrop.config.json` before deployment:

```json
{
  "contractAddress": "0xF724bCD307a4A76d92d3B37Ec7d01708Ceb6CB45",
  "requiredChainId": "0x1",
  "merkleUrl": "/assets/final_airdrop_merkle.json"
}
```

Set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` during build to enable WalletConnect
inside RainbowKit. Without it, the static build still uses RainbowKit, but only
browser-injected wallets are shown.
