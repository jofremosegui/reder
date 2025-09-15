"use client";
import { useState } from "react";

export default function ContactForm({ listingId, listerName, listerEmail, listerPhone }:
  { listingId: number; listerName?: string|null; listerEmail?: string|null; listerPhone?: string|null; }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOk(null); setErr(null); setBusy(true);
    try {
      const res = await fetch(`/api/listings/${listingId}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: msg }),
      });
      if (!res.ok) throw new Error(await res.text());
      setOk("Missatge enviat! Et respondrem aviat.");
      setName(""); setEmail(""); setMsg("");
    } catch (e: any) {
      setErr(e.message || "Error en enviar el missatge");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm text-slate-600 dark:text-slate-300">
        {listerName ? <>Contacta amb <b>{listerName}</b></> : "Contacta amb el llogador"}
        {listerEmail ? <> · <span className="text-slate-500">{listerEmail}</span></> : null}
        {listerPhone ? <> · <span className="text-slate-500">{listerPhone}</span></> : null}
      </div>

      <form onSubmit={submit} className="space-y-2">
        <input
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-900"
          placeholder="El teu nom" value={name} onChange={e=>setName(e.target.value)} required
        />
        <input
          type="email"
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-900"
          placeholder="El teu email" value={email} onChange={e=>setEmail(e.target.value)} required
        />
        <textarea
          rows={4}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-900"
          placeholder="Missatge" value={msg} onChange={e=>setMsg(e.target.value)} required
        />
        <button
          type="submit" disabled={busy}
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900"
        >
          {busy ? "Enviant…" : "Enviar missatge"}
        </button>
      </form>

      {ok && <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">{ok}</div>}
      {err && <div className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-900/30 dark:text-rose-200">{err}</div>}
    </div>
  );
}
