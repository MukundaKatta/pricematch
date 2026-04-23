import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PriceMatch — Stop undercharging. Freelancers, we see you.",
  description:
    "Tell us the project, the city, the seniority. We tell you what to charge — backed by real industry rates.",
  openGraph: {
    title: "PriceMatch — Stop undercharging. Freelancers, we see you.",
    description:
      "Tell us the project, the city, the seniority. We tell you what to charge — backed by real industry rates.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=PriceMatch&accent=teal&category=Personal%20finance",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=PriceMatch&accent=teal&category=Personal%20finance",
    ],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2032%2032'%3E%3Ccircle%20cx%3D'16'%20cy%3D'16'%20r%3D'14'%20fill%3D'%2314b8a6'%2F%3E%3C%2Fsvg%3E",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="pricematch.vercel.app"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body
        className={`${inter.className} bg-white text-neutral-900 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
