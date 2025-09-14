import { NextRequest } from "next/server";
type Listing = { id:number; title:string; price_eur:number; city:string; url:string; image?:string };

const DB: Listing[] = [
  { id: 1, title: "Studio near UPF", price_eur: 950,  city: "Barcelona", url: "#", image: "" },
  { id: 2, title: "2BR Eixample",    price_eur: 1500, city: "Barcelona", url: "",  image: "" },
  { id: 3, title: "1BR Centro",      price_eur: 1200, city: "Madrid",    url: "",  image: "" },
  { id: 4, title: "Loft Gràcia",     price_eur: 1100, city: "Barcelona", url: "",  image: "" },
];

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const city = (searchParams.get("city") || "").toLowerCase();
  const min = Number(searchParams.get("min_price"));
  const max = Number(searchParams.get("max_price"));
  const hasMin = !Number.isNaN(min);
  const hasMax = !Number.isNaN(max);

  let data = DB;
  if (q) data = data.filter(d => d.title.toLowerCase().includes(q));
  if (city) data = data.filter(d => d.city.toLowerCase() === city);
  if (hasMin) data = data.filter(d => d.price_eur >= min);
  if (hasMax) data = data.filter(d => d.price_eur <= max);

  return Response.json(data);
}
