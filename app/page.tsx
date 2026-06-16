import Link from "next/link";

const services = [
  {
    title: "Residential Construction",
    desc: "Custom homes and renovations built to last, tailored to your lifestyle.",
  },
  {
    title: "Commercial Projects",
    desc: "Offices, retail spaces, and warehouses delivered on time and on budget.",
  },
  {
    title: "Interior Fit-Outs",
    desc: "End-to-end interior design and execution for homes and businesses.",
  },
  {
    title: "Renovation & Remodeling",
    desc: "Transform existing spaces with structural and aesthetic upgrades.",
  },
];

const stats = [
  { label: "Projects Delivered", value: "120+" },
  { label: "Years of Experience", value: "15+" },
  { label: "Cities Served", value: "8" },
  { label: "Happy Clients", value: "100+" },
];

export default function Home() {
  return (
    <main>
      <section className="bg-navy text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-light">
            One O Buildcon
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            From Blueprint to Brilliance
          </h1>
          <p className="max-w-xl text-white/80">
            We turn ideas into structures — delivering residential, commercial,
            and renovation projects with precision, quality, and integrity at
            every step.
          </p>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="rounded-md bg-amber px-6 py-3 font-semibold text-navy-dark transition hover:bg-amber-light"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/projects"
              className="rounded-md border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-navy">{stat.value}</p>
              <p className="mt-1 text-sm text-navy/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold text-navy">What We Do</h2>
        <p className="mt-2 max-w-2xl text-navy/70">
          A full-service construction partner — from the first sketch to the
          final handover.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-lg border border-black/5 p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-semibold text-navy">{service.title}</h3>
              <p className="mt-2 text-sm text-navy/70">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-dark py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-bold">Ready to start your project?</h2>
          <p className="mt-2 text-white/80">
            Tell us about your vision and we&apos;ll help you build it — from
            blueprint to brilliance.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-amber px-6 py-3 font-semibold text-navy-dark transition hover:bg-amber-light"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
