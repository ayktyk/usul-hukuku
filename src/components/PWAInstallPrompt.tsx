"use client";

import { Download, X } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export function PWAInstallPrompt() {
  const { canInstall, install, dismiss } = usePWAInstall();

  if (!canInstall) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-md items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-lg">
      <Download className="h-5 w-5 shrink-0 text-indigo-400" />
      <div className="flex-1 text-sm">
        <p className="font-medium">Ana ekrana ekle</p>
        <p className="text-xs text-muted-foreground">
          Cevrimdisi erisim icin uygulamayi yukle
        </p>
      </div>
      <button
        type="button"
        onClick={install}
        className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500"
      >
        Yukle
      </button>
      <button
        type="button"
        onClick={dismiss}
        className="text-muted-foreground hover:text-foreground"
        aria-label="Kapat"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
