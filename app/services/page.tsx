import Image from "next/image";

export const metadata = {
  title: "Services | One O Buildcon",
};

const services = [
  {
    title: "Premium Bungalows",
    desc: "Custom-designed bungalows with premium finishes, built to your exact specifications from foundation to final touches.",
    img: "https://picsum.photos/seed/bungalow2/500/350",
  },
  {
    title: "Row Houses",
    desc: "Thoughtfully planned row house developments that balance privacy, community, and efficient land use.",
    img: "https://picsum.photos/seed/rowhouse2/500/350",
  },
  {
    title: "Residential Buildings",
    desc: "Multi-storey residential complexes engineered for safety, durability, and comfortable modern living.",
    img: "https://picsum.photos/seed/residential2/500/350",
  },
  {
    title: "Farmhouses",
    desc: "Farmhouse builds designed to blend with natural surroundings while offering modern comfort and durability.",
    img: "https://picsum.photos/seed/farmhouse2/500/350",
  },
  {
    title: "RCC Work",
    desc: "Precision RCC structural work — foundations, columns, slabs, and framing carried out to strict engineering standards.",
    img: "https://picsum.photos/seed/rccwork2/500/350",
  },
];

export default function Services() {
  return (
    <main>
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-bold">Our Services</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Our core expertise — built on quality, precision, and reliability.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="overflow-hidden rounded-lg border border-black/5 shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-navy">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-navy/70">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
