"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { HarcBilgisi } from "@/lib/types";
import { hesaplaHarcOzeti } from "@/lib/harcHesapla";
import { formatPara } from "@/lib/utils";

interface HarcHesaplamaPanelProps {
  harclar: HarcBilgisi;
}

function parseCurrencyInput(value: string): number | undefined {
  const normalized = value.replace(/\./g, "").replace(",", ".").trim();
  if (!normalized) return undefined;

  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

export function HarcHesaplamaPanel({ harclar }: HarcHesaplamaPanelProps) {
  const [davaDegeriInput, setDavaDegeriInput] = useState("");

  const davaDegeri = useMemo(
    () => parseCurrencyInput(davaDegeriInput),
    [davaDegeriInput],
  );

  const ozet = useMemo(
    () => hesaplaHarcOzeti(harclar, davaDegeri),
    [davaDegeri, harclar],
  );

  const nispiDava = harclar.kararIlamHarci === "nispi";

  return (
    <div className="space-y-3">
      {nispiDava ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium">Dava degeri ile hesapla</p>
            <Badge variant="secondary">
              Binde {harclar.nispiOran ?? 0}
            </Badge>
          </div>
          <Input
            inputMode="decimal"
            placeholder="Ornek: 250000"
            value={davaDegeriInput}
            onChange={(e) => setDavaDegeriInput(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Dava degeri girdiginde pesin harc ve acilis maliyeti otomatik hesaplanir.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border/70 px-3 py-2">
          <p className="font-medium">Maktu harc uygulanir</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Bu dava turunde karar ve ilam harci maktu hesaplanir.
          </p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border/70 px-3 py-2">
          <p className="text-xs text-muted-foreground">Basvuru harci</p>
          <p className="mt-1 font-medium">{formatPara(ozet.basvuruHarci)}</p>
        </div>
        <div className="rounded-lg border border-border/70 px-3 py-2">
          <p className="text-xs text-muted-foreground">Karar ve ilam harci</p>
          <p className="mt-1 font-medium">
            {formatPara(ozet.kararIlamHarciTutari)}
          </p>
        </div>
        <div className="rounded-lg border border-border/70 px-3 py-2">
          <p className="text-xs text-muted-foreground">Pesin harc</p>
          <p className="mt-1 font-medium">{formatPara(ozet.pesinHarcTutari)}</p>
        </div>
        <div className="rounded-lg border border-border/70 px-3 py-2">
          <p className="text-xs text-muted-foreground">Tahmini acilis maliyeti</p>
          <p className="mt-1 font-medium">
            {formatPara(ozet.toplamAcilisMaliyeti)}
          </p>
        </div>
      </div>

      {nispiDava && !davaDegeri ? (
        <p className="text-xs text-muted-foreground">
          Nispi dava oldugu icin net tutar icin dava degeri girilmelidir.
        </p>
      ) : null}

      {harclar.muafiyet ? (
        <p className="text-xs text-muted-foreground">{harclar.muafiyet}</p>
      ) : null}
      <p className="text-xs text-muted-foreground">{harclar.aciklama}</p>
    </div>
  );
}
