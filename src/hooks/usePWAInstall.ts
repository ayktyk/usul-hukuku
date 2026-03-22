"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * PWA install prompt hook'u.
 * `canInstall` true ise "Ana ekrana ekle" butonu gosterilebilir.
 */
export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("pwa-dismissed") === "1") {
        setDismissed(true);
        return;
      }
    } catch {
      // sessionStorage unavailable
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const canInstall = !!deferredPrompt && !dismissed;

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("pwa-dismissed", "1");
    } catch {
      // sessionStorage unavailable
    }
  };

  return { canInstall, install, dismiss };
}
