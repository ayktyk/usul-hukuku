// Bolum 14: Avrupa Insan Haklari Mahkemesi Basvurulari - Madde 431

import type { DavaTuru } from "@/lib/types";

const aihmBasvurusu: DavaTuru = {
  id: "aihm-bireysel-basvuru",
  maddeNo: 431,
  ad: "AIHS maddeleri (2, 3, 5, 6, 8, 10, Ek-1) ihlalleri ve tazminat (just satisfaction) talepleri",
  kategori: "aihm",
  altKategori: "bireysel-basvuru",
  gorevliMahkeme: {
    mahkeme: "Avrupa Insan Haklari Mahkemesi",
    yasalDayanak: "AHS m.34, AHS m.35, AIHM Ic Tuzugu Rule 47",
    aciklama:
      "Kamu gucu islem ve kararlarina karsi, ic hukuk yollari tuketildikten sonra Avrupa Insan Haklari Mahkemesi'ne bireysel basvuru yapilabilir.",
    ozelDurum:
      "Mahkeme dorduncu derece temyiz mercii degildir; sadece Sozlesme ve ek protokoller kapsamindaki hak ihlallerini inceler.",
  },
  yetkiliMahkeme: {
    genelYetki: "AIHM - Strasbourg",
    kesinYetki: "Avrupa Insan Haklari Mahkemesi",
    kesinYetkiMi: true,
    yasalDayanak: "AHS m.34",
    aciklama:
      "Basvuru dogrudan AIHM'ye yapilir. Tam doldurulmus form ve ekler posta ile Mahkeme'ye gonderilir.",
  },
  harclar: {
    basvuruHarci: 0,
    kararIlamHarci: "maktu",
    aciklama:
      "AIHM basvurusunda mahkeme harci yoktur. Masraf kalemleri esas olarak tercume, posta ve vekillik giderlerinden olusur.",
  },
  masraflar: {
    tebligatMasrafi: 0,
    diger: [
      { ad: "Posta ve kurye giderleri", tutar: 750 },
      { ad: "Tercume ve belge duzenleme", tutar: 2500 },
    ],
    toplamTahmini: 3250,
    aciklama:
      "Mahkeme harci yoktur; ancak basvuru formunun usule uygun hazirlanmasi, tercume ve uluslararasi posta giderleri olusur.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden:
      "Basvuru sahsen yapilabilir. Temsilci ile hareket edilecekse AIHM authority formu veya usule uygun vekalet belgesi sunulmalidir.",
    yasalDayanak: "AIHM Ic Tuzugu Rule 45",
  },
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarasi veya pasaport bilgisi", zorunlu: true },
    { bilgi: "Kesinlesen son ic hukuk kararinin tarihi", zorunlu: true },
    { bilgi: "Ihlal edildigi iddia edilen Sozlesme maddeleri", zorunlu: true },
    { bilgi: "Olay ozeti ve zarar kalemleri", zorunlu: true },
    { bilgi: "Ic hukukta tuketilen basvuru yollarinin listesi", zorunlu: true },
  ],
  gerekliBelgeler: [
    { belge: "AIHM basvuru formu", zorunlu: true, nereden: "echr.coe.int" },
    { belge: "Kesinlesen mahkeme veya idari yargi kararlari", zorunlu: true },
    { belge: "Basvuru sure hesabina esas tebligat/karar tarihleri", zorunlu: true },
    { belge: "Kimlik veya pasaport sureti", zorunlu: true },
    { belge: "Temsilci authority formu (varsa)", zorunlu: false, nereden: "echr.coe.int" },
  ],
  yargilamaUsulu: "ozel",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "AIHM basvurularinda arabuluculuk uygulanmaz.",
  },
  zamanasimi: {
    sure: "4 ay",
    yasalDayanak: "AHS m.35",
    aciklama:
      "Basvuru, nihai ic hukuk kararindan veya etkili bir basvuru yolu yoksa ihlalin ogrenildigi tarihten itibaren 4 ay icinde yapilmalidir.",
    baslangic: "Nihai ic hukuk kararinin kesinlesme veya teblig tarihi",
  },
  pratikNot:
    "Rule 47'deki zorunlu alanlardan biri eksikse basvuru kayda alinmadan reddedilebilir. AIHM sadece ciddi ve acikca temellendirilmis ihlal iddialarini inceler; olaylar kronolojik ve belge referansli kurulmalidir.",
  hmkMaddeleri: [],
  ozelKanunlar: [
    "Avrupa Insan Haklari Sozlesmesi m.34-35",
    "AIHM Ic Tuzugu Rule 45 ve Rule 47",
  ],
};

export const bolum14Aihm: DavaTuru[] = [aihmBasvurusu];
