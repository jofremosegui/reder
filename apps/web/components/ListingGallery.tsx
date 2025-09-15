"use client";
import { useState } from "react";

export default function ListingGallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const main = images[i] || images[0];

  return (
    <div className="space-y-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={main} alt={alt} className="h-[360px] w-full rounded-3xl object-cover" />
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.slice(0,5).map((src, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`${alt} ${idx + 1}`}
              onClick={() => setI(idx)}
              className={
                "h-20 w-full cursor-pointer rounded-xl object-cover ring-2 ring-transparent " +
                (i === idx ? "ring-slate-900 dark:ring-slate-100" : "hover:ring-slate-300 dark:hover:ring-slate-700")
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
