import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import heroYoga from "@/assets/hero-yoga.jpg";
import zumbaClass from "@/assets/zumba-class.jpg";
import meditation from "@/assets/meditation.jpg";
import studioInterior from "@/assets/studio-interior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prāṇa Studio — Yoga, Zumba & Mindful Movement in Bengaluru" },
      {
        name: "description",
        content:
          "A modern Indian wellness studio offering yoga, zumba, meditation and strength classes. Breathe, move and belong.",
      },
      { property: "og:title", content: "Prāṇa Studio — Move with intention" },
      {
        property: "og:description",
        content:
          "Yoga, zumba and mindful movement in the heart of Bengaluru. Classes for every body, every day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Hero />
      <Marquee />
      <Pillars />
      <ClassesPreview />
      <StudioSection />
      <Testimonials />
      <CTA />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="container-x mx-auto max-w-7xl pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Now enrolling · Winter batch 2026
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-balance md:text-7xl lg:text-[5.5rem]">
            Breathe deep.<br />
            Move bold.<br />
            <span className="italic text-primary">Belong here.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground text-balance">
            Prāṇa is a modern Indian studio where sunrise yoga meets Bollywood zumba,
            and stillness meets sweat. Come as you are.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/schedule"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:bg-primary"
            >
              See this week's schedule <span aria-hidden>→</span>
            </Link>
            <Link
              to="/classes"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium hover:bg-secondary"
            >
              Browse classes
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { k: "12+", v: "class formats" },
              { k: "24", v: "certified teachers" },
              { k: "6am", v: "first class daily" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-3xl text-primary">{s.k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-5">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={heroYoga}
              alt="Yogi practicing warrior pose at sunrise overlooking Indian mountains"
              width={1600}
              height={1200}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-background/85 px-4 py-3 backdrop-blur">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Sunrise Vinyasa
                </p>
                <p className="text-sm font-medium">Every day · 6:00 am</p>
              </div>
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Open
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = [
    "Hatha", "Vinyasa", "Zumba", "Meditation", "Pranayama",
    "Bollywood Cardio", "Strength", "Sound Bath", "Ashtanga",
  ];
  return (
    <div className="overflow-hidden border-y border-border bg-foreground py-6 text-background">
      <div className="flex animate-[marquee_35s_linear_infinite] gap-12 whitespace-nowrap font-display text-3xl md:text-4xl">
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            {w}
            <span className="text-primary">✺</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}

function Pillars() {
  const items = [
    {
      k: "01",
      title: "Rooted in tradition",
      body: "Authentic asana, pranayama and dhyana passed down by masters, taught with respect and clarity.",
    },
    {
      k: "02",
      title: "Modern in method",
      body: "Small groups, honest cueing, evidence-informed sequencing. No mysticism, no gatekeeping.",
    },
    {
      k: "03",
      title: "Joyful movement",
      body: "From sunrise vinyasa to Bollywood zumba nights — we take play seriously.",
    },
  ];
  return (
    <section className="container-x mx-auto max-w-7xl py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Our philosophy
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-balance">
            Where <em className="text-primary">prāṇa</em> meets practice.
          </h2>
        </div>
        <div className="grid gap-6 md:col-span-8 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.k} className="rounded-2xl border border-border bg-card p-6">
              <div className="font-display text-sm text-primary">{it.k}</div>
              <h3 className="mt-6 font-display text-xl">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClassesPreview() {
  const classes = [
    {
      name: "Sunrise Vinyasa",
      tag: "Yoga",
      time: "6:00 – 7:00 am",
      img: heroYoga,
      color: "bg-primary text-primary-foreground",
    },
    {
      name: "Bollywood Zumba",
      tag: "Dance Fitness",
      time: "7:30 – 8:30 pm",
      img: zumbaClass,
      color: "bg-accent text-accent-foreground",
    },
    {
      name: "Stillness & Sound",
      tag: "Meditation",
      time: "8:00 – 9:00 pm",
      img: meditation,
      color: "bg-forest text-cream",
    },
  ];
  return (
    <section className="container-x mx-auto max-w-7xl py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Classes
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-balance">
            Find the practice<br />that finds you.
          </h2>
        </div>
        <Link
          to="/classes"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-secondary"
        >
          All 12 classes →
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {classes.map((c) => (
          <article
            key={c.name}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.color}`}>
                  {c.tag}
                </span>
                <span className="text-xs text-muted-foreground">{c.time}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl">{c.name}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StudioSection() {
  return (
    <section className="container-x mx-auto max-w-7xl py-20 md:py-28">
      <div className="overflow-hidden rounded-3xl bg-foreground text-background">
        <div className="grid md:grid-cols-2">
          <div className="p-10 md:p-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              The Studio
            </p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance">
              A quiet room in a loud city.
            </h2>
            <p className="mt-6 max-w-md text-background/70">
              Twelve-foot arched windows, teak floors reclaimed from a Mysuru weavers' hall,
              a courtyard with a lone frangipani. Built for you to arrive, exhale, and stay a while.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4 text-sm">
              {[
                "Two heated studios",
                "Rooftop deck",
                "Filtered showers",
                "Café & juice bar",
                "Retail corner",
                "Kids' room",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-background/80">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[400px]">
            <img
              src={studioInterior}
              alt="Studio interior with arched windows"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    {
      q: "The 6am vinyasa reset my entire nervous system. Six months in and I'm a different person.",
      n: "Aditi R.",
      role: "Member since 2025",
    },
    {
      q: "Bollywood zumba on Friday nights is the joy I didn't know I was missing.",
      n: "Karan M.",
      role: "Weekly regular",
    },
    {
      q: "Serious teachers, zero ego. It feels rare, and it feels right.",
      n: "Sneha D.",
      role: "Meditation cohort '25",
    },
  ];
  return (
    <section className="container-x mx-auto max-w-7xl py-20 md:py-28">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Community</p>
      <h2 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl text-balance">
        A thousand practices. One room.
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {t.map((it, i) => (
          <figure
            key={i}
            className="flex flex-col rounded-3xl border border-border bg-card p-8"
          >
            <span className="font-display text-6xl leading-none text-primary">“</span>
            <blockquote className="mt-2 text-lg leading-relaxed text-balance">{it.q}</blockquote>
            <figcaption className="mt-auto pt-8 text-sm">
              <div className="font-medium">{it.n}</div>
              <div className="text-muted-foreground">{it.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="container-x mx-auto max-w-7xl">
      <div className="rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-balance">
              Your first class is on us.
            </h2>
            <p className="mt-4 max-w-md text-primary-foreground/80">
              Drop in for any class this week — no card, no commitment. Bring a friend.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/schedule"
              className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-medium text-foreground hover:bg-cream"
            >
              Reserve a spot →
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3.5 text-sm font-medium hover:bg-primary-foreground/10"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
