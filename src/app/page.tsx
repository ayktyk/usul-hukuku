"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { KATEGORILER } from "@/data/kategoriler";
import { KategoriGrid } from "@/components/KategoriGrid";

export default function AnaSayfa() {
  const [arama, setArama] = useState("");

  const filtrelenmisKategoriler = useMemo(() => {
    if (!arama.trim()) return KATEGORILER;
    const q = arama.toLowerCase();
    return KATEGORILER.filter(
      (k) =>
        k.ad.toLowerCase().includes(q) ||
        k.aciklama.toLowerCase().includes(q),
    );
  }, [arama]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      {/* Baslik */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Usul Hukuku Rehberi
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dava turunu sec — gorevli mahkeme, harclar ve belge checklist&apos;ine
          ulasimin
        </p>
      </div>

      {/* Arama */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Dava turu veya kategori ara..."
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Kategori Grid */}
      <KategoriGrid kategoriler={filtrelenmisKategoriler} />

      {/* Alt bilgi */}
      <p className="mt-12 text-center text-xs text-muted-foreground">
        436+ dava turu &bull; HMK ve ozel kanunlara dayali
      </p>
    </main>
  );
}
