import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Weekly Schedule — Prāṇa Studio" },
      {
        name: "description",
        content:
          "Browse this week's yoga, zumba and meditation classes at Prāṇa Studio. Drop-ins welcome, first class free.",
      },
      { property: "og:title", content: "Weekly Schedule — Prāṇa Studio" },
      { property: "og:description", content: "This week at Prāṇa: yoga, zumba, meditation and strength classes, seven days a week." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SchedulePage,
});

type Slot = { time: string; name: string; teacher: string; tag: string };

const week: Record<string, Slot[]> = {
  Monday: [
    { time: "6:00 am", name: "Sunrise Vinyasa", teacher: "Ishaan", tag: "Yoga" },
    { time: "9:00 am", name: "Slow Hatha", teacher: "Meera", tag: "Yoga" },
    { time: "6:00 pm", name: "Bollywood Zumba", teacher: "Kabir", tag: "Dance" },
    { time: "8:00 pm", name: "Yoga Nidra", teacher: "Meera", tag: "Meditation" },
  ],
  Tuesday: [
    { time: "6:30 am", name: "Ashtanga Mysore", teacher: "Ishaan", tag: "Yoga" },
    { time: "12:30 pm", name: "Mat Pilates", teacher: "Ananya", tag: "Strength" },
    { time: "6:30 pm", name: "Zumba Toning", teacher: "Kabir", tag: "Dance" },
    { time: "8:00 pm", name: "Prāṇāyāma Lab", teacher: "Meera", tag: "Breath" },
  ],
  Wednesday: [
    { time: "6:00 am", name: "Power Flow", teacher: "Ishaan", tag: "Strength" },
    { time: "10:00 am", name: "Slow Hatha", teacher: "Meera", tag: "Yoga" },
    { time: "6:00 pm", name: "Latin Zumba", teacher: "Kabir", tag: "Dance" },
    { time: "7:30 pm", name: "Stillness & Sound", teacher: "Meera", tag: "Meditation" },
  ],
  Thursday: [
    { time: "6:30 am", name: "Sunrise Vinyasa", teacher: "Ishaan", tag: "Yoga" },
    { time: "12:30 pm", name: "Rooftop HIIT", teacher: "Ananya", tag: "Strength" },
    { time: "6:30 pm", name: "Bollywood Zumba", teacher: "Kabir", tag: "Dance" },
    { time: "8:00 pm", name: "Yoga Nidra", teacher: "Meera", tag: "Meditation" },
  ],
  Friday: [
    { time: "6:00 am", name: "Ashtanga Mysore", teacher: "Ishaan", tag: "Yoga" },
    { time: "6:00 pm", name: "Bollywood Zumba Night", teacher: "Kabir", tag: "Dance" },
    { time: "8:00 pm", name: "Stillness & Sound", teacher: "Meera", tag: "Meditation" },
  ],
  Saturday: [
    { time: "7:00 am", name: "Rooftop HIIT", teacher: "Ananya", tag: "Strength" },
    { time: "9:00 am", name: "Power Flow", teacher: "Ishaan", tag: "Strength" },
    { time: "11:00 am", name: "Family Yoga", teacher: "Meera", tag: "Yoga" },
    { time: "6:00 pm", name: "Latin Zumba", teacher: "Kabir", tag: "Dance" },
  ],
  Sunday: [
    { time: "8:00 am", name: "Slow Hatha", teacher: "Meera", tag: "Yoga" },
    { time: "10:30 am", name: "Prāṇāyāma Lab", teacher: "Meera", tag: "Breath" },
    { time: "5:00 pm", name: "Sound Bath Immersion", teacher: "Meera", tag: "Meditation" },
  ],
};

const tagColor: Record<string, string> = {
  Yoga: "bg-primary/10 text-primary border-primary/20",
  Dance: "bg-accent/20 text-terracotta border-accent/30",
  Meditation: "bg-forest/10 text-forest border-forest/20",
  Strength: "bg-foreground/5 text-foreground border-foreground/15",
  Breath: "bg-secondary text-foreground border-border",
};

function SchedulePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="container-x mx-auto max-w-7xl pt-12 pb-10 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          This week
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h1 className="max-w-3xl font-display text-5xl md:text-6xl text-balance">
            Seven days.<br />Thirty-plus classes.
          </h1>
          <div className="rounded-full border border-border bg-card px-5 py-2 text-sm">
            First class is <span className="font-medium text-primary">on us</span> — just walk in.
          </div>
        </div>
      </section>

      <section className="container-x mx-auto max-w-7xl pb-24">
        <div className="space-y-4">
          {Object.entries(week).map(([day, slots]) => (
            <div
              key={day}
              className="grid gap-6 rounded-3xl border border-border bg-card p-6 md:grid-cols-12 md:p-8"
            >
              <div className="md:col-span-3">
                <h2 className="font-display text-3xl">{day}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{slots.length} classes</p>
              </div>
              <div className="grid gap-3 md:col-span-9">
                {slots.map((s) => (
                  <div
                    key={s.time + s.name}
                    className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background px-5 py-4 transition hover:border-primary/40"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="w-20 font-display text-lg tabular-nums text-primary">
                        {s.time}
                      </span>
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-muted-foreground">with {s.teacher}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${tagColor[s.tag]}`}
                      >
                        {s.tag}
                      </span>
                      <button className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background opacity-90 transition hover:bg-primary hover:opacity-100">
                        Reserve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
