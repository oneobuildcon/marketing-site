// Per-package quotation presets, transcribed from the owner's Excel samples
// (1450 sheet → Basic ₹1499, 1650 sheet → Standard ₹1649). Everything here is
// only the DEFAULT — the admin can edit every line before generating a PDF.

export type SpecSection = { title: string; items: string[] };
export type RateGroup = { work: string; items: string[] };

export type PayRow = { stage: string; percent: string };

export type QuotationPreset = {
  id: string;
  label: string;
  rate: number;
  sections: SpecSection[];
  rates: RateGroup[];
  brands: RateGroup[];
  // Optional overrides — packages that measure or bill differently.
  notes?: SpecSection[];
  payments?: PayRow[];
  areaPercents?: { plinth: number; ground: number; parking: number; upper: number; terrace: number };
};

// Special notes, grouped so the client can see at a glance what they arrange,
// what costs extra, and what is simply normal on a site. Numbering restarts in
// each group. A group with an empty title prints as a plain list — that is how
// the RCC package keeps its single flat set of notes.
export const defaultSpecialNotes: SpecSection[] = [
  { title: "CLIENT'S SCOPE", items: [
    "Electricity and water connections, borewell and electric meter.",
    "Water tankers, if required, and space to store water until the underground tank is ready.",
    "Curing of the project is in the client's scope.",
    "A store room on site for material and labour.",
    "Excavation and back-filling.",
  ]},
  { title: "NOT INCLUDED IN THIS QUOTATION", items: [
    "External facade work such as mouldings; standard plaster is considered. Any external detailing is charged extra.",
    "Landscaping of the outer area beside the parking.",
    "Compound wall and gate.",
    "RCC overhead water tank, if required, is charged extra.",
    "Any work not listed in this quotation is charged extra.",
  ]},
  { title: "COMMERCIAL TERMS", items: [
    "GST 18% extra on the base amount.",
    "This quotation is valid for 15 days.",
    "In case of natural disaster, pandemic or war, the project timeline extends accordingly.",
  ]},
  { title: "PLEASE NOTE", items: [
    "Tiles have a minor natural bend, so a slight difference in level may occur — this is normal.",
    "Minor cracks may appear in walls due to heat of hydration — this is normal and causes no harm to the structure.",
    "In bathrooms and balconies, where the area is small, some water may collect — this is normal.",
    "Where a drainage line is available, all lines connect to it; no septic tank is constructed.",
  ]},
];

