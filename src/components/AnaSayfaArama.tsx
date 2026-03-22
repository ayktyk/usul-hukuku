"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { KategoriGrid } from "@/components/KategoriGrid";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useSearch";
import type { SearchMode } from "@/hooks/useSearch";
import type { KategoriTanimi } from "@/data/kategoriler";
import type { DavaKategorisi } from "@/lib/types";

const HIZLI_ARAMALAR = ["AYM", "AIHM", "SGK", "ZMSS", "HAGB", "ise iade"];

const ARAMA_MODLARI: Array<{ id: SearchMode; label: string }> = [
  { id: "all", label: "Tum alanlar" },
  { id: "title", label: "Sadece dava adi" },
  { id: "article", label: "Sadece madde no" },
];

interface AnaSayfaAramaProps {
  kategoriler: KategoriTanimi[];
  toplamDavaSayisi: number;
}

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export function AnaSayfaArama({
  kategoriler,
  toplamDavaSayisi,
}: AnaSayfaAramaProps) {
  const [arama, setArama] = useState("");
  const [seciliKategori, setSeciliKategori] = useState<DavaKategorisi | null>(null);
  const [aramaModu, setAramaModu] = useState<SearchMode>("all");

  const { sonuclar, yukleniyor, aramaAktif, deferredQuery } = useSearch(arama, {
    mode: aramaModu,
    kategori: seciliKategori,
  });

  const filtrelenmisKategoriler = useMemo(() => {
    if (seciliKategori && !aramaAktif) {
      return kategoriler.filter((kategori) => kategori.id === seciliKategori);
    }

    if (!aramaAktif) return kategoriler;

    const kategoriIdSet = new Set(sonuclar.kategoriIds);
    return kategoriler.filter((kategori) => kategoriIdSet.has(kategori.id));
  }, [aramaAktif, kategoriler, seciliKategori, sonuclar.kategoriIds]);

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Usul Hukuku Rehberi
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          16 kategori ve {toplamDavaSayisi} dava turu icinde gorevli mahkeme,
          harclar ve belge checklist&apos;ine hizli erisim
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Dava turu, madde no veya kategori ara..."
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          className="pl-10"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {HIZLI_ARAMALAR.map((terim) => (
            <button
              key={terim}
              type="button"
              onClick={() => setArama(terim)}
              className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-muted hover:text-foreground"
            >
              {terim}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Arama modu
            </p>
            <div className="flex flex-wrap gap-2">
              {ARAMA_MODLARI.map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setAramaModu(mod.id)}
                  className={
                    aramaModu === mod.id
                      ? "rounded-full border border-foreground bg-foreground px-3 py-1 text-xs text-background"
                      : "rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-muted hover:text-foreground"
                  }
                >
                  {mod.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Kategori filtresi
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSeciliKategori(null)}
                className={
                  seciliKategori === null
                    ? "rounded-full border border-foreground bg-foreground px-3 py-1 text-xs text-background"
                    : "rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-muted hover:text-foreground"
                }
              >
                Tum kategoriler
              </button>
              {kategoriler.map((kategori) => (
                <button
                  key={kategori.id}
                  type="button"
                  onClick={() => setSeciliKategori(kategori.id)}
                  className={
                    seciliKategori === kategori.id
                      ? "rounded-full border border-foreground bg-foreground px-3 py-1 text-xs text-background"
                      : "rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-muted hover:text-foreground"
                  }
                >
                  {kategori.ad}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {aramaAktif ? (
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Dava Sonuclari</h2>
                <p className="text-sm text-muted-foreground">
                  &quot;{deferredQuery}&quot; icin en ilgili eslesmeler
                </p>
              </div>
              <Badge variant="outline">
                {yukleniyor ? "Araniyor" : `${sonuclar.davaSonuclari.length} sonuc`}
              </Badge>
            </div>

            {sonuclar.davaSonuclari.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-3"
              >
                {sonuclar.davaSonuclari.map((sonuc) => (
                  <motion.div key={sonuc.id} variants={itemVariants}>
                    <Link href={`/dava/${sonuc.id}`}>
                      <Card className="transition-colors hover:border-foreground/20 hover:bg-muted/30">
                        <CardHeader className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{sonuc.kategoriAdi}</Badge>
                            <Badge variant="secondary">
                              Madde {sonuc.maddeNo}
                            </Badge>
                            <Badge variant="outline">{sonuc.altKategoriAdi}</Badge>
                          </div>
                          <CardTitle className="text-base leading-6">
                            {sonuc.ad}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between gap-3 pt-0 text-sm text-muted-foreground">
                          <span>{sonuc.gorevliMahkeme}</span>
                          <span className="inline-flex items-center gap-1 font-medium text-foreground">
                            Detaya git
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
                <Card className="border-dashed">
                  <CardContent className="py-8 text-center text-sm text-muted-foreground">
                    {yukleniyor
                      ? "Arama sonuclari hazirlaniyor."
                      : "Eslesen dava bulunamadi. Kategori filtresini kaldirin veya farkli bir ifade deneyin."}
                  </CardContent>
                </Card>
            )}
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Eslesen Kategoriler</h2>
              <p className="text-sm text-muted-foreground">
                Arama ile iliskili kategori kisayollari
              </p>
            </div>
            {filtrelenmisKategoriler.length > 0 ? (
              <KategoriGrid kategoriler={filtrelenmisKategoriler} />
            ) : (
              <Card className="border-dashed">
                <CardContent className="py-8 text-center text-sm text-muted-foreground">
                  Bu arama icin eslesen kategori bulunamadi.
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      ) : (
        <KategoriGrid kategoriler={filtrelenmisKategoriler} />
      )}

      <p className="mt-12 text-center text-xs text-muted-foreground">
        {toplamDavaSayisi} dava turu &bull; HMK ve ozel kanunlara dayali
      </p>
    </>
  );
}
