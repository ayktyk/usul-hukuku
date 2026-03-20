// Bolum 15: Yabancilar Hukuku ve Milletlerarasi Ozel Hukuk - Madde 432-433

import type { DavaTuru } from "@/lib/types";
import { BASVURMA_HARCI, TEBLIGAT_MASRAFI } from "./harclar";

const yabancilarIdariVeTasinmaz: DavaTuru = {
  id: "yabancilar-idari-ve-tasinmaz",
  maddeNo: 432,
  ad: "Yabancilarin tasinmaz edinmesi, calisma/oturma izni, sinir disi (deport), iltica basvurulari",
  kategori: "yabancilar-hukuku",
  altKategori: "yabancilar-idare",
  gorevliMahkeme: {
    mahkeme: "Idare Mahkemesi / Asliye Hukuk Mahkemesi",
    yasalDayanak: "6458 sy. K., 6735 sy. K., HMK m.2",
    aciklama:
      "Ikamet izni, calisma izni, sinir disi ve uluslararasi koruma kararlarina karsi idari yargi; yabancilarin tasinmaz edinmesine iliskin ayni hak uyusmazliklarinda adli yargi gorevlidir.",
    ozelDurum:
      "Sinir disi ve uluslararasi koruma kararlarinda idari basvuru ve dava sureleri kisa oldugundan karar tarihi aninda teyit edilmelidir.",
  },
  yetkiliMahkeme: {
    genelYetki: "Islemi yapan idarenin veya tasinmazin bulundugu yer mahkemesi",
    ozelYetki: [
      "Idari islem davalarinda islemi tesis eden idarenin bulundugu yer",
      "Tasinmaz uyusmazliklarinda tasinmazin bulundugu yer",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "2577 sy. K. m.32, HMK m.12",
    aciklama:
      "Yetki, uyusmazligin idari veya adli yargi niteligine gore degisir. Tasinmazin aynina iliskin davalarda tasinmazin bulundugu yer mahkemesi esas alinir.",
  },
  harclar: {
    basvuruHarci: BASVURMA_HARCI,
    kararIlamHarci: "maktu",
    aciklama:
      "Idari yargi ve adli yargi yoluna gore maktu harc ve gider avansi degisir. Tasinmazin aynina iliskin taleplerde nispi unsurlar ayrica dogabilir.",
  },
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
    diger: [
      { ad: "Tercume ve noter onayi", tutar: 1500 },
      { ad: "Ikamet/pasaport belge temini", tutar: 750 },
    ],
    toplamTahmini: 2650,
    aciklama:
      "Yabanci dilde belge, tercume ve kimlik/oturma izni evraklari nedeniyle masraf kalemleri artis gosterebilir.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden:
      "Genel dava vekaletnamesi kural olarak yeterlidir. Tapu devri veya sulh gibi islem yetkileri isteniyorsa ozel yetki eklenmelidir.",
    yasalDayanak: "HMK m.74",
  },
  muvekkilBilgileri: [
    { bilgi: "Pasaport veya yabanci kimlik numarasi", zorunlu: true },
    { bilgi: "Uyruk, ikamet adresi ve iletisim bilgileri", zorunlu: true },
    { bilgi: "Iptali istenen idari islem veya tasinmaz bilgileri", zorunlu: true },
    { bilgi: "Kararin teblig tarihi", zorunlu: true },
    { bilgi: "Turkiye'deki hukuki statunun ozet gecmisi", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Pasaport ve kimlik suretleri", zorunlu: true },
    { belge: "Ikamet/calisma izni veya sinir disi karari", zorunlu: false },
    { belge: "Uluslararasi koruma basvuru evraki", zorunlu: false },
    { belge: "Tapu kaydi ve tasinmaz evraklari", zorunlu: false, nereden: "Tapu Mudurlugu / e-Devlet" },
    { belge: "Yeminli tercume ve apostil belgeleri", zorunlu: false },
  ],
  yargilamaUsulu: "ozel",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Idari nitelikli yabancilar hukuku uyusmazliklarinda arabuluculuk uygulanmaz.",
  },
  zamanasimi: {
    sure: "Cogunlukla 60 gun; bazi yabancilar kararlarinda daha kisa ozel sureler",
    yasalDayanak: "2577 sy. K. m.7, 6458 sy. K.",
    aciklama:
      "Dava suresi idari islemin tebliginden itibaren baslar. Sinir disi ve uluslararasi koruma kararlarinda ozel sureler bulundugundan karar turu ayri teyit edilmelidir.",
    baslangic: "Kararin teblig tarihi",
  },
  pratikNot:
    "Bu baslik altindaki uyusmazliklar tek tip mahkemeye ait degildir. Dava acilmadan once uyusmazligin idari yargi, adli yargi veya tapu-kadastro ekseninde oldugu ayristirilmalidir.",
  hmkMaddeleri: ["HMK m.2", "HMK m.12"],
  ozelKanunlar: ["6458 sy. YUKK", "6735 sy. Uluslararasi Isgucu K.", "2577 sy. IYUK"],
};

