import type { Metadata } from "next";
// El registro es solo para huéspedes (QR en recepción): no se indexa.
export const metadata: Metadata = { robots: { index: false, follow: false } };
export default function L({ children }: { children: React.ReactNode }) { return children; }
