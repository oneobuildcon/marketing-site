import Image from "next/image";

export const metadata = {
  title: "Projects | One O Buildcon",
};

const projects = [
  {
    name: "Skyline Bungalow",
    type: "Premium Bungalow",
    location: "Pune",
    desc: "A premium bungalow with custom interiors and landscaped grounds.",
    img: "https://picsum.photos/seed/proj11/500/350",
  },
  {
    name: "Greenfield Row Houses",
    type: "Row House",
    location: "Pune",
    desc: "A gated row house community with modern amenities and shared green spaces.",
    img: "https://picsum.photos/seed/proj12/500/350",
  },
  {
    name: "The Orchid Residency",
    type: "Residential Building",
    location: "Lonavala",
    desc: "A multi-storey residential building with quality finishes and ample parking.",
    img: "https://picsum.photos/seed/proj13/500/350",
  },
  {
    name: "Riverside Farmhouse",
    type: "Farmhouse",
    location: "Mumbai",
    desc: "A countryside farmhouse retreat built to blend with its natural surroundings.",
    img: "https://picsum.photos/seed/proj14/500/350",
  },
  {
    name: "Foundation & Slab Work",
    type: "RCC Work",
    location: "Pune",
    desc: "Structural RCC work covering foundations, columns, and slab casting.",
    img: "https://picsum.photos/seed/proj15/500/350",
  },
  {
    name: "Hilltop Bungalow",
    type: "Premium Bungalow",
    location: "Lonavala",
    desc: "A luxury hilltop bungalow with panoramic views and premium fittings.",
    img: "https://picsum.photos/seed/proj16/500/350",
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="overflow-hidden rounded-lg border border-black/5 shadow-sm"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.img}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
                <span className="absolute right-3 top-3 rounded-full bg-amber px-3 py-1 text-xs font-semibold text-navy-dark">
                  {project.type}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-navy">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-navy/60">{project.location}</p>
                <p className="mt-3 text-sm text-navy/70">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
