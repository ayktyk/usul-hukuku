# PLAN.md — Türk Usul Hukuku PWA Geliştirme Planı

> **Toplam Kapsam:** 16 bölüm, 436+ hukuki uyuşmazlık/dava türü
> **Kaynak:** `davaturleri.txt` (40 yıllık avukatlık tecrübesine dayalı fihrist)
> **Hedef:** Mobilde PWA olarak çalışan, dava türü seçince görevli/yetkili mahkeme, harçlar, belgeler, checklist sunan uygulama

---

## FAZ 0: Proje Kurulumu
- [ ] Next.js 14 (App Router) + TypeScript (strict) + Tailwind CSS 3.x
- [ ] shadcn/ui + Lucide Icons entegrasyonu
- [ ] PWA altyapısı (manifest.json, service worker, ikonlar)
- [ ] Proje klasör yapısı (`src/data`, `src/lib`, `src/components`, `src/hooks`)
- [ ] ESLint + Prettier + Vitest yapılandırması
- [ ] vercel.json oluşturma
- [ ] `.claude/settings.json` hooks yapılandırması

---

## FAZ 1: Tip Tanımları
- [ ] `src/lib/types.ts` — Tüm TypeScript interface'leri:
  - `DavaTuru`, `GorevliMahkeme`, `YetkiliMahkeme`
  - `HarcBilgisi`, `MasrafBilgisi`, `OzelVekaletnameBilgisi`
  - `MuvekkilBilgi`, `GerekiBelge`
  - `DavaKategorisi` union type (16 bölüme göre genişletilecek)

---

## FAZ 2: Veri Katmanı (KRİTİK — Projenin Kalbi)

Her bölüm için ayrı veri dosyası oluşturulacak. Tüm 436 madde dahil.

### Bölüm 1: Asliye Hukuk Mahkemesi (Madde 1–75)
**Dosya:** `src/data/bolum01-asliye-hukuk.ts`

| Alt Kategori | Maddeler | Dava Sayısı |
|---|---|---|
| 1.1 Taşınmaz (Gayrimenkul) Davaları | 1–23 | 23 |
| 1.2 Tazminat Davaları | 24–41 | 18 |
| 1.3 Borçlar Hukuku / Sözleşme Davaları | 42–54 | 13 |
| 1.4 Kişilik Hakları ve Nüfus Davaları | 55–65 | 11 |
| 1.5 Miras Hukuku (Asliye Hukuk Görevindekiler) | 66–75 | 10 |
| 1.6 Soybağı Davaları (Aile Mah. Olmayan Yerlerde) | 76–79 | 4 |
| **Toplam** | | **79** |

### Bölüm 2: Sulh Hukuk Mahkemesi (Madde 80–137)
**Dosya:** `src/data/bolum02-sulh-hukuk.ts`

| Alt Kategori | Maddeler | Dava Sayısı |
|---|---|---|
| 2.1 Kira Hukukundan Doğan Davalar | 80–97 | 18 |
| 2.2 Ortaklığın Giderilmesi (İzale-i Şüyu) | 98–101 | 4 |
| 2.3 Zilyetlik Davaları | 102–104 | 3 |
| 2.4 Vesayet ve Kayyım İşleri | 105–114 | 10 |
| 2.5 Miras İşleri (Sulh Hukuk Görevindekiler) | 115–123 | 9 |
| 2.6 Çekişmesiz Yargı İşleri | 124–130 | 7 |
| 2.7 Kat Mülkiyeti Kanunu'ndan Doğan Davalar | 131–137 | 7 |
| **Toplam** | | **58** |

### Bölüm 3: İş Mahkemesi (Madde 138–180)
**Dosya:** `src/data/bolum03-is-mahkemesi.ts`

| Alt Kategori | Maddeler | Dava Sayısı |
|---|---|---|
| 3.1 İşçilik Alacağı Davaları | 138–149 | 12 |
| 3.2 İş Güvencesi Davaları | 150–155 | 6 |
| 3.3 İş Kazası ve Meslek Hastalığı | 156–162 | 7 |
| 3.4 Sosyal Güvenlik Davaları | 163–172 | 10 |
| 3.5 Diğer İş Davaları | 173–180 | 8 |
| **Toplam** | | **43** |

