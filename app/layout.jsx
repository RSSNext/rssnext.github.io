import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

export const metadata = {
  title: {
    default: "RSS3",
    template: "%s - RSS3",
  },
  description: "RSS3 builds products and infrastructure for a more readable open web.",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
