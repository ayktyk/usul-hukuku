# CLAUDE.md — Türk Usul Hukuku Asistanı (PWA)

> **Proje Sahibi:** Aykut — Dava avukatı, İstanbul  
> **Amaç:** HMK'ya göre görevli/yetkili mahkeme, harçlar, masraflar, özel vekaletname, müvekkilden alınacak bilgi/belge checklist'i sunan Progressive Web App  
> **Deploy:** Vercel  
> **Hedef:** Mobilde ana ekrana eklenebilir PWA

---

## 1. TEKNİK STACK

```
Framework    : Next.js 14 (App Router)
Dil          : TypeScript (strict mode)
Styling      : Tailwind CSS 3.x
UI           : shadcn/ui + Lucide Icons
State        : React Context (basit) veya Zustand (büyürse)
Deploy       : Vercel (vercel.json ile)
PWA          : next-pwa veya @serwist/next
Veri Kaynağı : Statik JSON/TS dosyaları (veritabanı YOK - tüm hukuk verisi kodda)
Test         : Vitest + React Testing Library
Linter       : ESLint + Prettier
```

---

## 2. PROJE MİMARİSİ

```
usul-hukuku-app/
├── CLAUDE.md                          ← Bu dosya
├── .claude/
│   └── settings.json                  ← Proje bazlı hooks
├── public/
│   ├── manifest.json                  ← PWA manifest
│   ├── icons/                         ← PWA ikonları (192x192, 512x512)
│   ├── sw.js                          ← Service Worker
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx                 ← Root layout (meta, PWA head tags)
│   │   ├── page.tsx                   ← Ana sayfa: Dava türü seçici
│   │   ├── sonuc/
│   │   │   └── page.tsx               ← Sonuç ekranı (checklist)
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                        ← shadcn bileşenleri
│   │   ├── DavaTuruSelector.tsx       ← Arama + kategori bazlı dava seçimi
│   │   ├── SonucCard.tsx              ← Görevli mahkeme, yetki vb. kart
│   │   ├── ChecklistPanel.tsx         ← Müvekkil belgeler checklist
│   │   ├── HarcHesaplama.tsx          ← Harç/masraf hesaplama
│   │   ├── VekaletnameBadge.tsx       ← Özel vekaletname gerekli mi?
│   │   └── PWAInstallPrompt.tsx       ← "Ana ekrana ekle" butonu
│   ├── data/
│   │   ├── davaTurleri.ts             ← TÜM dava türleri ana veri dosyası
│   │   ├── gorevliMahkeme.ts          ← Görevli mahkeme kuralları
│   │   ├── yetkiliMahkeme.ts          ← Yetkili mahkeme kuralları
│   │   ├── harclar.ts                 ← Harç tarifeleri ve hesaplama
│   │   ├── masraflar.ts               ← Yargılama giderleri
│   │   ├── ozelVekaletname.ts         ← Özel vekaletname gereken haller
│   │   └── belgeler.ts                ← Dava türüne göre belge listesi
│   ├── lib/
│   │   ├── types.ts                   ← Tüm TypeScript tipleri
│   │   ├── utils.ts                   ← Yardımcı fonksiyonlar
│   │   ├── harcHesapla.ts             ← Harç hesaplama business logic
│   │   └── search.ts                  ← Fuzzy search (dava türü arama)
│   └── hooks/
│       ├── useDavaTuru.ts             ← Seçili dava türü state
│       └── usePWAInstall.ts           ← PWA install prompt hook
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── package.json
└── vitest.config.ts
```

---

## 3. VERİ MODELİ (KRİTİK)

Bu uygulamanın kalbi `src/data/` klasöründedir. Her dava türü için aşağıdaki yapı kullanılır:

