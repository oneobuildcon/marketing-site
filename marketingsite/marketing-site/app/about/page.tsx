export const metadata = {
  title: "About Us | One O Buildcon",
};

const values = [
  {
    title: "Integrity",
    desc: "We do what we say — transparent pricing, honest timelines, no shortcuts.",
  },
  {
    title: "Quality",
    desc: "Every project is built to last, using trusted materials and skilled craftsmanship.",
  },
  {
    title: "Partnership",
    desc: "We work closely with clients at every stage, from planning to handover.",
  },
];

export default function About() {
  return (
    <main>
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-bold">About One O Buildcon</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Building trust, one project at a time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-navy">Our Story</h2>
            <p className="mt-3 text-navy/70">
              One O Buildcon was founded with a simple goal: deliver
              construction projects that clients can trust, on time and
              within budget. Over the years, we&apos;ve grown into a
              full-service construction company handling residential,
              commercial, and renovation work — guided by craftsmanship and
              accountability at every step.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy">Our Mission</h2>
            <p className="mt-3 text-navy/70">
              To take every project from blueprint to brilliance — combining
              sound engineering, quality materials, and attentive project
              management to build spaces our clients are proud of.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-navy">Our Values</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-lg border border-black/5 p-6 shadow-sm"
              >
                <h3 className="font-semibold text-navy">{value.title}</h3>
                <p className="mt-2 text-sm text-navy/70">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