### Bölüm 4: Aile Mahkemesi (Madde 181–228)
**Dosya:** `src/data/bolum04-aile-mahkemesi.ts`

| Alt Kategori | Maddeler | Dava Sayısı |
|---|---|---|
| 4.1 Boşanma Davaları | 181–191 | 11 |
| 4.2 Nafaka Davaları | 192–198 | 7 |
| 4.3 Velayet ve Çocukla İlgili Davalar | 199–205 | 7 |
| 4.4 Mal Rejimi Davaları | 206–212 | 7 |
| 4.5 Soybağı ve Evlat Edinme | 213–217 | 5 |
| 4.6 Diğer Aile Hukuku Davaları | 218–228 | 11 |
| **Toplam** | | **48** |

### Bölüm 5: Tüketici Mahkemesi (Madde 229–270)
**Dosya:** `src/data/bolum05-tuketici.ts`

| Alt Kategori | Maddeler | Dava Sayısı |
|---|---|---|
| 5.1 Ayıplı Mal Davaları | 229–236 | 8 |
| 5.2 Ayıplı Hizmet Davaları | 237–243 | 7 |
| 5.3 Bankacılık ve Finans Uyuşmazlıkları | 244–253 | 10 |
| 5.4 Sigorta Uyuşmazlıkları (Tüketici İşlemi) | 254–261 | 8 |
| 5.5 Diğer Tüketici Davaları | 262–270 | 9 |
| **Toplam** | | **42** |

### Bölüm 6: Asliye Ticaret Mahkemesi (Madde 271–333)
**Dosya:** `src/data/bolum06-ticaret.ts`

| Alt Kategori | Maddeler | Dava Sayısı |
|---|---|---|
| 6.1 Şirketler Hukuku Davaları | 271–284 | 14 |
| 6.2 Ticari Alacak ve Sözleşme Davaları | 285–297 | 13 |
| 6.3 Kıymetli Evrak Davaları | 298–305 | 8 |
| 6.4 Sigorta Hukuku (Ticari Nitelikte) | 306–312 | 7 |
| 6.5 İflas ve Konkordato | 313–321 | 9 |
| 6.6 Deniz Ticareti Davaları | 322–327 | 6 |
| 6.7 Bankacılık ve Finans (Ticari İşlem) | 328–333 | 6 |
| **Toplam** | | **63** |

### Bölüm 7: İcra Mahkemesi ve İcra-İflas Hukuku (Madde 334–358)
**Dosya:** `src/data/bolum07-icra.ts`

| Alt Kategori | Maddeler | Dava Sayısı |
|---|---|---|
| 7.1 İcra Takip Türleri | 334–340 | 7 |
| 7.2 İcra Mahkemesi Davaları | 341–353 | 13 |
| 7.3 İcra Ceza Davaları | 354–358 | 5 |
| **Toplam** | | **25** |

### Bölüm 8: İdari Yargı (İdare ve Vergi Mahkemeleri) (Madde 359–383)
**Dosya:** `src/data/bolum08-idari-yargi.ts`

| Alt Kategori | Maddeler | Dava Sayısı |
|---|---|---|
| 8.1 İdare Mahkemesi Davaları | 359–373 | 15 |
| 8.2 Vergi Mahkemesi Davaları | 374–383 | 10 |
| **Toplam** | | **25** |

### Bölüm 9: Fikri ve Sınai Haklar Mahkemesi (Madde 384–403)
**Dosya:** `src/data/bolum09-fikri-sinai.ts`

| Alt Kategori | Maddeler | Dava Sayısı |
|---|---|---|
| 9.1 Marka Hukuku | 384–389 | 6 |
| 9.2 Patent ve Faydalı Model | 390–394 | 5 |
| 9.3 Tasarım ve Telif Hukuku | 395–400 | 6 |
| 9.4 Ticaret Unvanı ve Haksız Rekabet | 401–403 | 3 |
| **Toplam** | | **20** |

### Bölüm 10: Ceza Mahkemeleri (Madde 404–424)
**Dosya:** `src/data/bolum10-ceza.ts`

