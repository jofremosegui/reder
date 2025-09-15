import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const listingId = Number(params.id);
    if (Number.isNaN(listingId)) return new Response("Bad id", { status: 400 });

    const { name, email, message } = await req.json();
    if (!name || !email || !message) return new Response("Missing fields", { status: 400 });

    // ensure listing exists
    const exists = await prisma.listing.findUnique({ where: { id: listingId }, select: { id: true } });
    if (!exists) return new Response("Not found", { status: 404 });

    await prisma.contactMessage.create({
      data: { listingId, senderName: name, senderEmail: email, message },
    });

    // You could try to email here if SMTP envs exist (skipped for MVP)
    return Response.json({ ok: true });
  } catch (e) {
    console.error("contact POST error", e);
    return new Response("Server error", { status: 500 });
  }
}
