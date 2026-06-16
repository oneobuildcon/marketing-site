export const metadata = {
  title: "Services | One O Buildcon",
};

const services = [
  {
    title: "Residential Construction",
    desc: "Custom home builds and renovations designed around how you live, from foundation to finish.",
  },
  {
    title: "Commercial Projects",
    desc: "Offices, retail outlets, and warehouses delivered with minimal disruption and strict timelines.",
  },
  {
    title: "Interior Fit-Outs",
    desc: "Full interior design and execution — flooring, ceilings, electrical, and furnishing.",
  },
  {
    title: "Renovation & Remodeling",
    desc: "Structural upgrades, layout changes, and aesthetic refreshes for existing properties.",
  },
  {
    title: "Project Management",
    desc: "End-to-end coordination of contractors, materials, and schedules so you don't have to.",
  },
  {
    title: "Architectural Planning",
    desc: "Design consultation and approvals to turn your vision into a buildable plan.",
  },
];

export default function Services() {
  return (
    <main>
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-bold">Our Services</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Comprehensive construction services tailored to your project,
            big or small.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-lg border border-black/5 p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-navy">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-navy/70">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
