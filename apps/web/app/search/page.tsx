"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "../../components/SearchBar";
import ListingCard, { Listing } from "../../components/ListingCard";

export default function SearchPage() {
  const params = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const initial = useMemo(() => {
    // pick initial values to prefill SearchBar if you want (optional)
    return {
      q: params.get("q") || "",
      city: params.get("city") || "",
      min: params.get("min_price") || "",
      max: params.get("max_price") || "",
    };
  }, [params]);

  const fetchListings = async (p?: URLSearchParams) => {
    setLoading(true);
    const url = p ? `/api/listings?${p.toString()}` : `/api/listings`;
    const res = await fetch(url);
    setListings(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    // on first load, fetch using any params from the URL
    const u = new URLSearchParams();
    if (initial.q) u.set("q", initial.q);
    if (initial.city) u.set("city", initial.city);
    if (initial.min) u.set("min_price", initial.min);
    if (initial.max) u.set("max_price", initial.max);
    fetchListings(u.toString() ? u : undefined);
  }, [initial.q, initial.city, initial.min, initial.max]);

  const onSearch = (p: { q?: string; city?: string; min?: string; max?: string }) => {
    const u = new URLSearchParams();
    if (p.q) u.set("q", p.q);
    if (p.city) u.set("city", p.city);
    if (p.min) u.set("min_price", p.min);
    if (p.max) u.set("max_price", p.max);
    // update the URL for shareability
    const next = u.toString();
    history.replaceState(null, "", next ? `/search?${next}` : "/search");
    fetchListings(u);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
        <SearchBar onSearch={onSearch} />
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/50" />
          ))}
        </div>
      ) : listings.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {listings.map((l) => (
            <ListingCard key={l.id} l={l} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500">No results. Try broadening your filters.</p>
      )}
    </div>
  );
}
