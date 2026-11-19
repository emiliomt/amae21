"use client";
import { useState } from "react";
import Photo from "./Photo";

export type Pic = { src: string; w: number; h: number; alt: string; t: string; m: string; wm: number };

// Galería: foto principal + miniaturas que la cambian. Sin fotos, muestra marcadores.
export default function Gallery({ pics, name, eager = false }: { pics: Pic[]; name: string; eager?: boolean }) {
  const [i, setI] = useState(0);
  if (!pics.length) {
    return (
      <div className="grid grid-cols-3 gap-2">
        <Photo className="col-span-3 aspect-[4/3]" tone={0} />
        <Photo className="aspect-square" tone={1} /><Photo className="aspect-square" tone={2} /><Photo className="aspect-square" tone={1} />
      </div>
    );
  }
  const cur = pics[i];
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cur.m} srcSet={`${cur.m} ${cur.wm}w, ${cur.src} ${cur.w}w`} sizes="(min-width: 768px) 480px, 100vw" width={cur.w} height={cur.h} alt={cur.alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} className="aspect-[4/5] w-full bg-concreto object-cover" />
      <ul className="mt-2 grid grid-cols-6 gap-2" aria-label={name}>
        {pics.map((p, k) => (
          <li key={p.src}>
            <button type="button" onClick={() => setI(k)} aria-label={p.alt} aria-current={k === i} className={`block w-full border-2 ${k === i ? "border-dusk" : "border-transparent"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.t} width={p.w} height={p.h} alt="" loading="lazy" className="aspect-square w-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
