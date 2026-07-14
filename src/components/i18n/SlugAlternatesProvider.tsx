"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LocalizedSlug } from "@/lib/localized-slug";

type SlugAlternatesContextValue = {
  slug: LocalizedSlug | null;
  setSlug: (slug: LocalizedSlug | null) => void;
};

const SlugAlternatesContext =
  createContext<SlugAlternatesContextValue | null>(null);

export function SlugAlternatesProvider({ children }: { children: ReactNode }) {
  const [slug, setSlugState] = useState<LocalizedSlug | null>(null);

  const setSlug = useCallback((next: LocalizedSlug | null) => {
    setSlugState(next);
  }, []);

  const value = useMemo(() => ({ slug, setSlug }), [slug, setSlug]);

  return (
    <SlugAlternatesContext.Provider value={value}>
      {children}
    </SlugAlternatesContext.Provider>
  );
}

export function useSlugAlternates() {
  const ctx = useContext(SlugAlternatesContext);
  if (!ctx) {
    return {
      slug: null,
      setSlug: () => undefined,
    };
  }
  return ctx;
}