```typescript
// src/lib/types.ts

interface DavaTuru {
  id: string;                          // "bosanma-anlasmali", "kira-tespit" vb.
  ad: string;                          // "Anlaşmalı Boşanma Davası"
  kategori: DavaKategorisi;            // "aile" | "is" | "ticaret" | "tuketici" | "kira" | "miras" | "icra" | "sigorta" | "gayrimenkul" | "genel-hukuk"
  altKategori?: string;                // "nafaka", "velayet" vb.
  
  gorevliMahkeme: GorevliMahkeme;
  yetkiliMahkeme: YetkiliMahkeme;
  
  harclar: HarcBilgisi;
  masraflar: MasrafBilgisi;
  
  ozelVekaletname: OzelVekaletnameBilgisi;
  
  muvekkilBilgileri: MuvekkilBilgi[];  // Alınacak bilgiler
  gereliBelgeler: GerekiBelge[];       // Alınacak belgeler
  
  yargilamaUsulu: "yazili" | "basit"; // HMK m.316 vd.
  pilinçNot?: string;                  // Pratik not (avukata hatırlatma)
  hmkMaddeleri: string[];              // İlgili HMK maddeleri
  ozelKanunlar?: string[];             // İlgili özel kanunlar
}

interface GorevliMahkeme {
  mahkeme: string;                     // "Asliye Hukuk Mahkemesi"
  yasal_dayanak: string;               // "HMK m.2, TMK m.118"
  aciklama: string;                    // Kısa açıklama
  ozelDurum?: string;                  // İstisna veya dikkat notu
}

interface YetkiliMahkeme {
  genelYetki: string;                  // "Davalının yerleşim yeri (HMK m.6)"
  ozelYetki?: string[];                // ["Sözleşmenin ifa yeri (HMK m.10)"]
  kesinYetki?: string;                 // Kesin yetki varsa
  kesinYetkiMi: boolean;
  yasal_dayanak: string;
  aciklama: string;
}

interface HarcBilgisi {
  basvuruHarci: number;                // TL cinsinden sabit tutar
  kararHarci: string;                  // "nispi" | "maktu" + açıklama
  nispiOran?: number;                  // Nispi harç oranı (binde)
  pesinHarcOran?: number;              // Peşin harç oranı
  aciklama: string;
  muafiyet?: string;                   // Harçtan muafiyet varsa
}

interface MasrafBilgisi {
  tebligatMasrafi: number;             // Posta/tebligat
  bilirkisiUcreti?: number;            // Tahmini
  kesfUcreti?: number;                 // Tahmini  
  taninTanikUcreti?: number;
  diger?: MasrafKalemi[];
  toplamTahmini: number;               // Yaklaşık toplam
  aciklama: string;
}

interface OzelVekaletnameBilgisi {
  gerekliMi: boolean;
  neden?: string;                      // Neden gerekli
  yasal_dayanak?: string;              // HMK m.74 vb.
  icerik?: string[];                   // Vekaletnamede bulunması gereken özel yetkiler
}

interface MuvekkilBilgi {
  bilgi: string;                       // "T.C. Kimlik No"
  zorunlu: boolean;
  aciklama?: string;
}

interface GerekiBelge {
  belge: string;                       // "Nüfus Kayıt Örneği"
  zorunlu: boolean;
  nereden?: string;                    // "e-Devlet veya Nüfus Müdürlüğü"
  aciklama?: string;
}
```

---

## 4. KAPSANACAK DAVA TÜRLERİ

Aşağıdaki kategoriler ve alt dava türleri MUTLAKA kapsanmalıdır. Her biri için `DavaTuru` tipinde eksiksiz veri girilecek:

### A) AİLE HUKUKU
- Anlaşmalı boşanma (TMK m.166/3)
- Çekişmeli boşanma (TMK m.161-166)
- Nafaka davası (iştirak, yoksulluk, tedbir)
- Velayet davası
- Mal rejimi tasfiyesi
- Soybağının reddi
- Babalık davası
- Evlat edinme

### B) İŞ HUKUKU
- İşe iade davası (İşK m.20)
- Kıdem tazminatı
- İhbar tazminatı
- Fazla mesai alacağı
- Yıllık izin ücreti
- İş kazası tazminatı
- Arabuluculuk dava şartı hatırlatması

### C) TÜKETİCİ HUKUKU
- Ayıplı mal davası
- Ayıplı hizmet davası
- Kredi kartı aidatı iadesi
- Haksız şart iptali
- Tüketici hakem heyeti sonrası itiraz
- Konut/tatil satış sözleşmesi uyuşmazlıkları
- Abonelik sözleşmesi uyuşmazlıkları

