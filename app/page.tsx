import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Premium Bungalows",
    desc: "Custom-designed bungalows built with premium finishes and attention to detail.",
    img: "https://picsum.photos/seed/bungalow/400/300",
  },
  {
    title: "Row Houses",
    desc: "Well-planned row house developments combining privacy with community living.",
    img: "https://picsum.photos/seed/rowhouse/400/300",
  },
  {
    title: "Residential Buildings",
    desc: "Multi-storey residential complexes built for durability, safety, and comfort.",
    img: "https://picsum.photos/seed/residential/400/300",
  },
  {
    title: "Farmhouses",
    desc: "Peaceful farmhouse retreats designed to blend with their natural surroundings.",
    img: "https://picsum.photos/seed/farmhouse/400/300",
  },
  {
    title: "RCC Work",
    desc: "Structural RCC work — foundations, slabs, and framing done to precise engineering standards.",
    img: "https://picsum.photos/seed/rccwork/400/300",
  },
];

const whyChooseUs = [
  { label: "Years of Experience", value: "15+" },
  { label: "Licensed & Insured", value: "✓" },
  { label: "Skilled Team of Experts", value: "✓" },
  { label: "High-Quality Materials", value: "✓" },
  { label: "On-Time Delivery", value: "✓" },
  { label: "Projects Delivered", value: "120+" },
];

const projects = [
  { name: "Premium Bungalow", img: "https://picsum.photos/seed/proj1/400/300" },
  { name: "Row House Development", img: "https://picsum.photos/seed/proj2/400/300" },
  { name: "Residential Tower", img: "https://picsum.photos/seed/proj3/400/300" },
  { name: "Countryside Farmhouse", img: "https://picsum.photos/seed/proj4/400/300" },
];

const testimonials = [
  {
    name: "Suresh P.",
    project: "Premium Bungalow",
    quote: "One O Buildcon exceeded our expectations. Fantastic work and great attention to detail.",
  },
  {
    name: "Anita R.",
    project: "Row House",
    quote: "Highly professional team, always on schedule, and transparent throughout.",
  },
  {
    name: "Vikram M.",
    project: "Farmhouse",
    quote: "Top-notch quality and great communication from start to finish.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-navy text-white">
        <Image
          src="https://picsum.photos/seed/herosite/1600/900"
          alt="Construction site"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-light">
            One O Buildcon
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Building Strong Foundations for the Future
          </h1>
          <p className="max-w-xl text-white/80">
            Trusted experts in premium bungalows, row houses, residential
            buildings, farmhouses, and RCC work — delivering quality, safety,
            and on-time results. From blueprint to brilliance.
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
              View Our Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold text-navy">Our Services</h2>
        <p className="mt-2 max-w-2xl text-navy/70">
          What we build, end to end — from design through handover.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="overflow-hidden rounded-lg border border-black/5 shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-navy">{service.title}</h3>
                <p className="mt-2 text-sm text-navy/70">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-black/5">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold text-navy">
            Why Choose One O Buildcon
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-lg border border-black/5 p-5"
              >
                <span className="text-2xl font-bold text-amber">
                  {item.value}
                </span>
                <span className="text-sm font-medium text-navy/80">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-navy">Our Projects</h2>
          <Link
            href="/projects"
            className="text-sm font-semibold text-amber hover:underline"
          >
            View All Projects →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group relative h-48 overflow-hidden rounded-lg"
            >
              <Image
                src={project.img}
                alt={project.name}
                fill
                className="object-cover transition group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-dark/80 to-transparent p-4">
                <span className="font-semibold text-white">
                  {project.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-dark py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-white">
            Client Testimonials
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-lg bg-white/5 p-6 text-white"
              >
                <p className="text-sm text-white/80">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 font-semibold">{t.name}</p>
                <p className="text-xs text-amber-light">{t.project}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-bold">Planning a construction project?</h2>
          <p className="mt-2 text-white/80">
            Let One O Buildcon bring your vision to life — from blueprint to
            brilliance.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-amber px-6 py-3 font-semibold text-navy-dark transition hover:bg-amber-light"
          >
            Request a Free Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
