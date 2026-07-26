import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  getSession,
  saveSession,
  clearSession,
  applySessionToUI,
  applyBrandColor,
  applyFromURL,
  getRemainingMs,
  formatRemaining,
  type BrandSession,
} from "./SessionManager";

interface BrandContextValue {
  session: BrandSession | null;
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  remaining: string;
  submitSession: (data: Omit<BrandSession, "submittedAt">) => void;
  resetSession: () => void;
}

const BrandContext = createContext<BrandContextValue | null>(null);

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<BrandSession | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [remaining, setRemaining] = useState("0m");

  // Initialize from URL or localStorage
  useEffect(() => {
    applyFromURL();
    const existing = getSession();
    if (existing) {
      setSession(existing);
      applySessionToUI(existing);
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    const tick = () => {
      const ms = getRemainingMs();
      setRemaining(formatRemaining(ms));
      if (ms <= 0 && session) {
        clearSession();
        setSession(null);
        setShowModal(true);
        // Reset brand color to default
        document.documentElement.style.removeProperty("--brand-color");
        document.documentElement.style.removeProperty("--brand-color-light");
        document.documentElement.style.removeProperty("--brand-color-hover");
        document.documentElement.style.removeProperty("--primary");
        document.documentElement.style.removeProperty("--ring");
        document.documentElement.style.removeProperty("--saffron");
      }
    };
    tick();
    const interval = setInterval(tick, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, [session]);

  const submitSession = useCallback((data: Omit<BrandSession, "submittedAt">) => {
    const s = saveSession(data);
    setSession(s);
    applySessionToUI(s);
    setShowModal(false);
  }, []);

  const resetSession = useCallback(() => {
    clearSession();
    setSession(null);
    setShowModal(true);
    document.documentElement.style.removeProperty("--brand-color");
    document.documentElement.style.removeProperty("--brand-color-light");
    document.documentElement.style.removeProperty("--brand-color-hover");
    document.documentElement.style.removeProperty("--primary");
    document.documentElement.style.removeProperty("--ring");
    document.documentElement.style.removeProperty("--saffron");
  }, []);

  return (
    <BrandContext.Provider value={{ session, showModal, setShowModal, remaining, submitSession, resetSession }}>
      {children}
    </BrandContext.Provider>
  );
}
