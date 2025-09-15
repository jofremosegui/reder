import { NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma";

const toInt = (v: string | null) => {
  if (!v) return undefined;
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? undefined : n;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const q        = searchParams.get("q") || undefined;
    const city     = searchParams.get("city") || undefined;
    const minPrice = toInt(searchParams.get("min_price"));
    const maxPrice = toInt(searchParams.get("max_price"));

    // Build WHERE (SQLite-friendly: no "mode: 'insensitive'")
    const where: any = {};
    if (q) {
      where.OR = [
        { title:       { contains: q } },
        { description: { contains: q } },
      ];
    }
    if (city) where.city = city;
    if (minPrice != null || maxPrice != null) {
      where.priceEur = { gte: minPrice ?? undefined, lte: maxPrice ?? undefined };
    }

    const rows = await prisma.listing.findMany({
  where,
  orderBy: { createdAt: "desc" },
  select: { id: true, title: true, priceEur: true, city: true, neighborhood: true, url: true, imageUrl: true },
});

const items = rows.map(r => ({
  id: r.id,
  title: r.title,
  price_eur: r.priceEur,
  city: r.city,
  neighborhood: r.neighborhood ?? "",
  url: r.url ?? "",
  image: r.imageUrl ?? "",
}));


    return Response.json(items);
  } catch (err) {
    console.error("api/listings error", err);
    return new Response(JSON.stringify({ error: "Internal error" }), { status: 500 });
  }
}
