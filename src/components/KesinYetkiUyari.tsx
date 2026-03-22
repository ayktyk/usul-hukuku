import { AlertTriangle } from "lucide-react";
import type { YetkiliMahkeme } from "@/lib/types";

interface KesinYetkiUyariProps {
  yetkiliMahkeme: YetkiliMahkeme;
}

export function KesinYetkiUyari({ yetkiliMahkeme }: KesinYetkiUyariProps) {
  if (!yetkiliMahkeme.kesinYetkiMi) return null;

  return (
    <div className="flex items-start gap-3 rounded-lg border-2 border-amber-500/70 bg-amber-500/10 px-4 py-3 text-sm">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
      <div>
        <p className="font-semibold text-amber-400">Kesin Yetki</p>
        <p className="mt-1 text-muted-foreground">
          {yetkiliMahkeme.kesinYetki}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Kesin yetki kurali — taraflar anlasarak degistiremez, mahkeme re&apos;sen
          dikkate alir. ({yetkiliMahkeme.yasalDayanak})
        </p>
      </div>
    </div>
  );
}
