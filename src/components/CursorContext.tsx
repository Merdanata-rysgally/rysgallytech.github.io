'use client';

import React, { createContext, useContext, useState } from 'react';

interface CursorState {
  color: string | null;        // card color when hovering a card, null otherwise
  magnetX: number | null;      // viewport X of card center
  magnetY: number | null;      // viewport Y of card center
}

interface CursorContextValue {
  cursor: CursorState;
  setCardHover: (color: string, centerX: number, centerY: number) => void;
  clearCardHover: () => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursor, setCursor] = useState<CursorState>({
    color: null,
    magnetX: null,
    magnetY: null,
  });

  const setCardHover = (color: string, centerX: number, centerY: number) => {
    setCursor({ color, magnetX: centerX, magnetY: centerY });
  };

  const clearCardHover = () => {
    setCursor({ color: null, magnetX: null, magnetY: null });
  };

  return (
    <CursorContext.Provider value={{ cursor, setCardHover, clearCardHover }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursor must be used within CursorProvider');
  return ctx;
}
