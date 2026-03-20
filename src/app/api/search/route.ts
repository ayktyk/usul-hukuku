import { searchDavalar, searchKategoriIds } from "@/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return Response.json({
      davaSonuclari: [],
      kategoriIds: [],
    });
  }

  const davaSonuclari = searchDavalar(query, 12).map((sonuc) => ({
    id: sonuc.dava.id,
    ad: sonuc.dava.ad,
    maddeNo: sonuc.dava.maddeNo,
    kategoriAdi: sonuc.kategoriAdi,
    altKategoriAdi: sonuc.altKategoriAdi,
    gorevliMahkeme: sonuc.dava.gorevliMahkeme.mahkeme,
  }));

  return Response.json({
    davaSonuclari,
    kategoriIds: searchKategoriIds(query),
  });
}
