"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { KategoriGrid } from "@/components/KategoriGrid";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { KATEGORILER } from "@/data/kategoriler";
import { searchDavalar, searchKategoriIds } from "@/lib/search";

export default function AnaSayfa() {
  const [arama, setArama] = useState("");
  const ertelenmisArama = useDeferredValue(arama);

  const filtrelenmisKategoriler = useMemo(() => {
    if (!ertelenmisArama.trim()) return KATEGORILER;

    const kategoriIds = new Set(searchKategoriIds(ertelenmisArama));
    return KATEGORILER.filter((kategori) => kategoriIds.has(kategori.id));
  }, [ertelenmisArama]);

  const davaSonuclari = useMemo(
    () => searchDavalar(ertelenmisArama, 12),
    [ertelenmisArama],
  );

  const aktifAramaVar = ertelenmisArama.trim().length > 0;
  const toplamDavaSayisi = 436;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
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
      </div>

      {aktifAramaVar ? (
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Dava Sonuclari</h2>
                <p className="text-sm text-muted-foreground">
                  &quot;{ertelenmisArama}&quot; icin en ilgili eslesmeler
                </p>
              </div>
              <Badge variant="outline">{davaSonuclari.length} sonuc</Badge>
            </div>

            {davaSonuclari.length > 0 ? (
              <div className="space-y-3">
                {davaSonuclari.map((sonuc) => (
                  <Link key={sonuc.dava.id} href={`/dava/${sonuc.dava.id}`}>
                    <Card className="transition-colors hover:border-foreground/20 hover:bg-muted/30">
                      <CardHeader className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{sonuc.kategoriAdi}</Badge>
                          <Badge variant="secondary">
                            Madde {sonuc.dava.maddeNo}
                          </Badge>
                          <Badge variant="outline">{sonuc.altKategoriAdi}</Badge>
                        </div>
                        <CardTitle className="text-base leading-6">
                          {sonuc.dava.ad}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between gap-3 pt-0 text-sm text-muted-foreground">
                        <span>{sonuc.dava.gorevliMahkeme.mahkeme}</span>
                        <span className="inline-flex items-center gap-1 font-medium text-foreground">
                          Detaya git
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="py-8 text-center text-sm text-muted-foreground">
                  Eslesen dava bulunamadi. Daha genel bir ifade, kategori adi veya
                  madde numarasi deneyin.
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
        <KategoriGrid kategoriler={KATEGORILER} />
      )}

      <p className="mt-12 text-center text-xs text-muted-foreground">
        {toplamDavaSayisi} dava turu &bull; HMK ve ozel kanunlara dayali
      </p>
    </main>
  );
}
