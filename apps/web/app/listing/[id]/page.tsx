import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../lib/prisma"; // from /app/listing/[id]/ to /lib
import ListingGallery from "../../../components/ListingGallery";
import { Bed, Bath, Ruler, Snowflake, Wifi, PawPrint, Building2, Thermometer, MapPin } from "lucide-react";
import ContactForm from "../../../components/ContactForm";

type Params = { params: { id: string } };

export async function generateMetadata({ params }: Params) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return { title: "Listing | Reder" };
  const l = await prisma.listing.findUnique({ where: { id }, select: { title: true, city: true } });
  return { title: l ? `${l.title} · ${l.city} | Reder` : "Listing | Reder" };
}

export default async function ListingPage({ params }: Params) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const l = await prisma.listing.findUnique({ where: { id } });
  if (!l) notFound();

  // Build a small gallery (placeholder extras if we only have one imageUrl)
  const base = l.imageUrl || `https://picsum.photos/seed/reder-${l.id}/1200/800`;
  const images = [base, `https://picsum.photos/seed/reder-${l.id}-2/1200/800`, `https://picsum.photos/seed/reder-${l.id}-3/1200/800`];

  // Simple OSM embed (no API key)
  const bboxPad = 0.01;
  const bbox =
    l.lat && l.lon
      ? `${(l.lon - bboxPad).toFixed(5)},${(l.lat - bboxPad).toFixed(5)},${(l.lon + bboxPad).toFixed(5)},${(l.lat + bboxPad).toFixed(5)}`
      : undefined;
  const osm = l.lat && l.lon
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${l.lat},${l.lon}`
    : undefined;

  const Fact = ({ icon: Icon, label, value }: { icon: any; label: string; value?: string | number | null }) => {
    if (value === null || value === undefined || value === "") return null;
    return (
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-800">
        <Icon className="h-4 w-4 text-slate-500" />
        <span className="text-slate-900 dark:text-slate-100">
          <span className="text-slate-500">{label}:</span> <span className="font-medium">{value}</span>
        </span>
      </div>
    );
  };

  const BoolChip = ({ label, on }: { label: string; on?: boolean | null }) => {
    if (on === null || on === undefined) return null;
    return (
      <span className={"select-none rounded-full px-3 py-1 text-xs font-medium " + (on
        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
        : "bg-slate-100 text-slate-600 line-through dark:bg-slate-800 dark:text-slate-400")}>
        {label}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Breadcrumb / header strip */}
      <div className="flex items-center justify-between">
        <Link href="/search" className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">← Back to search</Link>
        <div className="text-sm text-slate-500">ID #{l.id}</div>
      </div>

      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
  <ListingGallery images={images} alt={l.title} />

  {/* stronger gradient for readability */}
  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <div className="max-w-[70%]">
            {/* semi-opaque pill behind title */}
            <div className="inline-block rounded-2xl bg-black/60 px-4 py-2 backdrop-blur">
                <h1 className="text-2xl font-semibold leading-snug text-white">{l.title}</h1>
            </div>
            <div className="mt-2 inline-flex items-center gap-2 rounded-xl bg-black/40 px-3 py-1 text-white/90 backdrop-blur">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                {l.city}{l.neighborhood ? ` · ${l.neighborhood}` : ""}{l.address ? ` · ${l.address}` : ""}
                </span>
            </div>
            </div>

            <div className="shrink-0 rounded-2xl bg-white/95 px-4 py-2 text-lg font-semibold text-slate-900 shadow-md">
            {l.priceEur.toLocaleString()} €
            </div>
        </div>
        </div>

      {/* BODY: two columns */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* LEFT: details */}
        <div className="space-y-6">
          {/* Facts row */}
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            <Fact icon={Bed} label="Bedrooms" value={l.bedrooms ?? (l.propertyType === "ROOM" ? 1 : undefined)} />
            <Fact icon={Bath} label="Bathrooms" value={l.bathrooms ?? undefined} />
            <Fact icon={Ruler} label="Size (m²)" value={l.sizeSqm ?? undefined} />
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            <BoolChip label="Furnished" on={l.furnished} />
            <BoolChip label="Elevator" on={l.hasElevator} />
            <BoolChip label="Balcony" on={l.hasBalcony} />
            <BoolChip label="A/C" on={l.hasAC} />
            <BoolChip label="Heating" on={l.heating} />
            <BoolChip label="Bills included" on={l.billsIncluded} />
            <BoolChip label="Internet" on={l.internetIncluded} />
            <BoolChip label="Pets allowed" on={l.petsAllowed} />
          </div>

          {/* Description */}
          {l.description && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-2 text-base font-semibold">Description</h2>
              <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">{l.description}</p>
            </section>
          )}

          {/* Map */}
          {osm && (
            <section className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <iframe
                title="Map"
                src={osm}
                className="h-80 w-full"
                loading="lazy"
              />
              <div className="border-t border-slate-200 p-3 text-right text-sm dark:border-slate-800">
                <a
                  href={`https://www.openstreetmap.org/?mlat=${l.lat}&mlon=${l.lon}#map=16/${l.lat}/${l.lon}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-600 underline underline-offset-4 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                >
                  Open in Map
                </a>
              </div>
            </section>
          )}
        </div>

        {/* RIGHT: sticky summary / CTA */}
        <aside className="self-start lg:sticky lg:top-20">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="text-3xl font-semibold">{l.priceEur.toLocaleString()} €</div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Building2 className="h-4 w-4" /> {l.propertyType}
              </div>
              {l.hasAC && <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Snowflake className="h-4 w-4" /> A/C</div>}
              {l.heating && <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Thermometer className="h-4 w-4" /> Heating</div>}
              {l.internetIncluded && <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Wifi className="h-4 w-4" /> Internet included</div>}
              {l.petsAllowed && <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><PawPrint className="h-4 w-4" /> Pets allowed</div>}
            </div>

            <div className="grid gap-2 pt-2">
              {l.url && (
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900"
                >
                  View original source
                </a>
              )}
              {l.lat && l.lon && (
                <a
                  href={`https://www.google.com/maps?q=${l.lat},${l.lon}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Open in Google Maps
                </a>
              )}
            </div>
            <div className="pt-2">
            <ContactForm
                listingId={l.id}
                listerName={l.listerName}
                listerEmail={l.listerEmail}
                listerPhone={l.listerPhone}
            />
             </div>
            <div className="text-xs text-slate-500">Listed: {l.createdAt.toISOString().slice(0, 10)}</div>
          </div>

        </aside>
      </div>
    </div>
  );
}
