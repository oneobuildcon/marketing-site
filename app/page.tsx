import Image from "next/image";
import Link from "next/link";
import {
  Home as HomeIcon,
  Building2,
  Hammer,
  ClipboardList,
  Ruler,
  PaintBucket,
  Award,
  ShieldCheck,
  Users,
  Package,
  Clock,
} from "lucide-react";

const services = [
  {
    title: "Premium Bungalows",
    desc: "Custom builds with premium finishes",
    icon: HomeIcon,
  },
  {
    title: "Row Houses",
    desc: "Planned developments, built to last",
    icon: Building2,
  },
  {
    title: "Residential Buildings",
    desc: "Multi-storey complexes done right",
    icon: ClipboardList,
  },
  {
    title: "Farmhouses",
    desc: "Retreats built for comfort and durability",
    icon: Ruler,
  },
  {
    title: "RCC Work",
    desc: "Foundations, slabs & structural framing",
    icon: Hammer,
  },
  {
    title: "Interior Finishing",
    desc: "Flooring, fittings, and final touches",
    icon: PaintBucket,
  },
];

const whyChooseUs = [
  { label: "15+ Years of Experience", icon: Award },
  { label: "Licensed & Insured", icon: ShieldCheck },
  { label: "Skilled Team of Experts", icon: Users },
  { label: "High-Quality Materials", icon: Package },
  { label: "On-Time Delivery", icon: Clock },
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
    avatar: "https://picsum.photos/seed/avatar1/80/80",
  },
  {
    name: "Anita R.",
    project: "Row House",
    quote: "Highly professional team, always on schedule, and transparent throughout.",
    avatar: "https://picsum.photos/seed/avatar2/80/80",
  },
  {
    name: "Vikram M.",
    project: "Farmhouse",
    quote: "Top-notch quality and great communication from start to finish.",
    avatar: "https://picsum.photos/seed/avatar3/80/80",
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
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/20" />
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
            and on-time results.
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

      <section className="bg-navy py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-white">Our Services</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-lg bg-white/5 p-6 transition hover:bg-white/10"
                >
                  <Icon className="h-8 w-8 text-amber-light" strokeWidth={1.5} />
                  <h3 className="mt-4 font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/60">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-2">
          <div className="relative h-80 w-full overflow-hidden rounded-lg">
            <Image
              src="https://picsum.photos/seed/whyus/600/700"
              alt="Why choose One O Buildcon"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy">
              Why Choose One O Buildcon
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {whyChooseUs.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-md border border-black/5 p-4"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-amber" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-navy/80">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-navy">Our Projects</h2>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-block rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-dark"
          >
            View All Projects →
          </Link>
        </div>
      </section>

      <section className="bg-navy-dark py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-white">
            Client Testimonials
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-lg bg-white/5 p-6 text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-amber-light">{t.project}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/80">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 text-center text-white">
        <Image
          src="https://picsum.photos/seed/ctabg/1600/600"
          alt="Construction project"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-bold">Planning a Construction Project?</h2>
          <p className="mt-2 text-white/80">
            Let One O Buildcon bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-md bg-amber px-6 py-3 font-semibold text-navy-dark transition hover:bg-amber-light"
          >
            Request a Free Quote →
          </Link>
        </div>
      </section>
    </main>
  );
}