### D) KİRA HUKUKU
- Kira tespit davası (TBK m.344)
- Kira uyarlama davası (TBK m.138)
- Tahliye davası (ihtiyaç, temerrüt, süre sonu)
- Kira alacağı davası
- Depozito iadesi

### E) TİCARET HUKUKU
- Fatura alacağı
- İtirazın iptali (ticari)
- Menfi tespit
- İstirdat
- Haksız rekabet
- Şirket ortaklığından çıkarma
- Genel kurul kararı iptali

### F) MİRAS HUKUKU
- Mirasçılık belgesi (veraset ilamı)
- Terekenin tespiti
- Miras taksim davası
- Muris muvazaası
- Vasiyetnamenin iptali
- Tenkis davası
- Mirastan feragat

### G) GAYRİMENKUL HUKUKU
- Tapu iptali ve tescil
- Elatmanın önlenmesi (müdahalenin meni)
- Ecrimisil
- Ortaklığın giderilmesi (izale-i şüyu)
- Kat mülkiyeti uyuşmazlıkları
- Kamulaştırma bedeli artırımı

### H) SİGORTA HUKUKU
- Trafik kazası tazminatı (zorunlu mali sorumluluk)
- Kasko uyuşmazlığı
- DASK davası
- Sigorta tahkim başvurusu
- Rücuen tazminat

### I) İCRA-İFLAS HUKUKU
- İtirazın iptali (İİK m.67)
- İtirazın kaldırılması
- Menfi tespit (İİK m.72)
- İstirdat (İİK m.72)
- Tasarrufun iptali (İİK m.277)
- İstihkak davası

### J) GENEL HUKUK
- Alacak davası (TBK)
- Tazminat davası (haksız fiil)
- Sözleşmenin feshi
- Sebepsiz zenginleşme
- İnternet yoluyla kişilik hakkı ihlali

---

## 5. HMK KURAL REFERANSLARI (VERİ KATMANINA İŞLENECEK)

### Görevli Mahkeme Kuralları
- **Asliye Hukuk:** Genel görevli (HMK m.2) — aksine düzenleme yoksa
- **Sulh Hukuk:** HMK m.4'teki sınırlı sayı (kiralama, ortaklık giderilmesi, kat mülkiyeti, mirasçılık belgesi, çekişmesiz yargı vb.)
- **Aile Mahkemesi:** 4787 sy. Kanun
- **İş Mahkemesi:** 7036 sy. Kanun
- **Tüketici Mahkemesi:** 6502 sy. Kanun m.73
- **Ticaret Mahkemesi:** TTK m.4-5, HMK m.2 ile birlikte
- **İcra Hukuk Mahkemesi:** İİK hükümleri
- **Kadastro Mahkemesi:** 3402 sy. Kanun

### Yetkili Mahkeme Kuralları
- **Genel yetki:** Davalının yerleşim yeri (HMK m.6)
- **Birden fazla davalı:** Birinin yerleşim yeri (HMK m.7)
- **Geçici oturma:** HMK m.8
- **Türkiye'de yerleşim yeri olmayanlar:** HMK m.9
- **Sözleşmeden doğan:** İfa yeri (HMK m.10)
- **Miras davaları:** Mirasbırakanın son yerleşim yeri (HMK m.11) — KESİN YETKİ
- **Taşınmaz davaları:** Taşınmazın bulunduğu yer (HMK m.12) — KESİN YETKİ
- **Şube işlemleri:** Şubenin bulunduğu yer (HMK m.14)
- **Sigorta davaları:** HMK m.15
- **Haksız fiil:** Fiilin işlendiği/zararın doğduğu/davacının yerleşim yeri (HMK m.16)
- **Kesin yetki halleri:** HMK m.12, 14/2, 11 + özel kanunlar

### Yargılama Usulü
- **Yazılı yargılama:** Genel kural (HMK m.118 vd.)
- **Basit yargılama:** HMK m.316-322 (sulh hukuk, iş, tüketici, kira tespit vb.)

