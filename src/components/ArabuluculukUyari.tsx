import { ShieldAlert } from "lucide-react";
import type { ArabuluculukBilgisi } from "@/lib/types";

interface ArabuluculukUyariProps {
  arabuluculuk: ArabuluculukBilgisi;
}

export function ArabuluculukUyari({ arabuluculuk }: ArabuluculukUyariProps) {
  if (!arabuluculuk.davaSarti) return null;

  return (
    <div className="flex items-start gap-3 rounded-lg border-2 border-rose-500/70 bg-rose-500/10 px-4 py-3 text-sm">
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
      <div>
        <p className="font-semibold text-rose-400">
          Arabuluculuk Dava Sarti
        </p>
        <p className="mt-1 text-muted-foreground">
          Bu dava turu icin dava acmadan once arabuluculuk basvurusu yapilmasi
          zorunludur. Arabuluculuk son tutanagi olmadan dava acilirsa dava sarti
          yoklugu nedeniyle reddedilir.
        </p>
        {arabuluculuk.yasalDayanak ? (
          <p className="mt-1 text-xs text-muted-foreground">
            Dayanak: {arabuluculuk.yasalDayanak}
          </p>
        ) : null}
        {arabuluculuk.aciklama ? (
          <p className="mt-1 text-xs text-muted-foreground">
            {arabuluculuk.aciklama}
          </p>
        ) : null}
      </div>
    </div>
  );
}
