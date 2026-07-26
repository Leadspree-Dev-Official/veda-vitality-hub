const STORAGE_KEY = "brand-demo-session";
const SESSION_DURATION_MS = 3 * 60 * 60 * 1000; // 3 hours

export interface BrandSession {
  businessName: string;
  contactName: string;
  phone: string;
  address: string;
  brandColor: string;
  submittedAt: number;
}

export function getSession(): BrandSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: BrandSession = JSON.parse(raw);
    if (Date.now() - data.submittedAt > SESSION_DURATION_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function saveSession(data: Omit<BrandSession, "submittedAt">): BrandSession {
  const session: BrandSession = { ...data, submittedAt: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getRemainingMs(): number {
  const session = getSession();
  if (!session) return 0;
  const elapsed = Date.now() - session.submittedAt;
  return Math.max(0, SESSION_DURATION_MS - elapsed);
}

export function formatRemaining(ms: number): string {
  if (ms <= 0) return "0m";
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function applyBrandColor(color: string) {
  document.documentElement.style.setProperty("--brand-color", color);
  // Generate lighter variant
  try {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    document.documentElement.style.setProperty("--brand-color-light", `rgba(${r}, ${g}, ${b}, 0.1)`);
    document.documentElement.style.setProperty("--brand-color-hover", `rgb(${Math.max(0, r - 20)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 20)})`);
    
    // Also update primary color so buttons and accents reflect the brand color
    document.documentElement.style.setProperty("--primary", `rgb(${r}, ${g}, ${b})`);
    document.documentElement.style.setProperty("--ring", `rgb(${r}, ${g}, ${b})`);
    document.documentElement.style.setProperty("--saffron", `rgb(${r}, ${g}, ${b})`);
  } catch {}
}

export function applySessionToUI(session: BrandSession) {
  applyBrandColor(session.brandColor);
  // Update all elements with data-brand-text attribute
  document.querySelectorAll("[data-brand-text='business-name']").forEach(el => {
    el.textContent = session.businessName;
  });
  document.querySelectorAll("[data-brand-text='address']").forEach(el => {
    el.textContent = session.address;
  });
  document.querySelectorAll("[data-brand-text='phone']").forEach(el => {
    el.textContent = session.phone;
  });
}

export function generateDemoLink(): string {
  const session = getSession();
  if (!session) return window.location.href;
  const params = new URLSearchParams({
    token: btoa(JSON.stringify({ b: session.businessName, c: session.contactName, p: session.phone, a: session.address, color: session.brandColor }))
  });
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function applyFromURL() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  if (!token) return;
  try {
    const data = JSON.parse(atob(token));
    const session = saveSession({
      businessName: data.b || "",
      contactName: data.c || "",
      phone: data.p || "",
      address: data.a || "",
      brandColor: data.color || "#e67e22",
    });
    applySessionToUI(session);
    // Clean URL
    window.history.replaceState({}, "", window.location.pathname);
  } catch {}
}

export const COLOR_PRESETS = [
  { name: "Saffron", value: "#e67e22" },
  { name: "Royal Blue", value: "#2563eb" },
  { name: "Emerald", value: "#059669" },
  { name: "Ruby", value: "#dc2626" },
  { name: "Amethyst", value: "#7c3aed" },
  { name: "Rose", value: "#e11d48" },
  { name: "Teal", value: "#0d9488" },
  { name: "Gold", value: "#d97706" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Coral", value: "#f97316" },
];
