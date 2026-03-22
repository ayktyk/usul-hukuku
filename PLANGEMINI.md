# PLANGEMINI.md — Usul Hukuku PWA Gelişmiş Uygulama Planı

Bu dosya, projenin mevcut durumunu analiz ederek kalan adımları ve iyileştirme hedeflerini belirler. `PLAN.md` dosyasındaki hedefler büyük oranda gerçekleştirilmiştir.

## Mevcut Durum Analizi (23 Mart 2026)

### Tamamlananlar ✓
- **Veri Katmanı (Faz 2):** 16 bölüm ve 436 dava türünün tamamı `src/data/bolumXX-*.ts` dosyalarına işlenmiş ve `src/data/index.ts` üzerinden dışa aktarılmıştır.
- **Mantık Katmanı (Faz 3):** Gelişmiş bulanık arama (fuzzy search) ve harç hesaplama motoru tamamlanmıştır.
- **UI Bileşenleri (Faz 4):** Ana sayfa arama, kategori gridi, harç hesaplama paneli, belge checklist'i ve hukuki uyarı bileşenleri hazırdır.
- **Sayfalar (Faz 5):** Ana sayfa, Kategori detayı ve Dava detay sayfaları (App Router) oluşturulmuştur.
- **PWA (Faz 7):** `manifest.json` ve `sw.js` altyapısı kurulmuştur.
- **Animasyonlar:** Framer Motion ile küresel sayfa geçişleri ve arama sonucu animasyonları eklenmiştir.
- **Test:** Vitest yapılandırılmış ve kritik fonksiyonlar (harç, arama) test edilmiştir.
- **Bağımlılıklar:** Framer Motion, Lucide Icons ve Tailwind CSS entegre edilmiştir.

### Kalan İşler ve İyileştirmeler ➔

#### 1. UI/UX İyileştirmeleri (Kritik)
- [x] **Animasyonlar:** Framer Motion kullanarak sayfa geçişleri ve kart açılışlarına akıcılık kazandırılması.
- [x] **Eksik Bileşenler:** `VekaletnameBadge.tsx` ve `SonucCard.tsx` gibi spesifik bilgileri daha vurgulu sunan bileşenlerin ayrıştırılması.
- [ ] **Mobile Touch UX:** Mobil cihazlarda daha rahat kullanım için dokunma alanlarının ve kaydırma efektlerinin optimize edilmesi.
- [ ] **Dark Mode:** Tema desteğinin tam olarak test edilmesi ve sistem tercihine uyum.

#### 2. Test ve Doğrulama (Faz 9)
- [x] **Vitest Kurulumu:** Test altyapısının kurulması.
- [x] **Birim Testleri:** `harcHesapla.ts` ve `search.ts` fonksiyonları için kapsamlı test senaryoları.
- [ ] **Veri Bütünlüğü:** 436 maddenin tamamının doğru yüklendiğine dair otomatik bir kontrol scripti.

#### 3. PWA ve Performans (Faz 7-8)
- [ ] **Offline Desteği:** Service worker'ın tüm statik varlıkları ve veri dosyalarını doğru önbelleğe aldığından emin olunması.
- [ ] **Lighthouse:** 100/100 PWA ve Performans skoru hedefi için optimizasyon.
- [ ] **Assetler:** PWA ikonları ve splash screen dosyalarının son hallerinin oluşturulması.

#### 4. Hukuki Kontrol (Faz 10)
- [ ] **2025/2026 Güncelliği:** Harç tutarlarının ve parasal sınırların en son Resmi Gazete verileriyle (1 Ocak 2025/2026 tebliğleri) son kez teyit edilmesi.
- [ ] **Arabuluculuk:** Yeni eklenen kira/komşuluk arabuluculuk şartlarının tüm ilgili maddelerde (Madde 80+) işaretlendiğinden emin olunması.

---

## GÜNCEL ÇALIŞMA PLANI (Sıralı)

### Adım 1: Animasyon ve Akıcılık (UX) [TAMAMLANDI]
- `AnimatePresence` ile sayfa geçişleri.
- `layout.tsx` içinde global animasyon sarmalayıcı.
- Arama sonuçlarının liste halinde akarak gelmesi.

### Adım 2: Eksik UI Detayları [TAMAMLANDI]
- **VekaletnameBadge:** Özel vekaletname gerekiyorsa kırmızı/vurgulu uyarı.

### Adım 3: Test ve Kalite [TAMAMLANDI]
- Vitest yapılandırıldı.
- Kritik testler eklendi ve geçti.
- Build testi yapıldı.

### Adım 4: Yayına Hazırlık
- Vercel deploy.
- PWA "Add to Home Screen" testi.

---

## NOTLAR
- Veri dosyaları (`bolum01-16`) projenin en değerli kısmıdır, bu dosyalarda yapılacak değişiklikler `PLAN.md`'deki madde numaralarına sadık kalınarak yapılmalıdır.
- Harç hesaplamaları `harclar.ts` dosyasındaki merkezi sabitlere bağlı kalmalıdır.
- **Hedef:** Mobilde bir avukatın saniyeler içinde doğru mahkemeyi ve harcı bulmasını sağlamak.
