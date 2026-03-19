import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAltKategorilerByKategori, getDavalarByKategori } from "@/data";
import { KATEGORILER } from "@/data/kategoriler";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KategoriSayfasiProps {
  params: {
    id: string;
  };
}

export default function KategoriSayfasi({ params }: KategoriSayfasiProps) {
  const kategori = KATEGORILER.find((item) => item.id === params.id);

  if (!kategori) {
    notFound();
  }

  const davalar = getDavalarByKategori(kategori.id);
  const altKategoriler = getAltKategorilerByKategori(kategori.id);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Ana Sayfa
      </Link>

      <div className="mb-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold">{kategori.ad}</h1>
          <Badge variant="outline">
            Hazir {davalar.length} / {kategori.toplamDavaSayisi}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{kategori.aciklama}</p>
      </div>

      {davalar.length === 0 ? (
        <div className="rounded-lg border border-dashed border-muted-foreground/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Bu kategori icin veri girisi henuz tamamlanmadi.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {altKategoriler.map((altKategori) => (
            <Card key={altKategori.id}>
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <div>
                  <CardTitle>{altKategori.ad}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Madde {altKategori.davalar[0].maddeNo}-
                    {altKategori.davalar[altKategori.davalar.length - 1].maddeNo}
                  </p>
                </div>
                <Badge variant="secondary">{altKategori.davalar.length} dava</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {altKategori.davalar.map((dava) => (
                  <Link
                    key={dava.id}
                    href={`/dava/${dava.id}`}
                    className="block rounded-lg border border-border/70 px-4 py-3 transition-colors hover:border-foreground/20 hover:bg-muted/40"
                  >
                    <div className="mb-1 text-xs font-medium text-muted-foreground">
                      Madde {dava.maddeNo}
                    </div>
                    <div className="text-sm font-medium leading-6">{dava.ad}</div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Link href="/" className="mt-8 inline-flex">
        <Button variant="outline">Ana Sayfaya Don</Button>
      </Link>
    </main>
  );
}