### Özel Vekaletname (HMK m.74)
Özel yetki gerektiren haller:
- Sulh olma
- Hakimi reddetme
- Davanın tamamını ıslah
- Yemin teklif etme
- Feragat, kabul, uzlaşma
- Hacizden feragat
- Başkasını tevkil
- Kanun yollarına başvuru
- Başkası adına tebligat alma

---

## 6. UI/UX TASARIM KURALLARI

### Genel Prensipler
- **Mobile-first:** Tüm tasarım telefon ekranı öncelikli
- **Koyu tema:** Varsayılan dark mode (açık tema geçişi opsiyonel)
- **Türkçe:** Tüm arayüz Türkçe, hukuki terimler doğru kullanılacak
- **Hızlı erişim:** Ana sayfada arama + kategori grid, 2 dokunuşta sonuç
- **Offline:** Service worker ile önbellek, internet olmadan da çalışsın

### Ana Sayfa
- Üstte: Arama çubuğu (fuzzy search ile dava türü arama)
- Altında: Kategori kartları (grid layout)
- Her kategori kartında: İkon + isim + dava sayısı
- Kategori seçince: Alt dava türleri listesi açılır

### Sonuç Sayfası (Dava Türü Seçilince)
Sonuç sayfası TEK SAYFA olacak, kaydırmalı (scroll) bölümlerle:

1. **Başlık kartı:** Dava türü adı + kategori badge
2. **Görevli Mahkeme kartı:** Mahkeme adı + yasal dayanak + not
3. **Yetkili Mahkeme kartı:** Genel yetki + özel yetki + kesin yetki uyarısı
4. **Yargılama Usulü:** Yazılı mı basit mi + açıklama
5. **Harçlar kartı:** Başvuru harcı + karar harcı + peşin harç + toplam
6. **Masraflar kartı:** Tebligat + bilirkişi + keşif + toplam tahmini
7. **Özel Vekaletname kartı:** Gerekli mi? + hangi özel yetkiler lazım
8. **Müvekkilden Alınacak Bilgiler:** Checkbox listesi
9. **Gerekli Belgeler:** Checkbox listesi (nereden alınır bilgisi ile)
10. **Pratik Notlar:** Avukata hatırlatmalar

### Tasarım Detayları
- Font: Geist veya Plus Jakarta Sans (başlık) + JetBrains Mono (madde numaraları)
- Renkler: 
  - Background: slate-950
  - Card: slate-900 border slate-800
  - Accent: indigo-500 (kesin yetki uyarısı: amber-500, kritik not: rose-500)
- Animasyon: Framer Motion ile sayfa geçişleri ve kart açılmaları
- Kesin yetki uyarısı: Kırmızı/amber border + ikon ile dikkat çekici
- Checkbox'lar: Tıklanabilir, müvekkil görüşmesinde tek tek işaretlenebilir

### PWA Gereksinimleri
- `manifest.json`: name, short_name, icons, start_url, display: "standalone", theme_color, background_color
- Service Worker: Statik asset önbellekleme
- iOS desteği: apple-touch-icon, apple-mobile-web-app meta tag'leri
- "Ana Ekrana Ekle" prompt bileşeni

---

## 7. KESİN KURALLAR (ASLA TAVİZ VERME)

### Kod Kalitesi
- `any` tipi YASAK — her zaman doğru tip kullan
- `console.log` bırakma — geliştirme bitince temizle
- Her bileşen tek sorumluluk taşısın
- Magic number kullanma, sabit tanımla (`BASVURU_HARCI_2024 = 427.60`)
- Türkçe değişken isimleri YASAK — İngilizce değişken, Türkçe yorum

### Hukuki Doğruluk
- Harç tutarları YILLIK güncellenir — 2024/2025 tarifeleri kullanılacak, güncelleme kolaylığı için tek dosyada tutulacak
- Madde numaraları DOĞRU olmalı — yanlış madde referansı kabul edilemez
- "Kesin yetki" ve "kesin olmayan yetki" ayrımı NET yapılacak
- Arabuluculuk dava şartı olan dava türlerinde MUTLAKA uyarı verilecek
- Görev ve yetki karıştırılMAyacak — ikisi farklı kavramlar