| Alt Kategori | Maddeler | Dava Sayısı |
|---|---|---|
| 10.1 Kişilere Karşı Suçlar | 404–412 | 9 |
| 10.2 Malvarlığına Karşı Suçlar | 413–419 | 7 |
| 10.3 Topluma/Ekonomiye/Aileye Karşı Suçlar + Özel Usuller | 420–424 | 5 |
| **Toplam** | | **21** |

### Bölüm 11: Arabuluculuk, Uzlaştırma ve Tahkim (Madde 425–428)
**Dosya:** `src/data/bolum11-arabuluculuk-tahkim.ts`

| Maddeler | Dava Sayısı |
|---|---|
| 425–428 | **4** |

### Bölüm 12: Kadastro Mahkemesi (Madde 429)
**Dosya:** `src/data/bolum12-kadastro.ts`

| Maddeler | Dava Sayısı |
|---|---|
| 429 | **1** |

### Bölüm 13: Anayasa Mahkemesi Bireysel Başvuru (Madde 430)
**Dosya:** `src/data/bolum13-anayasa.ts`

| Maddeler | Dava Sayısı |
|---|---|
| 430 | **1** |

### Bölüm 14: AİHM Başvuruları (Madde 431)
**Dosya:** `src/data/bolum14-aihm.ts`

| Maddeler | Dava Sayısı |
|---|---|
| 431 | **1** |

### Bölüm 15: Yabancılar Hukuku ve Milletlerarası Özel Hukuk (Madde 432–433)
**Dosya:** `src/data/bolum15-yabancilar.ts`

| Maddeler | Dava Sayısı |
|---|---|
| 432–433 | **2** |

### Bölüm 16: Noter İşlemleri, İhtarnameler ve Diğer (Madde 434–436)
**Dosya:** `src/data/bolum16-noter-diger.ts`

| Maddeler | Dava Sayısı |
|---|---|
| 434–436 | **3** |

### Veri Katmanı Özet Tablosu

| Bölüm | Mahkeme/Kategori | Dava Sayısı |
|---|---|---|
| 1 | Asliye Hukuk | 79 |
| 2 | Sulh Hukuk | 58 |
| 3 | İş Mahkemesi | 43 |
| 4 | Aile Mahkemesi | 48 |
| 5 | Tüketici Mahkemesi | 42 |
| 6 | Asliye Ticaret | 63 |
| 7 | İcra Mahkemesi | 25 |
| 8 | İdari Yargı | 25 |
| 9 | Fikri ve Sınai Haklar | 20 |
| 10 | Ceza Mahkemeleri | 21 |
| 11 | Arabuluculuk/Tahkim | 4 |
| 12 | Kadastro | 1 |
| 13 | Anayasa Mahkemesi | 1 |
| 14 | AİHM | 1 |
| 15 | Yabancılar Hukuku | 2 |
| 16 | Noter/Diğer | 3 |
| **TOPLAM** | | **436** |

### Yardımcı Veri Dosyaları
- [ ] `src/data/harclar.ts` — 2024/2025 harç tarifeleri (tek dosyada, yıllık güncelleme kolay)
- [ ] `src/data/masraflar.ts` — Yargılama giderleri (tebligat, bilirkişi, keşif vb.)
- [ ] `src/data/ozelVekaletname.ts` — HMK m.74 özel yetki gerektiren haller
- [ ] `src/data/arabuluculuk.ts` — Hangi dava türlerinde arabuluculuk dava şartı
- [ ] `src/data/zamanasimi.ts` — Dava türüne göre zamanaşımı süreleri
- [ ] `src/data/kategoriler.ts` — 16 ana kategori tanımları (ikon, renk, açıklama)
- [ ] `src/data/index.ts` — Tüm bölüm dosyalarını birleştiren barrel export

---

## FAZ 3: Business Logic
- [ ] `src/lib/search.ts` — Fuzzy search (436 dava türü arasında hızlı arama)
- [ ] `src/lib/harcHesapla.ts` — Harç hesaplama (maktu/nispi ayrımı, muafiyet kontrolü)
- [ ] `src/lib/utils.ts` — Yardımcı fonksiyonlar (para formatı, tarih vb.)

---

