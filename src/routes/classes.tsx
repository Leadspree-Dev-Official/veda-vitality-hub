import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import heroYoga from "@/assets/hero-yoga.jpg";
import zumbaClass from "@/assets/zumba-class.jpg";
import meditation from "@/assets/meditation.jpg";
import studioInterior from "@/assets/studio-interior.jpg";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Classes — Prāṇa Studio | Yoga, Zumba, Meditation & More" },
      {
        name: "description",
        content:
          "Twelve class formats — from sunrise vinyasa and ashtanga to Bollywood zumba, HIIT and sound baths. Find your practice at Prāṇa Studio.",
      },
      { property: "og:title", content: "Classes at Prāṇa Studio" },
      { property: "og:description", content: "Yoga, dance fitness, strength and meditation classes for every level." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClassesPage,
});

const classes = [
  {
    name: "Sunrise Vinyasa",
    tag: "Yoga",
    level: "All levels",
    duration: "60 min",
    body: "A flowing sequence timed to breath — sun salutations, standing poses and a long savasana to open your day.",
    img: heroYoga,
  },
  {
    name: "Ashtanga Mysore",
    tag: "Yoga",
    level: "Intermediate",
    duration: "90 min",
    body: "Self-paced practice of the primary series with individual adjustments from a KPJAYI-trained teacher.",
    img: heroYoga,
  },
  {
    name: "Slow Hatha",
    tag: "Yoga",
    level: "Beginner",
    duration: "75 min",
    body: "Longer holds, careful alignment and pranayama. A gentle way in — perfect if you're new to the mat.",
    img: meditation,
  },
  {
    name: "Bollywood Zumba",
    tag: "Dance",
    level: "All levels",
    duration: "60 min",
    body: "Cardio meets choreography, powered by a playlist of desi bangers. Sweat, laugh, repeat.",
    img: zumbaClass,
  },
  {
    name: "Zumba Toning",
    tag: "Dance",
    level: "All levels",
    duration: "45 min",
    body: "Zumba's rhythm with light dumbbells to build lean strength in shoulders, glutes and core.",
    img: zumbaClass,
  },
  {
    name: "Latin Zumba",
    tag: "Dance",
    level: "All levels",
    duration: "60 min",
    body: "Salsa, merengue, reggaeton and cumbia — the classic Zumba format, taught by licensed instructors.",
    img: zumbaClass,
  },
  {
    name: "Prāṇāyāma Lab",
    tag: "Breath",
    level: "All levels",
    duration: "45 min",
    body: "A workshop-style class in breath techniques — Nadi Shodhana, Bhramari, Kapalabhati and more.",
    img: meditation,
  },
  {
    name: "Stillness & Sound",
    tag: "Meditation",
    level: "All levels",
    duration: "60 min",
    body: "A guided meditation closing with a live sound bath on singing bowls, gongs and tanpura.",
    img: meditation,
  },
  {
    name: "Yoga Nidra",
    tag: "Meditation",
    level: "All levels",
    duration: "45 min",
    body: "Yogic sleep — a deeply restorative practice done lying down. Better than a nap. Bring a blanket.",
    img: meditation,
  },
  {
    name: "Power Flow",
    tag: "Strength",
    level: "Intermediate",
    duration: "60 min",
    body: "Vinyasa with strength intent — arm balances, core work and heat-building sequences.",
    img: studioInterior,
  },
  {
    name: "Mat Pilates",
    tag: "Strength",
    level: "All levels",
    duration: "50 min",
    body: "Precise, low-impact conditioning that builds a strong, mobile core. A perfect complement to yoga.",
    img: studioInterior,
  },
  {
    name: "Rooftop HIIT",
    tag: "Strength",
    level: "All levels",
    duration: "45 min",
    body: "Bodyweight intervals on our open-air terrace at golden hour. Short, sharp, satisfying.",
    img: studioInterior,
  },
];

const filters = ["All", "Yoga", "Dance", "Meditation", "Strength", "Breath"];

function ClassesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="container-x mx-auto max-w-7xl pt-12 pb-16 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Classes
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl md:text-6xl text-balance">
          Twelve ways to <em className="text-primary">move</em>, breathe and belong.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Every format is taught by a certified instructor, capped at 18 mats, and open to
          first-timers. Filter by what you're in the mood for.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                i === 0
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card hover:bg-secondary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="container-x mx-auto max-w-7xl pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((c) => (
            <article
              key={c.name}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div className="aspect-[5/4] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 font-medium">
                    {c.tag}
                  </span>
                  <span className="text-muted-foreground">
                    {c.level} · {c.duration}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-2xl">{c.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                <Link
                  to="/schedule"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3"
                >
                  See times <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
