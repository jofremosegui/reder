'use client';

import { useEffect, useState } from 'react';

type Listing = {
  id: number;
  title: string;
  price_eur: number;
  city: string;
  url: string;
};

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [q, setQ] = useState('');
  const [city, setCity] = useState('');
  const [min, setMin] = useState<string>('');
  const [max, setMax] = useState<string>('');

  const fetchListings = async (params?: URLSearchParams) => {
    const url = params ? `/api/listings?${params.toString()}` : '/api/listings';
    const res = await fetch(url);
    setListings(await res.json());
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const search = () => {
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    if (city) p.set('city', city);
    if (min) p.set('min_price', min);
    if (max) p.set('max_price', max);
    fetchListings(p);
  };

  return (
    <main style={{ maxWidth: 960, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ margin: 0 }}>Reder — Local MVP</h1>
      <p style={{ marginTop: 6, color: '#555' }}>
        Type a query and hit “Search”. This uses a built-in mock API at <code>/api/listings</code>.
      </p>

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr 1fr 1fr auto', alignItems: 'center', marginTop: 16 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search title…" />
        <input value={city} onChange={e => setCity(e.target.value)} placeholder="City (e.g. Barcelona)" />
        <input value={min} onChange={e => setMin(e.target.value)} placeholder="Min €" inputMode="numeric" />
        <input value={max} onChange={e => setMax(e.target.value)} placeholder="Max €" inputMode="numeric" />
        <button onClick={search}>Search</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
        {listings.map(l => (
          <li key={l.id} style={{ padding: 12, border: '1px solid #eee', borderRadius: 8, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <strong>{l.title}</strong>
                <div style={{ color: '#666' }}>{l.city}</div>
              </div>
              <div style={{ fontWeight: 600 }}>{l.price_eur.toLocaleString()} €/mo</div>
            </div>
            {l.url && (
              <div style={{ marginTop: 6 }}>
                <a href={l.url} target="_blank" rel="noreferrer">View source</a>
              </div>
            )}
          </li>
        ))}
        {listings.length === 0 && <li style={{ color: '#777' }}>No results.</li>}
      </ul>
    </main>
  );
}
