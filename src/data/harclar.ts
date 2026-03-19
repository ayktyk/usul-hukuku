// Harç ve masraf sabitleri — yıllık güncelleme bu dosyadan yapılır
// Kaynak: Harçlar Kanunu (492 sy.) ekli tarifeler + yıllık Genel Tebliğ
// Son güncelleme: 2025

export const HARC_YILI = 2025;
export const SON_GUNCELLEME = "2025-01-01";

// --- Yargı Harçları (1 sayılı tarife) ---

/** Başvurma harcı — maktu (her dava türü için aynı) */
export const BASVURMA_HARCI = 427.60;

/** Nispi harç oranı — binde 68,31 */
export const NISPI_HARC_ORANI = 0.06831;

/** Peşin harç çarpanı — nispi harcın 1/4'ü dava açılırken ödenir */
export const PESIN_HARC_CARPANI = 0.25;

/** Maktu karar ve ilam harcı */
export const MAKTU_KARAR_ILAM_HARCI = 427.60;

/** Vekalet suret harcı */
export const VEKALET_SURET_HARCI = 65.40;

// --- Masraf Sabitleri (tahmini) ---

/** Tebligat masrafı (posta ile) — tek tebligat */
export const TEBLIGAT_MASRAFI = 200;

/** Gider avansı — tahmini taban */
export const GIDER_AVANSI_TABAN = 450;

/** Tanık ücreti (kişi başı tahmini) */
export const TANIK_UCRETI = 100;

/** Bilirkişi ücreti (tahmini) */
export const BILIRKISI_UCRETI = 3000;

/** Keşif ücreti (tahmini) */
export const KESF_UCRETI = 4000;

// --- Parasal Sınırlar ---

/** Tüketici hakem heyeti zorunlu başvuru sınırı (6502 m.68) */
export const TUKETICI_HAKEM_SINIRI = 104_000;

/** TTK m.4/2 basit yargılama usulü sınırı */
export const TICARI_BASIT_YARGILAMA_SINIRI = 1_500_000;

// --- Muafiyet Bilgileri ---

/** İş mahkemesinde işçi harçtan muaf mı? */
export const IS_MAHKEMESI_ISCI_HARC_MUAF = true;

/** SGK aleyhine açılan davalarda harç muafiyeti */
export const SGK_HARC_MUAF = true;

// --- Yardımcı Fonksiyonlar ---

/** Nispi harç hesapla */
export function nispiHarcHesapla(davaDigeri: number): number {
  return davaDigeri * NISPI_HARC_ORANI;
}

/** Peşin harç hesapla */
export function pesinHarcHesapla(davaDigeri: number): number {
  return nispiHarcHesapla(davaDigeri) * PESIN_HARC_CARPANI;
}

/** Toplam açılış masrafı hesapla (başvurma + peşin harç) */
export function acilisHarciHesapla(davaDigeri: number, nispiMi: boolean): number {
  if (nispiMi) {
    return BASVURMA_HARCI + pesinHarcHesapla(davaDigeri);
  }
  return BASVURMA_HARCI + MAKTU_KARAR_ILAM_HARCI;
}
