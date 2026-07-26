import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Visit — Prāṇa Studio, Bengaluru" },
      {
        name: "description",
        content:
          "Visit Prāṇa Studio at 14 Lavelle Road, Bengaluru. Drop in for a class, or send us a note — we reply within a day.",
      },
      { property: "og:title", content: "Contact Prāṇa Studio" },
      { property: "og:description", content: "Visit us on Lavelle Road, Bengaluru. First class free." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="container-x mx-auto max-w-7xl pt-12 pb-16 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Say hello
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-6xl text-balance">
          Come by. Or drop us a <em className="text-primary">note</em>.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          We answer every message within a day. Or better — walk in for a free class, then decide.
        </p>
      </section>

      <section className="container-x mx-auto max-w-7xl pb-24">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="rounded-3xl border border-border bg-card p-8 md:col-span-3 md:p-10">
            <h2 className="font-display text-2xl">Send a message</h2>
            {sent ? (
              <div className="mt-8 rounded-2xl bg-secondary p-8 text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
                  ✓
                </div>
                <p className="mt-4 font-display text-xl">Message received.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  We'll reply within one working day. Namaste.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-6 grid gap-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Name
                    </span>
                    <input
                      required
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                      placeholder="Priya Menon"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                      placeholder="you@email.com"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    I'm interested in
                  </span>
                  <select className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary">
                    <option>A free trial class</option>
                    <option>Membership options</option>
                    <option>Private / corporate sessions</option>
                    <option>Teacher training</option>
                    <option>Something else</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Message
                  </span>
                  <textarea
                    rows={5}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                    placeholder="Tell us a little about what you're looking for…"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:bg-primary"
                >
                  Send message →
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6 md:col-span-2">
            <div className="rounded-3xl bg-foreground p-8 text-background">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-accent">
                Visit the studio
              </h3>
              <p className="mt-4 font-display text-2xl leading-snug">
                14, Lavelle Road<br />
                Ashok Nagar, Bengaluru<br />
                560001
              </p>
              <p className="mt-6 text-sm text-background/70">
                A five-minute walk from Cubbon Park metro. Metered parking on Cunningham Road.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
                Hours
              </h3>
              <dl className="mt-4 space-y-2 text-sm">
                {[
                  ["Monday – Friday", "6:00 am – 9:00 pm"],
                  ["Saturday", "6:30 am – 8:00 pm"],
                  ["Sunday", "7:30 am – 6:00 pm"],
                ].map(([d, h]) => (
                  <div key={d} className="flex justify-between border-b border-border/60 py-2 last:border-0">
                    <dt className="text-muted-foreground">{d}</dt>
                    <dd className="font-medium">{h}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
                Direct
              </h3>
              <p className="mt-4 text-sm leading-relaxed">
                <a href="mailto:hello@pranastudio.in" className="underline underline-offset-4 hover:text-primary">
                  hello@pranastudio.in
                </a>
                <br />
                <a href="tel:+918040001200" className="underline underline-offset-4 hover:text-primary">
                  +91 80 4000 1200
                </a>
              </p>
              <div className="mt-4 flex gap-3 text-sm">
                <a href="#" className="rounded-full border border-border px-4 py-1.5 hover:bg-secondary">
                  Instagram
                </a>
                <a href="#" className="rounded-full border border-border px-4 py-1.5 hover:bg-secondary">
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
