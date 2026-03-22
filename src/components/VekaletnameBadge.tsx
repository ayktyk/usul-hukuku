import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { OzelVekaletnameBilgisi } from "@/lib/types";

interface VekaletnameBadgeProps {
  bilgi: OzelVekaletnameBilgisi;
}

export function VekaletnameBadge({ bilgi }: VekaletnameBadgeProps) {
  if (bilgi.gerekliMi) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <span className="font-semibold text-destructive">
            OZEL YETKI GEREKLI
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-medium text-foreground/90">{bilgi.neden}</p>
          {bilgi.yasalDayanak && (
            <Badge variant="outline" className="border-destructive/30 text-destructive">
              {bilgi.yasalDayanak}
            </Badge>
          )}
          {bilgi.icerik && bilgi.icerik.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-4 text-muted-foreground">
              {bilgi.icerik.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-4">
      <CheckCircle2 className="h-5 w-5 text-green-500" />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-green-500 uppercase tracking-tight">
          Genel Vekaletname Yeterli
        </span>
        <span className="text-xs text-muted-foreground">
          HMK m.74 uyarinca bu dava icin ozel yetki aranmamaktadir.
        </span>
      </div>
    </div>
  );
}
