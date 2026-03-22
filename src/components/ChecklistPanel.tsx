"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChecklist } from "@/hooks/useChecklist";
import type { MuvekkilBilgi, GerekiliBelge } from "@/lib/types";

interface ChecklistPanelProps {
  davaId: string;
  muvekkilBilgileri: MuvekkilBilgi[];
  gerekliBelgeler: GerekiliBelge[];
}

export function ChecklistPanel({
  davaId,
  muvekkilBilgileri,
  gerekliBelgeler,
}: ChecklistPanelProps) {
  const {
    state,
    toggleBilgi,
    toggleBelge,
    clearAll,
    bilgiTamamlanan,
    belgeTamamlanan,
  } = useChecklist(davaId);

  return (
    <>
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Muvekkilden Alinacak Bilgiler</CardTitle>
            <Badge variant="outline">
              {bilgiTamamlanan}/{muvekkilBilgileri.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            {muvekkilBilgileri.map((item) => {
              const checked = !!state.bilgiler[item.bilgi];
              return (
                <li
                  key={item.bilgi}
                  className="rounded-lg border border-border/70 px-4 py-3"
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleBilgi(item.bilgi)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span
                          className={
                            checked
                              ? "font-medium line-through opacity-60"
                              : "font-medium"
                          }
                        >
                          {item.bilgi}
                        </span>
                        <Badge
                          variant={item.zorunlu ? "secondary" : "outline"}
                        >
                          {item.zorunlu ? "Zorunlu" : "Opsiyonel"}
                        </Badge>
                      </div>
                      {item.aciklama ? (
                        <p className="text-muted-foreground">
                          {item.aciklama}
                        </p>
                      ) : null}
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gerekli Belgeler</CardTitle>
            <Badge variant="outline">
              {belgeTamamlanan}/{gerekliBelgeler.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            {gerekliBelgeler.map((belge) => {
              const checked = !!state.belgeler[belge.belge];
              return (
                <li
                  key={belge.belge}
                  className="rounded-lg border border-border/70 px-4 py-3"
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleBelge(belge.belge)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span
                          className={
                            checked
                              ? "font-medium line-through opacity-60"
                              : "font-medium"
                          }
                        >
                          {belge.belge}
                        </span>
                        <Badge
                          variant={belge.zorunlu ? "secondary" : "outline"}
                        >
                          {belge.zorunlu ? "Zorunlu" : "Opsiyonel"}
                        </Badge>
                      </div>
                      {belge.nereden ? (
                        <p className="text-muted-foreground">
                          Temin yeri: {belge.nereden}
                        </p>
                      ) : null}
                      {belge.aciklama ? (
                        <p className="text-muted-foreground">
                          {belge.aciklama}
                        </p>
                      ) : null}
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
          {(bilgiTamamlanan > 0 || belgeTamamlanan > 0) && (
            <button
              type="button"
              onClick={clearAll}
              className="mt-4 text-xs text-muted-foreground underline hover:text-foreground"
            >
              Tum isaretleri kaldir
            </button>
          )}
        </CardContent>
      </Card>
    </>
  );
}