### Git Disiplini
- Test olmadan commit atma
- Commit mesajları Conventional Commits (feat:, fix:, docs:, refactor:)
- Her commit tek bir iş yapmalı

### Güvenlik
- .env dosyasına dokunma
- API key, secret koda girmeyecek
- XSS koruması: dangerouslySetInnerHTML YASAK

---

## 8. ÖNEMLİ KOMUTLAR

```bash
npm run dev          # Geliştirme sunucusu (localhost:3000)
npm run build        # Production build
npm run start        # Production server
npm run test         # Vitest testleri çalıştır
npm run lint         # ESLint kontrol
npm run type-check   # TypeScript tip kontrolü
npx vercel           # Deploy
```

---

## 9. DEPLOY AYARLARI (VERCEL)

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "headers": [
    {
      "source": "/sw.js",
      "headers": [{ "key": "Service-Worker-Allowed", "value": "/" }]
    },
    {
      "source": "/manifest.json",
      "headers": [{ "key": "Content-Type", "value": "application/manifest+json" }]
    }
  ]
}
```

---

## 10. GELİŞTİRME ADIMLARI (SIRALAMA)

1. **Proje kurulumu:** Next.js + TypeScript + Tailwind + shadcn/ui + PWA setup
2. **Veri katmanı:** `src/data/` altındaki tüm dosyalar — ÖNCELİKLE BU YAPILACAK
3. **Tip tanımları:** `src/lib/types.ts` tam ve eksiksiz
4. **Arama motoru:** Fuzzy search ile dava türü arama
5. **Ana sayfa UI:** Kategori grid + arama
6. **Sonuç sayfası UI:** Tüm bilgi kartları
7. **Harç hesaplama:** Dinamik hesaplama (dava değeri girişli)
8. **Checklist:** Tıklanabilir checkbox'lar (localStorage ile persist)
9. **PWA:** manifest + service worker + install prompt
10. **Test:** Kritik fonksiyonlar için unit test
11. **Deploy:** Vercel'e push

---

## 11. VERİ GİRİŞİ ÖRNEĞİ

Aşağıda bir dava türünün tam veri girişi örneği var. TÜM dava türleri bu formatta olacak:

```typescript
// src/data/davaTurleri.ts — ÖRNEK

