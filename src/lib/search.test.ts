import { describe, it, expect } from 'vitest';
import { searchDavalar } from './search';

describe('searchDavalar', () => {
  it('basit bir arama terimi ile doru sonuclari getirmeli', () => {
    const sonuclar = searchDavalar('ise iade');
    
    expect(sonuclar.length).toBeGreaterThan(0);
    expect(sonuclar[0].dava.ad.toLowerCase()).toContain('iade');
  });

  it('madde numarasi ile arama yapabilmeli', () => {
    const sonuclar = searchDavalar('80');
    
    // Madde 80 Kira bedelinin tespiti
    const madde80 = sonuclar.find(s => s.dava.maddeNo === 80);
    expect(madde80).toBeDefined();
  });

  it('bos arama yapildiginda bos liste donmeli', () => {
    const sonuclar = searchDavalar('');
    expect(sonuclar.length).toBe(0);
  });
  
  it('eslesmeyen bir terim arandiginda bos liste donmeli', () => {
    const sonuclar = searchDavalar('bulunamayacakbirterim');
    expect(sonuclar.length).toBe(0);
  });
});
