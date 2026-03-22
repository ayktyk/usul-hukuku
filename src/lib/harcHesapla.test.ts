import { describe, it, expect } from 'vitest';
import { hesaplaHarcOzeti } from './harcHesapla';
import type { HarcBilgisi } from './types';

describe('hesaplaHarcOzeti', () => {
  it('maktu harc doru hesaplanmali', () => {
    const harclar: HarcBilgisi = {
      basvuruHarci: 427.60,
      kararIlamHarci: 'maktu',
      aciklama: 'Test',
    };

    const ozet = hesaplaHarcOzeti(harclar);

    expect(ozet.basvuruHarci).toBe(427.60);
    expect(ozet.kararIlamHarciTuru).toBe('maktu');
    expect(ozet.kararIlamHarciTutari).toBe(427.60); // MAKTU_KARAR_ILAM_HARCI from harclar.ts
    expect(ozet.pesinHarcTutari).toBe(427.60);
    expect(ozet.toplamAcilisMaliyeti).toBe(427.60 + 427.60);
  });

  it('nispi harc dava degeri ile doru hesaplanmali', () => {
    const harclar: HarcBilgisi = {
      basvuruHarci: 427.60,
      kararIlamHarci: 'nispi',
      nispiOran: 68.31, // Binde 68.31
      pesinHarcOran: 0.25, // 1/4
      aciklama: 'Test',
    };

    const davaDegeri = 100000;
    const ozet = hesaplaHarcOzeti(harclar, davaDegeri);

    const beklenenKararIlam = (100000 * 68.31) / 1000;
    const beklenenPesin = beklenenKararIlam * 0.25;

    expect(ozet.basvuruHarci).toBe(427.60);
    expect(ozet.kararIlamHarciTuru).toBe('nispi');
    expect(ozet.kararIlamHarciTutari).toBe(beklenenKararIlam);
    expect(ozet.pesinHarcTutari).toBe(beklenenPesin);
    expect(ozet.toplamAcilisMaliyeti).toBe(427.60 + beklenenPesin);
  });
});
