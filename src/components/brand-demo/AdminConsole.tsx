import { useState, useEffect } from "react";
import { useBrand } from "./BrandProvider";
import { clearSession, COLOR_PRESETS } from "./SessionManager";

const ADMIN_STORAGE_KEY = "brand-demo-admin";
const ORDERS_STORAGE_KEY = "brand-demo-orders";

interface AdminSettings {
  businessName: string;
  defaultColor: string;
  contactPhone: string;
  isAuthenticated: boolean;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  item: string;
  status: "New" | "Confirmed" | "Out for Delivery" | "Completed";
  createdAt: number;
}

const defaultSettings: AdminSettings = {
  businessName: "",
  defaultColor: "#e67e22",
  contactPhone: "",
  isAuthenticated: false,
};

function getAdminSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function saveAdminSettings(s: AdminSettings) {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(s));
}

function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function AdminConsole() {
  const { resetSession } = useBrand();
  const [showLogin, setShowLogin] = useState(true);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [settings, setSettings] = useState<AdminSettings>(getAdminSettings);
  const [activeTab, setActiveTab] = useState<"content" | "orders" | "settings" | "reset">("content");
  const [orders, setOrders] = useState<Order[]>(getOrders);
  const [editField, setEditField] = useState<string | null>(null);

  useEffect(() => {
    if (settings.isAuthenticated) setShowLogin(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") {
      setSettings(s => ({ ...s, isAuthenticated: true }));
      saveAdminSettings({ ...settings, isAuthenticated: true });
      setShowLogin(false);
      setPinError("");
    } else {
      setPinError("Invalid PIN. Default is 1234.");
    }
  };

  const handleLogout = () => {
    setSettings(s => ({ ...s, isAuthenticated: false }));
    saveAdminSettings({ ...settings, isAuthenticated: false });
    setShowLogin(true);
    setPin("");
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    saveOrders(updated);
  };

  const flushAllData = () => {
    clearSession();
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    localStorage.removeItem(ORDERS_STORAGE_KEY);
    resetSession();
    setSettings(defaultSettings);
    setOrders([]);
    document.documentElement.style.removeProperty("--brand-color");
    document.documentElement.style.removeProperty("--brand-color-light");
    document.documentElement.style.removeProperty("--brand-color-hover");
    alert("All demo data has been flushed. Site reset to defaults.");
  };

  const flushOrdersOnly = () => {
    setOrders([]);
    localStorage.removeItem(ORDERS_STORAGE_KEY);
  };

  if (showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="text-center mb-6">
            <div className="mx-auto h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-3">🔑</div>
            <h1 className="text-xl font-bold">Admin Console</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter PIN to access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={e => { setPin(e.target.value); setPinError(""); }}
              placeholder="Enter 4-digit PIN"
              maxLength={4}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-center text-lg tracking-[0.3em] font-mono outline-none focus:ring-2 focus:ring-primary/30"
              autoFocus
            />
            {pinError && <p className="text-xs text-red-500 text-center">{pinError}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "content" as const, label: "Content Editor", icon: "📝" },
    { id: "orders" as const, label: "Orders & Leads", icon: "📦" },
    { id: "settings" as const, label: "Site Settings", icon: "⚙️" },
    { id: "reset" as const, label: "Reset Data", icon: "🗑️" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xl">🔑</span>
            <h1 className="text-lg font-bold">Admin Console</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">PIN: 1234</span>
            <button onClick={handleLogout} className="text-xs text-muted-foreground hover:text-foreground transition">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-t-lg px-4 py-3 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "border-b-2 border-primary bg-primary/5 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-5xl p-4 sm:p-6">
        {/* Content Editor Tab */}
        {activeTab === "content" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Live Content Editor</h2>
            <p className="text-sm text-muted-foreground">
              Edit items, prices, descriptions, and categories. Changes apply in real-time.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-medium mb-4">Quick Actions</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => {
                    const session = JSON.parse(localStorage.getItem("brand-demo-session") || "null");
                    if (session) {
                      alert(`Current Brand:\nBusiness: ${session.businessName}\nContact: ${session.contactName}\nPhone: ${session.phone}\nAddress: ${session.address}\nColor: ${session.brandColor}`);
                    } else {
                      alert("No active brand session. Visit the homepage to start one.");
                    }
                  }}
                  className="rounded-lg border border-border bg-background p-4 text-left transition hover:border-primary/50"
                >
                  <div className="text-sm font-medium">View Active Session</div>
                  <div className="text-xs text-muted-foreground mt-1">See current visitor's branding</div>
                </button>
                <button
                  onClick={() => {
                    const session = JSON.parse(localStorage.getItem("brand-demo-session") || "null");
                    if (session) {
                      const link = `${window.location.origin}${window.location.pathname}?token=${btoa(JSON.stringify({ b: session.businessName, c: session.contactName, p: session.phone, a: session.address, color: session.brandColor }))}`;
                      navigator.clipboard.writeText(link);
                      alert("Demo link copied to clipboard!");
                    } else {
                      alert("No active session to share.");
                    }
                  }}
                  className="rounded-lg border border-border bg-background p-4 text-left transition hover:border-primary/50"
                >
                  <div className="text-sm font-medium">Copy Demo Link</div>
                  <div className="text-xs text-muted-foreground mt-1">Share personalized URL</div>
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="rounded-lg border border-border bg-background p-4 text-left transition hover:border-primary/50"
                >
                  <div className="text-sm font-medium">View All Inquiries ({orders.length})</div>
                  <div className="text-xs text-muted-foreground mt-1">Orders and leads tracker</div>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className="rounded-lg border border-border bg-background p-4 text-left transition hover:border-primary/50"
                >
                  <div className="text-sm font-medium">Site Settings</div>
                  <div className="text-xs text-muted-foreground mt-1">Global business config</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Orders & Inquiry Tracker</h2>
              <button
                onClick={flushOrdersOnly}
                className="text-xs text-muted-foreground hover:text-red-500 transition"
              >
                Clear All
              </button>
            </div>
            {orders.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
                <p className="text-muted-foreground">No orders or inquiries yet.</p>
                <p className="text-xs text-muted-foreground mt-1">They will appear here when visitors submit forms.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-muted-foreground">{order.item}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {order.phone} · {new Date(order.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <select
                        value={order.status}
                        onChange={e => updateOrderStatus(order.id, e.target.value as Order["status"])}
                        className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium outline-none"
                      >
                        <option>New</option>
                        <option>Confirmed</option>
                        <option>Out for Delivery</option>
                        <option>Completed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Site Settings</h2>
            <div className="rounded-xl border border-border bg-card p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">Default Business Name</label>
                <input
                  type="text"
                  value={settings.businessName}
                  onChange={e => {
                    const updated = { ...settings, businessName: e.target.value };
                    setSettings(updated);
                    saveAdminSettings(updated);
                  }}
                  placeholder="Enter default business name"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Default Brand Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.defaultColor}
                    onChange={e => {
                      const updated = { ...settings, defaultColor: e.target.value };
                      setSettings(updated);
                      saveAdminSettings(updated);
                    }}
                    className="h-10 w-10 rounded-lg border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.defaultColor}
                    onChange={e => {
                      if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
                        const updated = { ...settings, defaultColor: e.target.value };
                        setSettings(updated);
                        saveAdminSettings(updated);
                      }
                    }}
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-mono outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {COLOR_PRESETS.map(p => (
                    <button
                      key={p.value}
                      onClick={() => {
                        const updated = { ...settings, defaultColor: p.value };
                        setSettings(updated);
                        saveAdminSettings(updated);
                      }}
                      className="h-6 w-6 rounded-full border-2 transition hover:scale-110"
                      style={{ background: p.value, borderColor: settings.defaultColor === p.value ? "white" : "transparent" }}
                      title={p.name}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Contact Phone</label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={e => {
                    const updated = { ...settings, contactPhone: e.target.value };
                    setSettings(updated);
                    saveAdminSettings(updated);
                  }}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
          </div>
        )}

        {/* Reset Tab */}
        {activeTab === "reset" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Reset Demo Data</h2>
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Warning: These actions cannot be undone.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    clearSession();
                    resetSession();
                    alert("Visitor session cleared. The onboarding modal will appear on next visit.");
                  }}
                  className="w-full rounded-lg border border-border bg-background p-4 text-left transition hover:border-primary/50"
                >
                  <div className="text-sm font-medium">Clear Current Session</div>
                  <div className="text-xs text-muted-foreground mt-1">Remove the active visitor's branding data</div>
                </button>
                <button
                  onClick={flushAllData}
                  className="w-full rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-left transition hover:border-red-500/50"
                >
                  <div className="text-sm font-medium text-red-600 dark:text-red-400">Flush All Data & Reset Site</div>
                  <div className="text-xs text-muted-foreground mt-1">Clear all sessions, orders, and settings. Site reverts to defaults.</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
