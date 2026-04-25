import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModeStore {
  isDark: boolean;
  toggle: () => void;
}

export const useModeStore = create<ModeStore>()(
  persist(
    (set, get) => ({
      isDark: false,
      toggle: () => {
        const next = !get().isDark;
        const root = window.document.documentElement;
        if (next) {
          root.classList.remove("light");
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
          root.classList.add("light");
        }
        set({ isDark: next });
      },
    }),
    {
      name: "mode",
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const root = window.document.documentElement;
        if (state.isDark) {
          root.classList.remove("light");
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
          root.classList.add("light");
        }
      },
    },
  ),
);
