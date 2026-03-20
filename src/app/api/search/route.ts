import { searchDavalarWithOptions, searchKategoriIdsWithOptions, type SearchMode } from "@/lib/search";
import type { DavaKategorisi } from "@/lib/types";

const SEARCH_MODES: SearchMode[] = ["all", "title", "article"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const kategori = searchParams.get("kategori")?.trim() as DavaKategorisi | null;
  const modeParam = searchParams.get("mode")?.trim() as SearchMode | null;
  const mode = modeParam && SEARCH_MODES.includes(modeParam) ? modeParam : "all";

  if (!query) {
    return Response.json({
      davaSonuclari: [],
      kategoriIds: kategori ? [kategori] : [],
    });
  }

  const davaSonuclari = searchDavalarWithOptions(
    query,
    {
      kategori: kategori ?? undefined,
      mode,
    },
    12,
  ).map((sonuc) => ({
    id: sonuc.dava.id,
    ad: sonuc.dava.ad,
    maddeNo: sonuc.dava.maddeNo,
    kategoriAdi: sonuc.kategoriAdi,
    altKategoriAdi: sonuc.altKategoriAdi,
    gorevliMahkeme: sonuc.dava.gorevliMahkeme.mahkeme,
  }));

  return Response.json({
    davaSonuclari,
    kategoriIds: searchKategoriIdsWithOptions(query, {
      kategori: kategori ?? undefined,
      mode,
    }),
  });
}
