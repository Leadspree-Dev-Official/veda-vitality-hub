import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import studioInterior from "@/assets/studio-interior.jpg";
import instructor1 from "@/assets/instructor-1.jpg";
import instructor2 from "@/assets/instructor-2.jpg";
import instructor3 from "@/assets/instructor-3.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Prāṇa Studio | Our story & teachers" },
      {
        name: "description",
        content:
          "Prāṇa Studio was founded in Bengaluru in 2021 to offer modern, honest movement rooted in Indian wellness traditions. Meet our team.",
      },
      { property: "og:title", content: "About Prāṇa Studio" },
      { property: "og:description", content: "Our story, our teachers, and the philosophy behind the studio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const teachers = [
  {
    name: "Ishaan Kapoor",
    role: "Lead Yoga · Ashtanga & Vinyasa",
    bio: "KPJAYI-authorised, ten years of daily practice. Teaches like he means it, without ever raising his voice.",
    img: instructor1,
  },
  {
    name: "Kabir Sharma",
    role: "Head of Dance · Zumba ZIN",
    bio: "Licensed Zumba instructor with a former life in Mumbai's choreography circuit. Runs the Friday night floor.",
    img: instructor2,
  },
  {
    name: "Meera Iyer",
    role: "Meditation & Prāṇāyāma",
    bio: "Trained at the Krishnamacharya Yoga Mandiram, Chennai. Guides our breathwork, nidra and sound-bath programs.",
    img: instructor3,
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="container-x mx-auto max-w-7xl pt-12 pb-16 md:pt-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Our story
            </p>
            <h1 className="mt-4 font-display text-5xl md:text-6xl text-balance">
              A studio built by <em className="text-primary">practitioners</em>, for everyone.
            </h1>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Prāṇa opened in the winter of 2021 above a bookshop on Lavelle Road. We were three
                friends who had spent a decade in ashrams, dance floors and physio clinics —
                and could never find a studio that felt like all of it.
              </p>
              <p>
                So we built one. A room where a first-time zumba dancer, a Mysore-trained ashtangi
                and a corporate director on lunch break could all show up, unnoticed and unhurried.
              </p>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={studioInterior}
                alt="Prāṇa Studio interior"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-x mx-auto max-w-7xl py-16">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { k: "2021", v: "Studio founded" },
            { k: "4,200+", v: "Members trained" },
            { k: "24", v: "Certified teachers" },
            { k: "12", v: "Class formats" },
          ].map((s) => (
            <div key={s.v} className="rounded-3xl border border-border bg-card p-6">
              <div className="font-display text-4xl text-primary">{s.k}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x mx-auto max-w-7xl py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          The team
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl text-balance">
          Teachers who practice what they teach.
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {teachers.map((t) => (
            <article key={t.name} className="group">
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-6 font-display text-2xl">{t.name}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{t.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x mx-auto max-w-7xl py-16 md:py-24">
        <div className="rounded-3xl border border-border bg-secondary/50 p-10 md:p-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Values
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl md:text-5xl text-balance">
            Simple rules we don't break.
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[
              {
                t: "No spiritual gatekeeping.",
                b: "Sanskrit terms come with translations. Rituals come with reasons. Come as you are.",
              },
              {
                t: "Small groups, always.",
                b: "Every class is capped at 18 mats so teachers can see and support each student.",
              },
              {
                t: "Bodies, not aesthetics.",
                b: "We celebrate what your body can do, not how it looks. No mirrors in the yoga rooms.",
              },
              {
                t: "Pay it forward.",
                b: "Five percent of every membership funds free classes for domestic workers in our neighbourhood.",
              },
            ].map((v) => (
              <div key={v.t}>
                <h3 className="font-display text-xl">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
