import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import ClaimIsland from "./ClaimIsland";

export const metadata = {
  title: "Migrate RSS3",
  description: "Migrate your RSS3 tokens with a Merkle proof.",
};

export default function ClaimPage() {
  return (
    <>
      <div className="page-noise" aria-hidden="true" />
      <SiteHeader activeItem="migration" />
      <ClaimIsland />
      <SiteFooter />
    </>
  );
}
