// Tüm TypeScript tip tanımları — Türk Usul Hukuku PWA

/** 16 ana kategori — davaturleri.txt bölümlerine karşılık gelir */
export type DavaKategorisi =
  | "asliye-hukuk"
  | "sulh-hukuk"
  | "is-mahkemesi"
  | "aile-mahkemesi"
  | "tuketici-mahkemesi"
  | "ticaret-mahkemesi"
  | "icra-mahkemesi"
  | "idari-yargi"
  | "fikri-sinai"
  | "ceza-mahkemesi"
  | "arabuluculuk-tahkim"
  | "kadastro"
  | "anayasa-mahkemesi"
  | "aihm"
  | "yabancilar-hukuku"
  | "noter-diger";

/** Alt kategori tanımı */
export interface AltKategori {
  id: string;
  ad: string;
  davalar: DavaTuru[];
}

/** Kategori tanımı — ana menüde gösterilecek */
export interface Kategori {
  id: DavaKategorisi;
  ad: string;
  aciklama: string;
  ikon: string; // Lucide icon adı
  renk: string; // Tailwind renk sınıfı
  altKategoriler: AltKategori[];
}

/** Tek bir dava türünün tam veri yapısı */
export interface DavaTuru {
  id: string;
  maddeNo: number; // davaturleri.txt'deki sıra numarası (1-436)
  ad: string;
  kategori: DavaKategorisi;
  altKategori: string;

  gorevliMahkeme: GorevliMahkeme;
  yetkiliMahkeme: YetkiliMahkeme;

  harclar: HarcBilgisi;
  masraflar: MasrafBilgisi;

  ozelVekaletname: OzelVekaletnameBilgisi;

  muvekkilBilgileri: MuvekkilBilgi[];
  gerekliBelgeler: GerekiliBelge[];

  yargilamaUsulu: YargilamaUsulu;
  arabuluculuk: ArabuluculukBilgisi;
  zamanasimi?: ZamanasimiBilgisi;

  pratikNot?: string;
  hmkMaddeleri: string[];
  ozelKanunlar?: string[];
}

/** Görevli mahkeme bilgisi */
export interface GorevliMahkeme {
  mahkeme: string;
  yasalDayanak: string;
  aciklama: string;
  ozelDurum?: string;
}

/** Yetkili mahkeme bilgisi */
export interface YetkiliMahkeme {
  genelYetki: string;
  ozelYetki?: string[];
  kesinYetki?: string;
  kesinYetkiMi: boolean;
  yasalDayanak: string;
  aciklama: string;
}

/** Harç bilgisi */
export interface HarcBilgisi {
  basvuruHarci: number;
  kararIlamHarci: KararHarciTuru;
  nispiOran?: number; // Binde cinsinden
  pesinHarcOran?: number;
  aciklama: string;
  muafiyet?: string;
}

export type KararHarciTuru = "maktu" | "nispi";

/** Masraf bilgisi */
export interface MasrafBilgisi {
  tebligatMasrafi: number;
  bilirkisiUcreti?: number;
  kesfUcreti?: number;
  tanikUcreti?: number;
  diger?: MasrafKalemi[];
  toplamTahmini: number;
  aciklama: string;
}

export interface MasrafKalemi {
  ad: string;
  tutar: number;
}

/** Özel vekaletname bilgisi */
export interface OzelVekaletnameBilgisi {
  gerekliMi: boolean;
  neden?: string;
  yasalDayanak?: string;
  icerik?: string[];
}

/** Müvekkilden alınacak bilgi */
export interface MuvekkilBilgi {
  bilgi: string;
  zorunlu: boolean;
  aciklama?: string;
}

/** Gerekli belge */
export interface GerekiliBelge {
  belge: string;
  zorunlu: boolean;
  nereden?: string;
  aciklama?: string;
}

/** Yargılama usulü */
export type YargilamaUsulu = "yazili" | "basit" | "ozel";

/** Arabuluculuk bilgisi */
export interface ArabuluculukBilgisi {
  davaSarti: boolean;
  ihtiyari: boolean;
  yasalDayanak?: string;
  aciklama?: string;
}

/** Zamanaşımı bilgisi */
export interface ZamanasimiBilgisi {
  sure: string;
  yasalDayanak: string;
  aciklama?: string;
  baslangic?: string; // Sürenin başlangıç anı
}
