export const metadata = {
  title: "Projects | One O Buildcon",
};

const projects = [
  {
    name: "Skyline Residency",
    type: "Residential",
    location: "Pune",
    desc: "A 24-unit residential complex with modern amenities, completed on schedule.",
  },
  {
    name: "Greenfield Business Park",
    type: "Commercial",
    location: "Pune",
    desc: "A 3-floor office complex with sustainable design and ample parking.",
  },
  {
    name: "The Orchid Villas",
    type: "Residential",
    location: "Lonavala",
    desc: "Eight luxury villas with landscaped gardens and private pools.",
  },
  {
    name: "Riverside Retail Plaza",
    type: "Commercial",
    location: "Mumbai",
    desc: "A retail and dining destination built with high foot-traffic durability.",
  },
];

export default function Projects() {
  return (
    <main>
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-bold">Our Projects</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            A look at some of the work we&apos;re proud to have delivered.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.name}
              className="rounded-lg border border-black/5 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-navy">
                  {project.name}
                </h3>
                <span className="rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
                  {project.type}
                </span>
              </div>
              <p className="mt-1 text-sm text-navy/60">{project.location}</p>
              <p className="mt-3 text-sm text-navy/70">{project.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