## FAZ 4: UI Bileşenleri
- [ ] `src/components/DavaTuruSelector.tsx` — Arama çubuğu + 16 kategori grid
- [ ] `src/components/KategoriCard.tsx` — Her kategori için kart (ikon + isim + dava sayısı)
- [ ] `src/components/AltKategoriList.tsx` — Kategori içi alt kırılımlar (1.1, 1.2 vb.)
- [ ] `src/components/SonucCard.tsx` — Görevli/yetkili mahkeme bilgi kartı
- [ ] `src/components/ChecklistPanel.tsx` — Müvekkil belge checklist (localStorage persist)
- [ ] `src/components/HarcHesaplama.tsx` — Harç ve masraf gösterimi
- [ ] `src/components/VekaletnameBadge.tsx` — Özel vekaletname uyarısı
- [ ] `src/components/ArabuluculukUyari.tsx` — Arabuluculuk dava şartı uyarısı
- [ ] `src/components/KesinYetkiUyari.tsx` — Kesin yetki kırmızı/amber uyarı
- [ ] `src/components/PWAInstallPrompt.tsx` — Ana ekrana ekle butonu
- [ ] `src/components/ThemeToggle.tsx` — Dark/light mod geçişi (varsayılan dark)

---

## FAZ 5: Sayfalar ve Routing
- [ ] `src/app/layout.tsx` — Root layout (dark theme, meta tags, PWA head, font)
- [ ] `src/app/page.tsx` — Ana sayfa: Arama + 16 kategori grid
- [ ] `src/app/kategori/[id]/page.tsx` — Kategori detay: Alt kategoriler + dava listesi
- [ ] `src/app/dava/[id]/page.tsx` — Dava detay: 10 bölümlü sonuç sayfası
- [ ] `src/app/globals.css` — Global stiller

### Sonuç Sayfası Bölümleri (Dava Detay)
1. Başlık kartı (dava adı + kategori badge)
2. Görevli Mahkeme kartı
3. Yetkili Mahkeme kartı (kesin yetki uyarısı dahil)
4. Yargılama Usulü (yazılı/basit)
5. Arabuluculuk durumu (dava şartı uyarısı)
6. Harçlar kartı
7. Masraflar kartı
8. Özel Vekaletname kartı
9. Müvekkilden Alınacak Bilgiler (checkbox)
10. Gerekli Belgeler (checkbox + nereden alınır)
11. Pratik Notlar + HMK maddeleri

---

## FAZ 6: Hooks ve State
- [ ] `src/hooks/useDavaTuru.ts` — Seçili dava türü state management
- [ ] `src/hooks/usePWAInstall.ts` — PWA install prompt hook
- [ ] `src/hooks/useLocalStorage.ts` — Checklist durumu persist
- [ ] `src/hooks/useSearch.ts` — Arama debounce + fuzzy match

---

## FAZ 7: PWA + Offline
- [ ] `public/manifest.json` — PWA manifest (standalone, theme_color, ikonlar)
- [ ] `public/sw.js` — Service worker (statik asset önbellekleme)
- [ ] `public/icons/` — 192x192, 512x512 PWA ikonları
- [ ] iOS meta tag'leri (apple-touch-icon, apple-mobile-web-app)
- [ ] Offline çalışma testi

---

## FAZ 8: Animasyon ve Polish
- [ ] Framer Motion entegrasyonu
- [ ] Sayfa geçiş animasyonları
- [ ] Kart açılma/kapanma animasyonları
- [ ] Mobile responsive son kontrol
- [ ] Lighthouse PWA skoru: 100 hedefi
- [ ] Performance: FCP < 1.5s, TTI < 3s

---

## FAZ 9: Test
- [ ] Vitest + React Testing Library kurulumu
- [ ] Harç hesaplama unit testleri
- [ ] Arama fonksiyonu testleri
- [ ] Veri tutarlılığı testleri (tüm 436 madde eksiksiz mi?)
- [ ] HMK madde referans doğruluğu testi
- [ ] Kesin yetki/arabuluculuk flag'leri doğruluk testi

---

