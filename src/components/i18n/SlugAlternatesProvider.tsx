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
  productSlug: LocalizedSlug | null;
  setProductSlug: (slug: LocalizedSlug | null) => void;
};

const SlugAlternatesContext = createContext<SlugAlternatesContextValue | null>(
  null,
);

export function SlugAlternatesProvider({ children }: { children: ReactNode }) {
  const [productSlug, setProductSlugState] = useState<LocalizedSlug | null>(
    null,
  );

  const setProductSlug = useCallback((slug: LocalizedSlug | null) => {
    setProductSlugState(slug);
  }, []);

  const value = useMemo(
    () => ({ productSlug, setProductSlug }),
    [productSlug, setProductSlug],
  );

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
      productSlug: null,
      setProductSlug: () => undefined,
    };
  }
  return ctx;
}
