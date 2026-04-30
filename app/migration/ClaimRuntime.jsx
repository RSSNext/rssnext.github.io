"use client";

import Providers from "../providers";
import ClaimClient from "./ClaimClient";

export default function ClaimRuntime() {
  return (
    <Providers>
      <ClaimClient />
    </Providers>
  );
}