const basePresets: QuotationPreset[] = [
  {
    id: "basic",
    label: "Basic — ₹1499/sqft",
    rate: 1499,
    sections: [
      { title: "RCC DETAILS", items: [
        "As per the architect's drawing, with plate shuttering for slabs. Steel: Uma / Kalika or equivalent. Cement: Birla Super 53 Grade.",
      ]},
      { title: "BRICKWORK, PLASTER & WATERPROOFING DETAILS", items: [
        `Brick work as per the architect's drawing, in red brick. All walls 6".`,
        "Internal walls — 12mm sanla-finish plaster. External walls — 12mm single-coat dabba finish. JK cement with plaster sand.",
        "Brickbat waterproofing in all bathrooms, using Dr. Fixit URP.",
        "Terrace waterproofing in ghotai finish, using Dr. Fixit LW URP and JK Super cement.",
      ]},
      { title: "GRILL, RAILING, SLIDING WINDOW & DOOR DETAILS", items: [
        "MS window grills in 10mm bar, typical Bombay design, or as selected on site.",
        'Staircase — SS railing in 2" round, 1.5" and 0.75" pipe. Balcony — 10mm glass railing.',
        "Sliding windows — 3-track, 18x40mm section, white powder coated, with mosquito net.",
        "Bathroom and toilet ventilators with louvered glass and mosquito net.",
        "Door frames in Steel Gray granite. Any other granite is charged extra.",
        "Main and bedroom doors — flush, laminated both sides, with Europa locks, hinges and fittings.",
        "Bathroom doors in FRP, with tadi patti, hinges and fittings.",
      ]},
      { title: "TILE & GRANITE DETAILS", items: [
        "Bathroom dado — 300 x 600mm tile.",
        "Bathroom flooring — 300 x 300mm anti-skid tile.",
        "Flooring — 600 x 600mm tile, within the rate considered.",
        "Window frames in single-piece Steel Gray granite, chamfer polished.",
        "Staircase treads and risers in Steel Gray granite.",
        "Kitchen platform in Z-black granite.",
        'Parking tile — 16" x 16".',
        "Material selected above or below the stated rate is billed at the difference, including labour.",
      ]},
      { title: "PLUMBING DETAILS", items: [
        "Internal lines concealed, external lines clamped. CPVC, UPVC and PVC pipes (Prince).",
        "Bathroom — P-trap commode, flush tank, mixer set and wash basin (Cera / Varmora).",
        "External plumbing, chambers, and connection to the septic tank or main line.",
      ]},
      { title: "ELECTRICAL DETAILS", items: [
        "Concealed points in 25-18mm pipe, Polycab wire, Anchor Roma switches and sockets.",
        "Per floor — 2.5 sq mm main; 1 sq mm light points; 1.5 sq mm power points.",
        "Five points per room: fan, light, AC, charging and one spare.",
        "Light and fan fittings are provided by the client.",
        "Inverter and its wiring are not included; charged extra as required.",
        "Electrical work starts after the MSEB meter and main connection, arranged by the client.",
      ]},
      { title: "POP WORK", items: ["Not included."] },
      { title: "PAINTING", items: [
        "Exterior — Nerolac Suraksha Plus: 1 coat primer, 2 coats paint.",
        "Interior — Oil Bound Distemper: 1 coat primer, 2 coats putty, 2 coats paint.",
      ]},
      { title: "GYPSUM CEILING", items: ["Not included."] },
    ],
    rates: [
      { work: "Tile", items: ["2' x 2'  —  Rs. 35 / sq.ft", "2' x 1'  —  Rs. 30 / sq.ft", '16" x 16"  —  Rs. 35 / sq.ft'] },
      { work: "Granite", items: ["Windows  —  Rs. 60 / sq.ft", "Door  —  Rs. 60 / sq.ft", "Kitchen  —  Rs. 180 / sq.ft"] },
      { work: "Brick", items: ["Rs. 14 / piece"] },
      { work: "Plumbing", items: ["P-trap / S-trap commode (Rs. 4,000)", "Flush tank (Rs. 2,000)", "Mixer (Rs. 4,000)", "Wash basin (Rs. 2,000)", "Indian commode (Rs. 2,000)", "2000 litre tank — Plasto brand"] },
      { work: "Grill", items: ["Rs. 150 / sq.ft"] },
      { work: "SS Railing", items: ["Balcony  —  Rs. 550 / rft", "Staircase  —  Rs. 550 / rft"] },
    ],
    brands: [
      { work: "Steel", items: ["Uma, Kalika or equivalent"] },
      { work: "RCC Work Cement", items: ["Birla Super 53 Grade"] },
      { work: "Brick Work Plaster", items: ["JK Super 43 Grade"] },
      { work: "Plumbing Pipe", items: ["Prince / Paras"] },
      { work: "Plumbing CP Fitting", items: ["Cera or Varmora"] },
      { work: "Water Tank", items: ["Plasto"] },
      { work: "Waterproofing", items: ["Dr. Fixit URP and LW+"] },
      { work: "Electrical Work", items: ["Pipe — Diamond or Polycab", "Wire — Polycab", "Switch & Socket — Anchor Roma Penta"] },
      { work: "Painting", items: ["Interior — Oil Bound Distemper (OBD)", "Exterior — Nerolac Suraksha Plus"] },
    ],
  },
  {
    id: "standard",
    label: "Standard — ₹1649/sqft",
    rate: 1649,
    sections: [
      { title: "RCC DETAILS", items: [
        "As per the architect's drawing, with plate shuttering for slabs. Steel: Uma / Kalika or equivalent. Cement: Birla Super 53 Grade.",
      ]},
      { title: "BRICKWORK, PLASTER & WATERPROOFING DETAILS", items: [
        `Brick work as per the architect's drawing, in red brick. Outer walls 9", internal walls 6".`,
        "Internal walls — 12mm taar-finish plaster. External walls — double coat: 12mm taar plaster, then 12mm dabba finish. JK cement with plaster sand.",
        "Brickbat waterproofing in all bathrooms, using Dr. Fixit URP.",
        "Terrace waterproofing in brickbat, using Dr. Fixit LW URP and JK Super cement.",
      ]},
      { title: "GRILL, RAILING, SLIDING WINDOW & DOOR DETAILS", items: [
        "MS window grills in 10mm bar, typical Bombay design, or as selected on site.",
        'Staircase — SS railing in 2" round, 1.5" and 0.75" pipe. Balcony — 10mm glass railing.',
        "Sliding windows — 3-track, 18x40mm section, white powder coated, with mosquito net.",
        "Bathroom and toilet ventilators with louvered glass and mosquito net.",
        "Door frames in Z-black granite. Any other granite is charged extra.",
        "Main and bedroom doors — flush, laminated both sides, with Europa locks, hinges and fittings.",
        "Bathroom doors in FRP, with tadi patti, hinges and fittings.",
      ]},
      { title: "TILE & GRANITE DETAILS", items: [
        "Bathroom dado — 1200 x 600mm tile.",
        "Bathroom and balcony flooring — 600 x 600mm anti-skid tile.",
        "Flooring — 1200 x 1200mm tile, within the rate considered.",
        "Window frames in single-piece pearl black granite, chamfer polished.",
        "Staircase treads and risers in Z-black granite.",
        "Kitchen platform in quartz.",
        'Parking tile — 16" x 16".',
        "Material selected above or below the stated rate is billed at the difference, including labour.",
      ]},
      { title: "PLUMBING DETAILS", items: [
        "Internal lines concealed, external lines clamped. CPVC, UPVC and PVC pipes (Prince).",
        "Bathroom — wall-hung commode, flush valve, diverter spout set and wash basin (Cera / Varmora).",
        "External plumbing, chambers, and connection to the septic tank or main line.",
      ]},
      { title: "ELECTRICAL DETAILS", items: [
        "Concealed points in 25-18mm pipe, Polycab wire, Anchor Roma switches and sockets.",
        "Per floor — 2.5 sq mm main; 1 sq mm light points; 1.5 sq mm power points.",
        "Electrical points as per the architect's drawing.",
        "Light and fan fittings are provided by the client. Their positions to be given by the architect one week before the slab.",
        "Inverter and its wiring are not included; charged extra as required.",
        "Electrical work starts after the MSEB meter and main connection.",
      ]},
      { title: "POP WORK", items: ["POP (Plaster of Paris) for all internal walls, excluding bathrooms and ceilings."] },
      { title: "PAINTING", items: [
        "Exterior — Nerolac Suraksha: 1 coat primer, 2 coats paint.",
        "Interior — Asian Tractor Emulsion: 1 coat primer, 2 coats putty, 2 coats paint.",
      ]},
      { title: "GYPSUM CEILING", items: ["Not included."] },
    ],
    rates: [
      { work: "Tile", items: ["4' x 2'  —  Rs. 50 / sq.ft", "2' x 2'  —  Rs. 35 / sq.ft", '16" x 16"  —  Rs. 35 / sq.ft'] },
      { work: "Granite", items: ["Windows  —  Rs. 60 / sq.ft", "Door  —  Rs. 180 / sq.ft", "Kitchen  —  Rs. 300 / sq.ft"] },
      { work: "Brick", items: ["Rs. 14 / piece"] },
      { work: "Plumbing", items: ["Wall hanging commode (Rs. 8,000)", "Flush valve (Rs. 6,000)", "Diverter (Rs. 6,000)", "Wash basin (Rs. 2,500)", "Indian commode (Rs. 2,000)", "2000 litre tank — Plasto brand"] },
      { work: "Grill", items: ["Rs. 150 / sq.ft"] },
      { work: "SS Railing", items: ["Balcony  —  Rs. 800 / rft", "Staircase  —  Rs. 550 / rft"] },
    ],
    brands: [
      { work: "Steel", items: ["Uma, Kalika or equivalent"] },
      { work: "RCC Work Cement", items: ["Birla Super 53 Grade"] },
      { work: "Brick Work Plaster", items: ["JK Super 43 Grade"] },
      { work: "Plumbing Pipe", items: ["Prince"] },
      { work: "Plumbing CP Fitting", items: ["Cera or Varmora"] },
      { work: "Water Tank", items: ["Plasto"] },
      { work: "POP", items: ["Sadab Gypsum"] },
      { work: "Waterproofing", items: ["Dr. Fixit URP and LW+"] },
      { work: "Electrical Work", items: ["Pipe — Diamond or Polycab", "Wire — Polycab", "Switch & Socket — Anchor Roma Penta"] },
      { work: "Painting", items: ["Interior — Nerolac Tractor Emulsion", "Exterior — Nerolac Suraksha Plus"] },
    ],
  },
  {
    id: "rcc",
    label: "RCC & Brick Work — ₹870/sqft",
    rate: 870,
    areaPercents: { plinth: 1, ground: 0.75, parking: 0.75, upper: 1, terrace: 0.5 },
    sections: [
      { title: "RATE", items: [
        "Rates for RCC and brick work with plaster, on built-up area, as per the measurement basis and scope below:",
        "For work — Rs. 870 / sq.ft + taxes.",
      ]},
      { title: "FOR OTHER WORKS", items: [
        "Raft — Rs. 600 / sq.ft + taxes.",
        "Retaining wall — Rs. 550 / sq.ft + taxes.",
        "RCC tank — Rs. 25 / litre.",
        "Shuttering rate varies with height: up to 3m — 1x; 3m to 3.5m — 1.25x; 3.5m to 4.5m — 1.5x; up to 6m — 2x.",
      ]},
      { title: "SCOPE OF THE WORK", items: [
        "All work as per the architect's drawing.",
        'For brick work, outer wall 9" and all internal walls 6" — red brick or AAC block.',
        "External — double coat plaster, 12mm each: taar plaster, then dabba finish.",
        "Internal — taar plaster throughout.",
        "RCC work as per the structural drawings.",
        "Floor-to-floor height considered as 11 feet.",
      ]},
      { title: "MATERIAL USAGE", items: [
        "Steel — Uma / Kalika / equivalent brand (Fe 500 / 550).",
        "Cement — Birla Super for RCC, and JK Super for brick work plaster.",
        "Brick — red brick / AAC block.",
        "Plaster — M sand (plaster sand).",
        "Aggregate — crush sand.",
        "Chicken mesh and chemical for plaster.",
      ]},
    ],
    rates: [],
    brands: [
      { work: "Steel", items: ["Uma / Kalika / equivalent (Fe 500 / 550)"] },
      { work: "RCC Work Cement", items: ["Birla Super"] },
      { work: "Brick Work Plaster", items: ["JK Super"] },
      { work: "Brick", items: ["Red brick / AAC block"] },
      { work: "Plaster Sand", items: ["M sand (plaster sand)"] },
      { work: "Aggregate", items: ["Crush sand for other work"] },
      { work: "Plaster Reinforcement", items: ["Chicken mesh and chemical"] },
    ],
    payments: [
      { stage: "Advance / Booking", percent: "15" },
      { stage: "After Plinth", percent: "10" },
      { stage: "After 1st RCC Slab", percent: "10" },
      { stage: "After 2nd RCC Slab", percent: "10" },
      { stage: "After 3rd RCC Slab", percent: "10" },
      { stage: "After 4th Slab", percent: "10" },
      { stage: "At the start of Brick work", percent: "10" },
      { stage: "After Brickwork (2 floors)", percent: "10" },
      { stage: "Before start of outer Plaster", percent: "5" },
      { stage: "At the start of inside Plaster", percent: "5" },
      { stage: "On Handover / Possession", percent: "5" },
    ],
    notes: [{ title: "", items: [
      "Electricity and water are in the client's scope. Borewell and electric meter shall be installed by the client. Water tankers, if required, shall be provided by the client, including space for storage until the underground water tank is built.",
      "External facade work such as mouldings is not included in this quotation; standard plaster is considered. Any external detailing will be charged extra.",
      "Landscaping of the outer area beside the parking area is not included.",
      "Compound wall and gate are not included in this quotation.",
      "Curing of the project is in the client's scope, including a storage room for material and labour on site.",
      "If an RCC overhead water tank is required, it will be charged extra.",
      "GST extra on base amount (18%).",
      "Minor cracks may appear in walls due to heat of hydration — this is normal and causes no harm to the structure.",
      "Any work other than that mentioned in this quotation will be charged extra.",
      "Quotation is valid up to 15 days.",
      "If excavation and back-filling are done by the client, the plinth rate will be considered as 75% of the slab area.",
      "The quotation considers manual concreting. If RMC is required, the extra amount will be added to the quote.",
      "Any disturbance or problem caused by a neighbour or the corporation is to be handled and resolved by the client.",
      "In case of any natural disaster, pandemic or war, the project timeline will be extended accordingly.",
    ]}],
  },
];

// Premium and Royal start life as exact copies of Standard, at the rates shown
// on the website's Packages page. They exist so a quotation can be raised for
// them today; every line is editable in the admin before the PDF is generated,
// so the specifications can be tuned package by package over time.
const standard = basePresets.find((p) => p.id === "standard")!;

function copyOfStandard(id: string, name: string, rate: number): QuotationPreset {
  return {
    ...structuredClone(standard),
    id,
    label: `${name} — ₹${rate}/sqft`,
    rate,
  };
}

export const quotationPresets: QuotationPreset[] = [
  ...basePresets,
  copyOfStandard("premium", "Premium", 1949),
  copyOfStandard("royal", "Royal", 2099),
];
