"use client";

import { useLocalStorage } from "./useLocalStorage";

interface ChecklistState {
  bilgiler: Record<string, boolean>;
  belgeler: Record<string, boolean>;
}

const DEFAULT_STATE: ChecklistState = { bilgiler: {}, belgeler: {} };

/**
 * Dava bazli checklist state hook'u.
 * localStorage'da `checklist-{davaId}` anahtariyla persist eder.
 */
export function useChecklist(davaId: string) {
  const [state, setState, clearState] = useLocalStorage<ChecklistState>(
    `checklist-${davaId}`,
    DEFAULT_STATE,
  );

  const toggleBilgi = (bilgi: string) => {
    setState((prev) => ({
      ...prev,
      bilgiler: { ...prev.bilgiler, [bilgi]: !prev.bilgiler[bilgi] },
    }));
  };

  const toggleBelge = (belge: string) => {
    setState((prev) => ({
      ...prev,
      belgeler: { ...prev.belgeler, [belge]: !prev.belgeler[belge] },
    }));
  };

  const bilgiTamamlanan = Object.values(state.bilgiler).filter(Boolean).length;
  const belgeTamamlanan = Object.values(state.belgeler).filter(Boolean).length;

  return {
    state,
    toggleBilgi,
    toggleBelge,
    clearAll: clearState,
    bilgiTamamlanan,
    belgeTamamlanan,
  };
}