export const anlasmaliBoşanma: DavaTuru = {
  id: "bosanma-anlasmali",
  ad: "Anlaşmalı Boşanma Davası",
  kategori: "aile",
  altKategori: "boşanma",
  
  gorevliMahkeme: {
    mahkeme: "Aile Mahkemesi",
    yasal_dayanak: "4787 sy. Kanun m.4, TMK m.118",
    aciklama: "Aile hukukundan doğan dava ve işler aile mahkemesinde görülür. Aile mahkemesi bulunmayan yerlerde Asliye Hukuk Mahkemesi aile mahkemesi sıfatıyla bakar.",
  },
  
  yetkiliMahkeme: {
    genelYetki: "Davalının yerleşim yeri (HMK m.6)",
    ozelYetki: [
      "Eşlerden birinin yerleşim yeri (HMK m.6 + TMK m.168)",
      "Eşlerin son 6 aydan beri birlikte oturdukları yer (TMK m.168)"
    ],
    kesinYetkiMi: false,
    yasal_dayanak: "TMK m.168, HMK m.6",
    aciklama: "Boşanma davası, eşlerden birinin yerleşim yerinde veya davadan önce son 6 aydır birlikte oturdukları yer mahkemesinde açılabilir."
  },
  
  harclar: {
    basvuruHarci: 427.60,
    kararHarci: "Maktu",
    aciklama: "Boşanma davaları maktu harca tabidir. Maddi-manevi tazminat ve nafaka talepleri varsa bunlar için ayrıca nispi harç gerekir.",
    muafiyet: undefined
  },
  
  masraflar: {
    tebligatMasrafi: 500,
    bilirkisiUcreti: undefined,
    kesfUcreti: undefined,
    taninTanikUcreti: 200,
    toplamTahmini: 1500,
    aciklama: "Anlaşmalı boşanmada genellikle bilirkişi ve keşif gerekmez."
  },
  
  ozelVekaletname: {
    gerekliMi: true,
    neden: "Boşanma davası şahsa sıkı sıkıya bağlı haklardan olup, sulh, feragat, kabul gibi özel yetkiler gerektirebilir.",
    yasal_dayanak: "HMK m.74",
    icerik: [
      "Boşanma davası açma ve takip etme",
      "Anlaşmalı boşanma protokolü imzalama",
      "Sulh ve uzlaşma",
      "Feragat ve kabul"
    ]
  },
  
  muvekkilBilgileri: [
    { bilgi: "T.C. Kimlik Numarası", zorunlu: true },
    { bilgi: "Yerleşim yeri adresi", zorunlu: true },
    { bilgi: "Evlilik tarihi", zorunlu: true },
    { bilgi: "Müşterek çocuk bilgileri (ad, doğum tarihi)", zorunlu: true },
    { bilgi: "Eşin T.C. Kimlik No ve adresi", zorunlu: true },
    { bilgi: "Mal rejimi tercihi (edinilmiş mallara katılma / mal ayrılığı)", zorunlu: false, aciklama: "Sözleşme varsa" },
    { bilgi: "Nafaka talebi ve miktarı", zorunlu: false },
  ],
  
  gereliBelgeler: [
    { belge: "Nüfus Kayıt Örneği (aile nüfus kaydı)", zorunlu: true, nereden: "e-Devlet → Nüfus ve Vatandaşlık" },
    { belge: "Evlilik Cüzdanı fotokopisi", zorunlu: true },
    { belge: "Anlaşmalı Boşanma Protokolü", zorunlu: true, aciklama: "Her iki eşin imzası ile" },
    { belge: "Kimlik fotokopisi", zorunlu: true },
    { belge: "Tapu/araç ruhsat fotokopileri", zorunlu: false, aciklama: "Mal paylaşımı varsa" },
    { belge: "Gelir belgesi", zorunlu: false, aciklama: "Nafaka talebi varsa" },
  ],
  
  yargilamaUsulu: "yazili",
  pilinçNot: "Anlaşmalı boşanmada evliliğin en az 1 yıl sürmüş olması gerekir (TMK m.166/3). Hakim tarafları bizzat dinler, vekil aracılığıyla yapılamaz. Protokolü hakim uygun bulmalıdır.",
  hmkMaddeleri: ["HMK m.6", "HMK m.74", "HMK m.119", "HMK m.129"],
  ozelKanunlar: ["TMK m.161-166", "TMK m.168", "4787 sy. AİLE MAHKEMELERİ KANUNU"]
};
```

---

## 12. DİKKAT EDİLECEK KRİTİK NOKTALAR

1. **Arabuluculuk dava şartı:** İş, ticaret (ticari alacak) ve tüketici davalarında arabuluculuk dava şartı uyarısı VERİLMELİ
2. **Harç muafiyetleri:** İş mahkemesinde işçi harçtan muaf, tüketici hakem heyetine başvuru parasız vb.
3. **Kesin yetki uyarısı:** Taşınmaz davaları (HMK m.12), miras davaları (HMK m.11), tüzel kişi iç ilişki (HMK m.14/2) — kesin yetki hallerinde KIRMIZI UYARI gösterilecek
4. **Islah:** Dava değerinin sonradan artırılması halinde ek harç gerektiği belirtilecek
5. **Belirsiz alacak:** HMK m.107 belirsiz alacak davası seçeneği varsa belirtilecek
6. **Zamanaşımı:** Her dava türü için zamanaşımı süresi de eklenecek
7. **İhtarname gerekliliği:** Temerrüt gerektiren dava türlerinde belirtilecek

---

## 13. CLAUDE CODE 4 KATMAN ENTEGRASYONU

Bu proje Claude Code ile geliştirilecek. Aşağıdaki 4 katman sistemi KURULU olmalıdır:

### Katman 1: CLAUDE.md (Bu dosya)
- ✅ Bu dosyanın kendisi — proje kökünde
- Claude Code her oturumda bunu okur, projeyi tanır

### Katman 2: Hooks (Proje bazlı)

```json
// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -qE '\\.env|\\.secret|credentials'; then echo 'ENGEL: Hassas dosyaya erişim yasak!' && exit 2; fi"
        }]
      },
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -qE 'rm -rf|sudo rm'; then echo 'TEHLIKE: Bu komut onay gerektiriyor!' && exit 2; fi"
        }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "if echo \"$CLAUDE_FILE_PATHS\" | grep -q '\\.ts'; then npx prettier --write \"$CLAUDE_FILE_PATHS\" 2>/dev/null || true; fi"
        }]
      }
    ]
  }
}
```

### Katman 3: Skills / Commands

Aşağıdaki slash komutları `~/.claude/commands/` altında oluşturulacak:

**`/veri-ekle`** — Yeni dava türü verisi ekleme
```markdown
# /veri-ekle — Yeni Dava Türü Ekle