## FAZ 10: Hukuki Doğruluk Kontrolü
- [ ] Tüm görevli mahkeme atamaları doğru mu?
- [ ] Kesin yetki halleri eksiksiz işaretlenmiş mi? (HMK m.11, 12, 14/2)
- [ ] Arabuluculuk dava şartları doğru mu? (iş, ticari, tüketici, kira, ortaklık giderilmesi, kat mülkiyeti)
- [ ] Harç tutarları 2024/2025 tarifesiyle uyumlu mu?
- [ ] Özel vekaletname gerekliliği doğru mu? (HMK m.74)
- [ ] Zamanaşımı süreleri doğru mu?
- [ ] Yargılama usulü (yazılı/basit) atamaları doğru mu?

---

## FAZ 11: Deploy
- [ ] `npm run type-check` — TypeScript hata kontrolü
- [ ] `npm run lint` — ESLint kontrolü
- [ ] `npm run build` — Production build
- [ ] Vercel'e deploy
- [ ] PWA testi (mobilde ana ekrana ekleme)
- [ ] Son Lighthouse audit

---

## ÇALIŞMA SIRASI VE TAHMİNİ İŞ DAĞILIMI

```
FAZ 0  → Proje kurulumu ..................... 1 oturum
FAZ 1  → Tip tanımları ...................... 1 oturum
FAZ 2  → Veri katmanı (436 dava) ........... 6-8 oturum (en büyük iş)
  ├── Bölüm 1-2 (Asliye + Sulh = 137 dava)   2 oturum
  ├── Bölüm 3-4 (İş + Aile = 91 dava)        1-2 oturum
  ├── Bölüm 5-6 (Tüketici + Ticaret = 105)    2 oturum
  ├── Bölüm 7-8 (İcra + İdari = 50 dava)      1 oturum
  └── Bölüm 9-16 (Geri kalan = 53 dava)       1 oturum
FAZ 3  → Business logic .................... 1 oturum
FAZ 4  → UI bileşenleri .................... 2 oturum
FAZ 5  → Sayfalar .......................... 1 oturum
FAZ 6  → Hooks ............................. FAZ 4-5 ile birlikte
FAZ 7  → PWA ............................... 1 oturum
FAZ 8  → Animasyon + polish ................ 1 oturum
FAZ 9  → Test .............................. 1 oturum
FAZ 10 → Hukuki kontrol .................... 1 oturum
FAZ 11 → Deploy ............................ 1 oturum
```

---

## KATEGORİ RENK VE İKON HARİTASI (UI Referansı)

| # | Kategori | İkon Önerisi | Renk |
|---|---|---|---|
| 1 | Asliye Hukuk | Scale (terazi) | blue-500 |
| 2 | Sulh Hukuk | Handshake | green-500 |
| 3 | İş Mahkemesi | Briefcase | orange-500 |
| 4 | Aile Mahkemesi | Heart | pink-500 |
| 5 | Tüketici Mahkemesi | ShoppingCart | cyan-500 |
| 6 | Ticaret Mahkemesi | Building2 | purple-500 |
| 7 | İcra Mahkemesi | Gavel | red-500 |
| 8 | İdari Yargı | Landmark | slate-400 |
| 9 | Fikri ve Sınai Haklar | Lightbulb | yellow-500 |
| 10 | Ceza Mahkemeleri | Shield | rose-600 |
| 11 | Arabuluculuk/Tahkim | Users | teal-500 |
| 12 | Kadastro | Map | emerald-500 |
| 13 | Anayasa Mahkemesi | BookOpen | indigo-600 |
| 14 | AİHM | Globe | sky-500 |
| 15 | Yabancılar Hukuku | Plane | violet-500 |
| 16 | Noter/Diğer | FileText | amber-500 |

---

## NOTLAR

- **Veri girişi en kritik ve en uzun sürecek iş.** Her dava türü için görevli mahkeme, yetkili mahkeme, harç, masraf, vekaletname, belge listesi, HMK maddeleri tek tek girilecek.
- **Hukuki doğruluk öncelikli.** Yanlış madde referansı veya yanlış mahkeme ataması kabul edilemez.
- **Veritabanı YOK** — tüm veri TypeScript dosyalarında statik olarak tutulacak.
- **Yıllık güncelleme:** Harç tarifeleri her Ocak'ta güncellenir. `harclar.ts` tek dosyada tutulacak.
- **Arabuluculuk dava şartı:** İş, ticari alacak, tüketici, kira, ortaklığın giderilmesi, kat mülkiyeti davalarında MUTLAKA uyarı verilecek.
