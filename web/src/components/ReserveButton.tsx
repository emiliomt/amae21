"use client";
import Link from "next/link";
import { track } from "@/lib/analytics";

export default function ReserveButton({ href, label, where, className = "btn" }: { href: string; label: string; where: string; className?: string }) {
  return <Link href={href} className={className} onClick={() => track("Reservar click", { lugar: where })}>{label}</Link>;
}
