// Locality / service landing pages. Each has genuinely unique copy (intro,
// services emphasis, nearby areas and FAQs) so they are NOT near-duplicate
// city pages, which Google filters out.

export type AreaFaq = { q: string; a: string };
export type ServiceArea = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  badge: string;
  locality: string;
  intro: string[];
  services: { title: string; desc: string }[];
  why: string[];
  nearby: string[];
  faqs: AreaFaq[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "rcc-contractor-pune",
    metaTitle: "RCC Contractor in Pune | One O Buildcon – RCC Framework & Slab Work",
    metaDescription:
      "Looking for a reliable RCC contractor in Pune? One O Buildcon builds strong RCC frameworks — footings, columns, beams and slabs — using Birla Super 53 cement and Uma/Kalika steel, with transparent per-sqft pricing.",
    h1: "RCC Contractor in Pune",
    badge: "RCC Specialists · Pune",
    locality: "Pune",
    intro: [
      "One O Buildcon is a Pune-based RCC contractor delivering structurally sound frameworks for bungalows, row houses and multi-storey residential buildings. Every structure we pour is designed to the architect's and structural engineer's drawings, with plate shuttering for clean, true slabs.",
      "We use trusted materials as standard — Birla Super 53 Grade cement for RCC work and Uma / Kalika (or equivalent) TMT steel — so the frame your home stands on is built to last. Our rates are quoted per square foot of built-up area with no hidden charges.",
      "From excavation and footing to columns, beams, plinth and each floor slab, our site team manages the RCC stage with proper curing and quality checks at every pour.",
    ],
    services: [
      { title: "Footing & Foundation", desc: "Excavation, PCC and footing as per structural design." },
      { title: "Columns & Beams", desc: "RCC columns and beams poured to drawing, plumb and true." },
      { title: "Slab Work", desc: "Plate-shuttered slabs for each floor with proper curing." },
      { title: "Plinth & Structure", desc: "Complete RCC frame up to terrace, ready for brickwork." },
    ],
    why: [
      "Birla Super 53 cement & Uma/Kalika steel as standard",
      "Plate shuttering for clean, accurate slabs",
      "Transparent per-sqft pricing, no hidden costs",
      "Proper curing & on-site quality checks",
      "On-time stage-wise progress",
    ],
    nearby: ["Charholi", "Vishrantwadi", "Wagholi", "Kharadi", "Dhanori", "Lohegaon"],
    faqs: [
      { q: "What is your RCC construction rate per sq ft in Pune?", a: "Our rates depend on the package and specification you choose. Use our online cost calculator for an instant estimate, and we'll confirm an exact per-sqft figure after a site visit — free of charge." },
      { q: "Which cement and steel do you use for RCC work?", a: "As standard we use Birla Super 53 Grade cement for RCC and Uma / Kalika (or equivalent) TMT steel. Brands can be discussed as per your requirement." },
      { q: "Do you handle the RCC frame only, or full construction?", a: "Both. We can take on the RCC / structure stage alone, or deliver the complete build from planning through interior finishing." },
    ],
  },
  {
    slug: "bungalow-construction-pimpri-chinchwad",
    metaTitle: "Bungalow Construction in Pimpri-Chinchwad | One O Buildcon",
    metaDescription:
      "Premium bungalow construction in Pimpri-Chinchwad by One O Buildcon. End-to-end custom home building — design, RCC, finishing — with transparent package pricing and on-time delivery.",
    h1: "Bungalow Construction in Pimpri-Chinchwad",
    badge: "Custom Bungalows · PCMC",
    locality: "Pimpri-Chinchwad",
    intro: [
      "Building your own bungalow in Pimpri-Chinchwad is a once-in-a-lifetime project — and One O Buildcon manages it end to end, from the first floor plan to handing over your keys. We build premium, custom bungalows tailored to how your family actually lives.",
      "You choose a package that fits your budget, and everything is transparent from day one — the specification, the per-sqft rate, and a clear payment schedule tied to construction stages. No surprises, no hidden costs.",
      "Because we are locally based near Pimpri-Chinchwad, our team is on your site regularly, keeping quality and timelines on track through every stage of your bungalow's construction.",
    ],
    services: [
      { title: "Custom Design", desc: "Architectural, structural, electrical and plumbing drawings." },
      { title: "Full Structure", desc: "RCC frame, brickwork, plaster and waterproofing." },
      { title: "Finishing", desc: "Flooring, kitchen, bathrooms, doors, windows and paint." },
      { title: "Turnkey Handover", desc: "A move-in-ready bungalow, delivered on schedule." },
    ],
    why: [
      "Fully custom bungalows built to your plan",
      "Transparent package pricing & stage-wise payments",
      "Premium materials and finishes",
      "Locally based — regular on-site supervision",
      "On-time, quality-checked delivery",
    ],
    nearby: ["Pimpri", "Chinchwad", "Nigdi", "Akurdi", "Bhosari", "Moshi"],
    faqs: [
      { q: "How much does it cost to build a bungalow in Pimpri-Chinchwad?", a: "The cost depends on your built-up area and chosen package. Our cost calculator gives an instant estimate; after a site visit we prepare a detailed, fixed quotation for free." },
      { q: "Do you provide the design and drawings?", a: "Yes — architectural, structural, electrical and plumbing drawings are included in our packages." },
      { q: "How long does a bungalow take to build?", a: "Timelines depend on size and scope. We share a realistic stage-wise schedule upfront and keep you updated at every milestone." },
    ],
  },
  {
    slug: "construction-company-charholi",
    metaTitle: "Construction Company in Charholi, Pune | One O Buildcon",
    metaDescription:
      "One O Buildcon is a construction company based in Charholi, Pune — building bungalows, row houses, farmhouses and residential buildings with RCC expertise, transparent pricing and on-time delivery.",
    h1: "Construction Company in Charholi, Pune",
    badge: "Your Local Builder · Charholi",
    locality: "Charholi",
    intro: [
      "One O Buildcon is based in Charholi Budruk, Pune — this is our home ground. Being local means we know the area, the approvals, the soil and the suppliers, and we're on your site quickly whenever you need us.",
      "We build bungalows, row houses, farmhouses and residential buildings, handling everything from planning and RCC work to interior finishing. Whatever you're building in and around Charholi, we take it on end to end.",
      "Our promise is simple: honest per-sqft pricing, quality materials, and delivery on time. You always know what you're paying for and what stage your project is at.",
    ],
    services: [
      { title: "Bungalows", desc: "Custom premium bungalows built to your requirements." },
      { title: "Row Houses", desc: "Planned row house developments, durable and well-built." },
      { title: "Farmhouses", desc: "Farmhouse construction with complete planning and finishing." },
      { title: "Residential Buildings", desc: "Multi-storey residential buildings on a strong RCC frame." },
    ],
    why: [
      "Locally based in Charholi — fast, hands-on service",
      "End-to-end: planning, RCC, finishing",
      "Transparent per-sqft pricing",
      "Quality materials and workmanship",
      "On-time delivery you can count on",
    ],
    nearby: ["Charholi Budruk", "Vishrantwadi", "Dighi", "Lohegaon", "Dhanori", "Moshi"],
    faqs: [
      { q: "Where is One O Buildcon located?", a: "We are based at Patharemala, Charholi Budruk, Pimpri Chinchwad, Pune – 412105, and serve Pune and Pimpri-Chinchwad." },
      { q: "What types of projects do you build?", a: "Bungalows, row houses, farmhouses and residential buildings — from the RCC structure through to complete interior finishing." },
      { q: "How do I get a quote?", a: "Use our online cost calculator for an instant estimate, or contact us and we'll arrange a free site visit and detailed quotation." },
    ],
  },
];

export function getServiceArea(slug: string) {
  return serviceAreas.find((a) => a.slug === slug);
}