$ARGUMENTS dava türü için src/data/davaTurleri.ts dosyasına yeni veri ekle.

1. types.ts'deki DavaTuru interface'ine uygun şekilde oluştur
2. gorevliMahkeme, yetkiliMahkeme, harclar, masraflar, ozelVekaletname, belgeler alanlarını EKSIKSIZ doldur
3. HMK madde referanslarını DOĞRU yaz
4. Kesin yetki hallerini kontrol et
5. Arabuluculuk dava şartı varsa belirt
6. Sonuçları Türkçe özetle
```

**`/hukuk-kontrol`** — Hukuki doğruluk kontrolü
```markdown
# /hukuk-kontrol — Hukuki Veri Doğrulama

src/data/ altındaki tüm veri dosyalarını tara:

1. HMK madde numaralarının doğruluğunu kontrol et
2. Görevli mahkeme atamalarının tutarlılığını kontrol et  
3. Kesin yetki halleri doğru işaretlenmiş mi?
4. Harç tutarları güncel mi?
5. Arabuluculuk dava şartı unutulmuş mu?
6. Özel vekaletname gerekliliği doğru mu?
7. Sorunları Türkçe listele, düzeltme öner
```

**`/deploy`** — Vercel deploy
```markdown
# /deploy — Vercel'e güvenli deploy

1. npm run type-check → TypeScript hataları var mı? Varsa DUR.
2. npm run lint → Lint hataları? Kritik olanları düzelt.
3. npm run build → Build alınıyor mu? Hata varsa DUR.
4. Değişiklikleri özetle, deploy edilecek şeyi göster
5. Onay iste
6. git add . && git commit -m "[mesaj]" && git push
7. npx vercel --prod
8. Sonucu rapor et
```

### Katman 4: Global Rules (~/.claude/CLAUDE.md)

```markdown
# Global Claude Code Kuralları — Aykut

## Dil ve İletişim
- Tüm yanıtları Türkçe ver
- Yorumları Türkçe yaz
- Hukuki terimleri doğru kullan

## Kod Kalitesi
- TypeScript: `any` YASAK
- console.log bırakma
- Fonksiyonlar tek sorumluluk taşısın

## Güvenlik
- .env dosyasına dokunma
- Şifre/API key koda yazma

## Git
- Test olmadan commit atma
- Conventional Commits formatı

## Çalışma Stili
- Değişiklik yapmadan önce sor
- Emin olmadığında varsayım yapma, sor
- Her adımda ne yaptığını açıkla
```

---

## 14. PERFORMANS HEDEFLERİ

- Lighthouse PWA skoru: 100
- Lighthouse Performance: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Bundle size: < 200KB (gzipped)
- Tüm sayfalar statik generate edilebilir (SSG)

---

## 15. GELECEKTEKİ OLASI GENİŞLEMELER (ŞİMDİ YAPILMAYACAK)

- [ ] PDF olarak dava checklist indirme
- [ ] Harç hesaplama kalkülatörü (dava değeri girişli dinamik hesaplama)
- [ ] Zamanaşımı takvimi / hatırlatıcı
- [ ] Yargıtay içtihat linkleri
- [ ] Arabuluculuk süreci takip modülü
- [ ] Çoklu dil desteği
- [ ] Backend + kullanıcı hesabı + dava takip
