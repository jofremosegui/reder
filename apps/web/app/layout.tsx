import "./globals.css";

export const metadata = {
  title: "Reder — MVP",
  description: "Local MVP with mock listings API",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 antialiased
                       dark:from-slate-900 dark:to-slate-950 dark:text-slate-100">
        <header className="sticky top-0 z-10 border-b border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/50 backdrop-blur">
          <div className="container flex items-center justify-between py-3">
            <h1 className="text-xl font-semibold">Reder</h1>
            <span className="text-sm text-slate-500">Local MVP</span>
          </div>
        </header>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
