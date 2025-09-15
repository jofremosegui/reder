import Link from "next/link";

export type Listing = {
  id: number;
  title: string;
  price_eur: number;
  city: string;
  url: string;
  image?: string;
  neighborhood?: string;
};

export default function ListingCard({ l }: { l: Listing }) {
  const img = l.image || `https://picsum.photos/seed/reder-${l.id}/600/380`;

  return (
    <Link href={`/listing/${l.id}`} className="block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition
                                               dark:border-slate-800 dark:bg-slate-900">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={l.title} className="h-44 w-full object-cover" />
      </div>
      <div className="space-y-1 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-base font-semibold">{l.title}</h3>
          <div className="shrink-0 rounded-lg bg-slate-900 px-2 py-1 text-sm font-semibold text-white
                          dark:bg-slate-100 dark:text-slate-900">
            {l.price_eur.toLocaleString()} €
          </div>
        </div>
        <p className="text-sm text-slate-500">
          {l.city}{l.neighborhood ? ` · ${l.neighborhood}` : ""}
        </p>
      </div>
    </Link>
  );
}