const yabanciKararlarTanimaTenfiz: DavaTuru = {
  id: "yabanci-kararlar-tanima-tenfiz-lahey",
  maddeNo: 433,
  ad: "Yabanci mahkeme kararlarinin taninmasi/tenfizi ile Lahey (cocuk iade/nafaka/tebligat) davalari",
  kategori: "yabancilar-hukuku",
  altKategori: "tanima-tenfiz-lahey",
  gorevliMahkeme: {
    mahkeme: "Asliye Hukuk Mahkemesi / Aile Mahkemesi",
    yasalDayanak: "5718 sy. K. m.50-60, 5717 sy. K.",
    aciklama:
      "Yabanci mahkeme kararlarinin tanima ve tenfizinde genel gorev asliye hukuk mahkemesindedir. Aile hukukuna iliskin kararlar ve cocuk iadesi sureclerinde aile mahkemesi gorevli olabilir.",
    ozelDurum:
      "Lahey cocuk iadesi basvurularinda merkezi makam ve aile mahkemesi sureci birlikte isler; gecikme ciddi hak kaybi dogurabilir.",
  },
  yetkiliMahkeme: {
    genelYetki: "Karsi tarafin Turkiye'deki yerlesim yeri mahkemesi",
    ozelYetki: [
      "Yerlesim yeri yoksa sakin oldugu yer",
      "Bunlar da yoksa Ankara, Istanbul veya Izmir mahkemeleri",
    ],
    kesinYetkiMi: false,
    yasalDayanak: "5718 sy. K. m.51",
    aciklama:
      "Yabanci mahkeme kararlarinin tanima ve tenfizinde MOHUK'taki ozel yetki kurali uygulanir.",
  },
  harclar: {
    basvuruHarci: BASVURMA_HARCI,
    kararIlamHarci: "maktu",
    aciklama: "Tanima, tenfiz ve Lahey sozlesmesi kapsamindaki taleplerde maktu harc esastir.",
  },
  masraflar: {
    tebligatMasrafi: TEBLIGAT_MASRAFI * 2,
    diger: [
      { ad: "Tercume ve apostil", tutar: 2500 },
      { ad: "Yabanci karar kesinlesme evraki", tutar: 1000 },
    ],
    toplamTahmini: 3900,
    aciklama:
      "En kritik masraf kalemi tercume, apostil ve yabanci karar kesinlesme zincirinin kurulmasidir.",
  },
  ozelVekaletname: {
    gerekliMi: false,
    neden:
      "Genel dava vekaletnamesi yeterlidir; ancak sulh, feragat ve tahsil gibi islem yetkileri ayrica yazilmalidir.",
    yasalDayanak: "HMK m.74",
  },
  muvekkilBilgileri: [
    { bilgi: "Taraflarin kimlik ve adres bilgileri", zorunlu: true },
    { bilgi: "Yabanci kararin mahkeme, tarih ve sayisi", zorunlu: true },
    { bilgi: "Kararin kesinlesme tarihi", zorunlu: true },
    { bilgi: "Tenfizi istenen hukum kalemleri", zorunlu: true },
    { bilgi: "Cocuk iadesi/nafaka/tebligat ise somut ulke ve sozlesme bilgisi", zorunlu: false },
  ],
  gerekliBelgeler: [
    { belge: "Yabanci mahkeme kararinin onayli ornegi", zorunlu: true },
    { belge: "Kesinlesme serhi veya buna denk belge", zorunlu: true },
    { belge: "Apostil veya konsolosluk tasdiki", zorunlu: false },
    { belge: "Yeminli Turkce tercume", zorunlu: true },
    { belge: "Lahey sozlesmesi basvuru evraki (varsa)", zorunlu: false },
  ],
  yargilamaUsulu: "ozel",
  arabuluculuk: {
    davaSarti: false,
    ihtiyari: false,
    aciklama: "Tanima, tenfiz ve cocuk iadesi sureclerinde arabuluculuk dava sarti degildir.",
  },
  pratikNot:
    "Taninma ve tenfizde en sik sorun kesinlesme serhi, apostil ve tercume zincirinin eksik kurulmasidir. Cocuk iadesi dosyalarinda hiz, gecici koruma ve ulke raporlari kritik rol oynar.",
  hmkMaddeleri: [],
  ozelKanunlar: ["5718 sy. MOHUK", "5717 sy. K.", "Ilgili Lahey Sozlesmeleri"],
};

export const bolum15Yabancilar: DavaTuru[] = [
  yabancilarIdariVeTasinmaz,
  yabanciKararlarTanimaTenfiz,
];
