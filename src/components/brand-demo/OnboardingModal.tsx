import { useState, useEffect } from "react";
import { useBrand } from "./BrandProvider";
import { COLOR_PRESETS, generateDemoLink, applyBrandColor } from "./SessionManager";

export function BrandResetButton() {
  const { session, resetSession, setShowModal } = useBrand();
  const [showConfirm, setShowConfirm] = useState(false);

  if (!session) return null;

  const handleReset = () => {
    if (showConfirm) {
      resetSession();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9998] flex flex-col items-end gap-2">
      {showConfirm && (
        <div className="rounded-lg bg-slate-800 border border-slate-600 px-4 py-2 text-sm text-white shadow-lg">
          Click again to reset brand
        </div>
      )}
      <button
        onClick={handleReset}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 border border-slate-600 text-white shadow-lg transition-all hover:bg-red-600 hover:border-red-500 hover:scale-110"
        title="Reset Brand Demo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          <path d="M8 16H3v5" />
        </svg>
      </button>
    </div>
  );
}

export function OnboardingModal() {
  const { showModal, setShowModal, remaining, submitSession, session, resetSession } = useBrand();
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [brandColor, setBrandColor] = useState("#e67e22");
  const [copied, setCopied] = useState(false);
  const [customColor, setCustomColor] = useState("");

  // Pre-fill if session exists
  useEffect(() => {
    if (session) {
      setBusinessName(session.businessName);
      setContactName(session.contactName);
      setPhone(session.phone);
      setAddress(session.address);
      setBrandColor(session.brandColor);
    }
  }, [session]);

  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;
    submitSession({ businessName, contactName, phone, address, brandColor });
  };

  const handleShare = async () => {
    const link = generateDemoLink();
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = link;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleColorPreview = (color: string) => {
    setBrandColor(color);
    applyBrandColor(color);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => session && setShowModal(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 shadow-2xl" style={{ background: "#1e293b" }}>
        {/* Decorative accent bar at top */}
        <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${brandColor}, ${brandColor}dd)` }} />

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-1 rounded-full" style={{ background: brandColor }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: brandColor }}>
                Design Your Brand Demo
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              {session ? "Your Brand Session" : "Personalize This Experience"}
            </h2>
            <p className="mt-1 text-sm text-white/60">
              {session
                ? "Edit your details or share your personalized demo."
                : "Enter your business details to see this site with your branding."}
            </p>
          </div>

          {/* Status Pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-600 bg-slate-700 px-3 py-1 text-xs text-gray-300">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Session Policy: Auto-resets every 3 hours
            </span>
            {session && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
                Resets in {remaining}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Business Name */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">Business Name *</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                placeholder="e.g. Sunrise Bakery"
                className="w-full rounded-lg border border-gray-600 bg-slate-700 px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>

            {/* Contact Name */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">Contact Name</label>
              <input
                type="text"
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full rounded-lg border border-gray-600 bg-slate-700 px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">Phone / WhatsApp</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-gray-600 bg-slate-700 px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">Business Address</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="e.g. 12 MG Road, Bengaluru"
                className="w-full rounded-lg border border-gray-600 bg-slate-700 px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>

            {/* Brand Color */}
            <div>
              <label className="block text-xs font-medium text-white/70 mb-2">Brand Theme Color</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {COLOR_PRESETS.map(preset => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => handleColorPreview(preset.value)}
                    className="group relative h-8 w-8 rounded-full border-2 transition-transform hover:scale-110"
                    style={{
                      background: preset.value,
                      borderColor: brandColor === preset.value ? "white" : "transparent",
                    }}
                    title={preset.name}
                  >
                    {brandColor === preset.value && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-8 rounded-lg border border-gray-600 flex-shrink-0"
                  style={{ background: brandColor }}
                />
                <input
                  type="text"
                  value={customColor || brandColor}
                  onChange={e => {
                    setCustomColor(e.target.value);
                    if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
                      handleColorPreview(e.target.value);
                    }
                  }}
                  onBlur={() => {
                    if (/^#[0-9a-fA-F]{6}$/.test(customColor)) {
                      handleColorPreview(customColor);
                    }
                    setCustomColor("");
                  }}
                  placeholder="#e67e22"
                  className="flex-1 rounded-lg border border-gray-600 bg-slate-700 px-3 py-2 text-sm text-white font-mono placeholder-gray-400 outline-none focus:border-blue-500"
                />
                <input
                  type="color"
                  value={brandColor}
                  onChange={e => handleColorPreview(e.target.value)}
                  className="h-8 w-8 rounded-lg border-0 cursor-pointer bg-transparent"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: brandColor }}
            >
              {session ? "Update My Branding" : "Apply My Branding"}
            </button>
          </form>

          {/* Skip Button (only if no session) */}
          {!session && (
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full text-center text-sm text-white/50 hover:text-white/80 transition"
            >
              Skip for now & use defaults →
            </button>
          )}

          {/* Share Button */}
          {session && (
            <button
              onClick={handleShare}
              className="mt-4 w-full rounded-lg border border-slate-600 bg-slate-700 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-slate-600"
            >
              {copied ? "Link Copied!" : "Share Personalized Demo Link"}
            </button>
          )}

          {/* Close & Reset (only if session exists) */}
          {session && (
            <div className="mt-2 flex flex-col gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="w-full text-center text-xs text-white/40 hover:text-white/60"
              >
                Close & continue browsing
              </button>
              <button
                onClick={() => {
                  resetSession();
                  setBusinessName("");
                  setContactName("");
                  setPhone("");
                  setAddress("");
                  setBrandColor("#e67e22");
                }}
                className="w-full text-center text-xs text-red-400/60 hover:text-red-400"
              >
                Reset Brand & Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
