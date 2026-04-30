import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import ClaimIsland from "./ClaimIsland";

export const metadata = {
  title: "Access VSL Assets",
  description: "VSL users can access migrated assets here.",
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
