import type { HarcBilgisi } from "@/lib/types";
import {
  MAKTU_KARAR_ILAM_HARCI,
  PESIN_HARC_CARPANI,
} from "@/data/harclar";

export interface HarcHesapOzeti {
  basvuruHarci: number;
  kararIlamHarciTuru: "maktu" | "nispi";
  kararIlamHarciTutari: number;
  pesinHarcTutari: number;
  toplamAcilisMaliyeti: number;
  davaDegeri?: number;
  nispiOran?: number;
}

export function hesaplaHarcOzeti(
  harclar: HarcBilgisi,
  davaDegeri?: number,
): HarcHesapOzeti {
  if (harclar.kararIlamHarci === "maktu") {
    return {
      basvuruHarci: harclar.basvuruHarci,
      kararIlamHarciTuru: "maktu",
      kararIlamHarciTutari: MAKTU_KARAR_ILAM_HARCI,
      pesinHarcTutari: MAKTU_KARAR_ILAM_HARCI,
      toplamAcilisMaliyeti: harclar.basvuruHarci + MAKTU_KARAR_ILAM_HARCI,
    };
  }

  const gecerliDavaDegeri =
    typeof davaDegeri === "number" && Number.isFinite(davaDegeri) && davaDegeri > 0
      ? davaDegeri
      : 0;

  const oran =
    typeof harclar.nispiOran === "number" && Number.isFinite(harclar.nispiOran)
      ? harclar.nispiOran / 1000
      : 0;

  const kararIlamHarciTutari = gecerliDavaDegeri * oran;
  const pesinOran = harclar.pesinHarcOran ?? PESIN_HARC_CARPANI;
  const pesinHarcTutari = kararIlamHarciTutari * pesinOran;

  return {
    basvuruHarci: harclar.basvuruHarci,
    kararIlamHarciTuru: "nispi",
    kararIlamHarciTutari,
    pesinHarcTutari,
    toplamAcilisMaliyeti: harclar.basvuruHarci + pesinHarcTutari,
    davaDegeri: gecerliDavaDegeri || undefined,
    nispiOran: harclar.nispiOran,
  };
}
