import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAltKategoriLabel, getDavaById } from "@/data";
import { HarcHesaplamaPanel } from "@/components/HarcHesaplamaPanel";
import { ChecklistPanel } from "@/components/ChecklistPanel";
import { KesinYetkiUyari } from "@/components/KesinYetkiUyari";
import { ArabuluculukUyari } from "@/components/ArabuluculukUyari";
import { VekaletnameBadge } from "@/components/VekaletnameBadge";
import { KATEGORILER } from "@/data/kategoriler";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPara } from "@/lib/utils";

interface DavaDetaySayfasiProps {
  params: {
    id: string;
  };
}

export default function DavaDetaySayfasi({ params }: DavaDetaySayfasiProps) {
  const dava = getDavaById(params.id);

  if (!dava) {
    notFound();
  }

  const kategori = KATEGORILER.find((item) => item.id === dava.kategori);
  const altKategoriAdi = getAltKategoriLabel(dava.kategori, dava.altKategori);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href={`/kategori/${dava.kategori}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {kategori?.ad ?? "Kategori"} sayfasina don
      </Link>

      <Card className="mb-6">
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {kategori ? <Badge variant="outline">{kategori.ad}</Badge> : null}
            <Badge variant="secondary">Madde {dava.maddeNo}</Badge>
            <Badge variant="outline">{altKategoriAdi}</Badge>
          </div>
          <div>
            <CardTitle className="text-xl sm:text-2xl">{dava.ad}</CardTitle>
            {dava.pratikNot ? (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {dava.pratikNot}
              </p>
            ) : null}
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gorevli Mahkeme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium">{dava.gorevliMahkeme.mahkeme}</p>
            <p className="text-muted-foreground">{dava.gorevliMahkeme.aciklama}</p>
            <Badge variant="outline">{dava.gorevliMahkeme.yasalDayanak}</Badge>
            {dava.gorevliMahkeme.ozelDurum ? (
              <p className="text-muted-foreground">{dava.gorevliMahkeme.ozelDurum}</p>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Yetkili Mahkeme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium">{dava.yetkiliMahkeme.genelYetki}</p>
            {dava.yetkiliMahkeme.ozelYetki?.length ? (
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                {dava.yetkiliMahkeme.ozelYetki.map((yetki) => (
                  <li key={yetki}>{yetki}</li>
                ))}
              </ul>
            ) : null}
            {dava.yetkiliMahkeme.kesinYetki && !dava.yetkiliMahkeme.kesinYetkiMi ? (
              <Badge variant="outline">
                {dava.yetkiliMahkeme.kesinYetki}
              </Badge>
            ) : null}
            <p className="text-muted-foreground">{dava.yetkiliMahkeme.aciklama}</p>
            <KesinYetkiUyari yetkiliMahkeme={dava.yetkiliMahkeme} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Yargilama ve Arabuluculuk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ArabuluculukUyari arabuluculuk={dava.arabuluculuk} />
            <div>
              <p className="font-medium">Yargilama usulu</p>
              <p className="text-muted-foreground">{formatUsul(dava.yargilamaUsulu)}</p>
            </div>
            <div>
              <p className="font-medium">Arabuluculuk</p>
              <p className="text-muted-foreground">
                {dava.arabuluculuk.davaSarti
                  ? "Dava sarti olarak zorunlu"
                  : dava.arabuluculuk.ihtiyari
                    ? "Ihtiyari"
                    : "Uygulanmaz"}
              </p>
              {dava.arabuluculuk.yasalDayanak ? (
                <Badge variant="outline">{dava.arabuluculuk.yasalDayanak}</Badge>
              ) : null}
              {!dava.arabuluculuk.davaSarti && dava.arabuluculuk.aciklama ? (
                <p className="mt-2 text-muted-foreground">{dava.arabuluculuk.aciklama}</p>
              ) : null}
            </div>
            {dava.zamanasimi ? (
              <div>
                <p className="font-medium">Zamanasimi / hak dusurucu sure</p>
                <p className="text-muted-foreground">{dava.zamanasimi.sure}</p>
                <p className="mt-1 text-muted-foreground">{dava.zamanasimi.yasalDayanak}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Harc ve Masraf</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <HarcHesaplamaPanel harclar={dava.harclar} />
            <div>
              <p className="font-medium">Tahmini yargilama gideri</p>
              <p className="text-muted-foreground">
                {formatPara(dava.masraflar.toplamTahmini)}
              </p>
              <p className="mt-1 text-muted-foreground">{dava.masraflar.aciklama}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Ozel Vekaletname</CardTitle>
          </CardHeader>
          <CardContent>
            <VekaletnameBadge bilgi={dava.ozelVekaletname} />
          </CardContent>
        </Card>

        <ChecklistPanel
          davaId={dava.id}
          muvekkilBilgileri={dava.muvekkilBilgileri}
          gerekliBelgeler={dava.gerekliBelgeler}
        />

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Mevzuat Referanslari</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium">HMK maddeleri</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {dava.hmkMaddeleri.map((madde) => (
                  <Badge key={madde} variant="outline">
                    {madde}
                  </Badge>
                ))}
              </div>
            </div>
            {dava.ozelKanunlar?.length ? (
              <div>
                <p className="font-medium">Ozel kanunlar</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {dava.ozelKanunlar.map((kanun) => (
                    <Badge key={kanun} variant="outline">
                      {kanun}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function formatUsul(usul: "yazili" | "basit" | "ozel") {
  if (usul === "yazili") return "Yazili yargilama usulu";
  if (usul === "basit") return "Basit yargilama usulu";
  return "Ozel usul";
}
