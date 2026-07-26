import { Link } from "@tanstack/react-router";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/classes", label: "Classes" },
  { to: "/schedule", label: "Schedule" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-x mx-auto flex h-18 max-w-7xl items-center justify-between py-4">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">
            प्र
          </span>
          <span className="font-display text-xl tracking-tight">
            <span data-brand-text="business-name">Prāṇa</span> <span className="text-primary">Studio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-primary"
          >
            Book a class
            <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="grid size-10 place-items-center rounded-full border border-border md:hidden"
          aria-label="Menu"
        >
          <div className="space-y-1.5">
            <span className="block h-px w-5 bg-foreground" />
            <span className="block h-px w-5 bg-foreground" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="container-x mx-auto flex max-w-7xl flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/schedule"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-foreground px-5 py-3 text-center text-sm font-medium text-background"
            >
              Book a class
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="container-x mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">
                प्र
              </span>
              <span className="font-display text-xl" data-brand-text="business-name">Prāṇa Studio</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A modern movement sanctuary in the heart of Bengaluru — where breath, rhythm and
              community meet.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Visit
            </h4>
            <p className="mt-4 text-sm leading-relaxed">
              <span data-brand-text="address">14, Lavelle Road</span><br />
              Ashok Nagar, Bengaluru 560001<br />
              Karnataka, India
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Contact
            </h4>
            <p className="mt-4 text-sm leading-relaxed">
              hello@pranastudio.in<br />
              <span data-brand-text="phone">+91 80 4000 1200</span><br />
              Mon–Sun · 6am–9pm
            </p>
          </div>
        </div>

        <div className=”mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center”>
          <p>© {new Date().getFullYear()} Prāṇa Studio. All rights reserved.</p>
          <p className=”font-display italic”>”सर्वे भवन्तु सुखिनः” · May all beings be happy.</p>
        </div>
        <div className=”mt-4 text-center text-xs text-muted-foreground”>
          Developer: Aniruddha Das | Developed by LeadSpree Business Solutions
        </div>
      </div>
    
          <div className="mt-8">
            <a href="/admin" className="text-sm hover:underline transition">🔑 Admin Console</a>
          </div>
    </footer>
  );
}
