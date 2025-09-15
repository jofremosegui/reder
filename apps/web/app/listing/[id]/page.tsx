import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../lib/prisma"; // ../../../ from /app/listing/[id] to /lib/prisma

type Params = { params: { id: string } };

export async function generateMetadata({ params }: Params) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return { title: "Listing" };
  const l = await prisma.listing.findUnique({ where: { id }, select: { title: true, city: true } });
  return { title: l ? `${l.title} · ${l.city} | Reder` : "Listing | Reder" };
}

export default async function ListingPage({ params }: Params) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const l = await prisma.listing.findUnique({ where: { id } });
  if (!l) notFound();

  const img = l.imageUrl || `https://picsum.photos/seed/reder-${l.id}/1200/800`;

  const feature = (label: string, value?: string | number | boolean | null) => {
    if (value === null || value === undefined || value === "") return null;
    const v =
      typeof value === "boolean" ? (value ? "Yes" : "No")
      : typeof value === "number" ? String(value)
      : value;
    return (
      <div className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-800" key={label}>
        <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
        <div className="font-medium text-slate-900 dark:text-slate-100">{v}</div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/search" className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">← Back to search</Link>
        <div className="text-sm text-slate-500">ID #{l.id}</div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={l.title} className="h-[360px] w-full object-cover" />
      </div>

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{l.title}</h1>
          <p className="text-slate-600 dark:text-slate-400">
            {l.city}{l.neighborhood ? ` · ${l.neighborhood}` : ""}{l.address ? ` · ${l.address}` : ""}
          </p>
        </div>
        <div className="rounded-xl bg-slate-900 px-4 py-2 text-white dark:bg-slate-100 dark:text-slate-900 text-lg font-semibold">
          {l.priceEur.toLocaleString()} €
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {feature("Type", l.propertyType)}
        {feature("Bedrooms", l.bedrooms)}
        {feature("Bathrooms", l.bathrooms)}
        {feature("Size (m²)", l.sizeSqm)}
        {feature("Floor", l.floor)}
        {feature("Furnished", l.furnished)}
        {feature("Elevator", l.hasElevator)}
        {feature("Balcony", l.hasBalcony)}
        {feature("A/C", l.hasAC)}
        {feature("Heating", l.heating)}
        {feature("Bills included", l.billsIncluded)}
        {feature("Internet", l.internetIncluded)}
        {feature("Pets allowed", l.petsAllowed)}
        {feature("Deposit (€)", l.depositEur)}
        {feature("Available from", l.availableFrom?.toISOString().slice(0,10))}
        {feature("Min term (months)", l.minTermMonths)}
        {feature("Max term (months)", l.maxTermMonths)}
        {feature("Roommates", l.roommates)}
        {feature("Gender pref.", l.genderPref)}
      </div>

      {l.description && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-2 text-base font-semibold">Description</h2>
          <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">{l.description}</p>
        </section>
      )}

      <footer className="flex flex-wrap items-center gap-3">
        {l.url && (
          <a href={l.url} target="_blank" rel="noreferrer"
             className="rounded-xl border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
            View original source
          </a>
        )}
        {l.lat && l.lon && (
          <a
            href={`https://www.google.com/maps?q=${l.lat},${l.lon}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Open in Maps
          </a>
        )}
      </footer>
    </div>
  );
}
