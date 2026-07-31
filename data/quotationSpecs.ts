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
  notes?: string[];
  payments?: PayRow[];
  areaPercents?: { plinth: number; ground: number; upper: number; terrace: number };
};

// Special notes are identical for both packages.
export const defaultSpecialNotes: string[] = [
  "Electricity and water are in the client's scope. Borewell and electric meter shall be installed by the client. Water tankers, if required, shall be provided by the client, including space for storage until the underground water tank is built.",
  "External facade work such as mouldings is not included in this quotation; standard plaster is considered. Any external detailing will be charged extra.",
  "Landscaping of the outer area beside the parking area is not included.",
  "Compound wall and gate are not included in this quotation.",
  "Curing of the project is in the client's scope, including a storage room for material and labour on site.",
  "If an RCC overhead water tank is required, it will be charged extra.",
  "Excavation and back-filling are not included and will be in the client's scope.",
  "GST extra on base amount (18%).",
  "Tiles have a minor natural bend, so a slight difference in level may occur — this is normal.",
  "Minor cracks may appear in walls due to heat of hydration — this is normal and causes no harm to the structure.",
  "Any work other than that mentioned in this quotation will be charged extra.",
  "Quotation is valid up to 15 days.",
  "In case of any natural disaster, pandemic or war, the project timeline will be extended accordingly.",
  "In bathrooms and balconies, where the area is small, some water may collect in places — this is normal.",
  "If a drainage line is available, all lines are connected to the drain line; no septic tank is constructed.",
];

export const quotationPresets: QuotationPreset[] = [
  {
    id: "basic",
    label: "Basic — ₹1499/sqft",
    rate: 1499,
    sections: [
      { title: "RCC DETAILS", items: [
        "Work done as per the architect's drawing. Plate shuttering for slab. Steel: Uma / Kalika or equivalent. Cement: Birla Super 53 Grade.",
      ]},
      { title: "BRICKWORK, PLASTER & WATERPROOFING DETAILS", items: [
        `Brick work as per the architect's drawing, using red brick. All walls 6" brick work.`,
        "Inside sanla finish 12mm thick plaster for all walls. Outside plaster single coat — 12mm plaster dabba finish. JK cement and artificial / plaster sand used.",
        "Brickbat waterproofing shall be done in all bathrooms using Dr. Fixit URP.",
        "Terrace waterproofing shall be done in ghotai finish using Dr. Fixit LW URP liquid and JK Super cement.",
      ]},
      { title: "GRILL, RAILING, SLIDING WINDOW & DOOR DETAILS", items: [
        "Window grill using 10mm bar in typical Bombay design in MS, or as per selection on site.",
        'SS railing for staircase — 2" round pipe, 0.75" pipe and 1.5" pipe, 10mm glass for balcony.',
        "All sliding windows shall be 3-track, including mosquito net and white powder coating (18x40mm section).",
        "Ventilators with louvered glass and mosquito net shall be provided for bathrooms and toilets.",
        "All door frames in typical Steel Gray granite. Different granite selection shall cost extra.",
        "Flush doors laminated on both sides for the main door and bedroom doors, including Europa lock for all bedroom doors, hinges, fittings, etc.",
        "Bathroom door in FRP material, including fittings, tadi patti, hinges, etc.",
      ]},
      { title: "TILE & GRANITE DETAILS", items: [
        "Toilet / bathroom dado using 300 x 600mm tile.",
        "Bathroom flooring in anti-skid tile 300 x 300mm.",
        "600 x 600mm tile is used for flooring, up to the considered rate.",
        "All door frames fitted in Steel Gray granite.",
        "All window frames fitted with Steel Gray granite with chamfer polish in single frame.",
        "Staircase riser and tread shall be covered with Steel Gray granite.",
        "For the kitchen platform, Z-black granite will be used.",
        'Parking tile of size 16" x 16".',
        "If any selected material is above or below the mentioned rate, the rate difference for material and labour will be added to the billing.",
      ]},
      { title: "PLUMBING DETAILS", items: [
        "All inside lines are concealed and outside lines are clamped. Pipes used: CPVC, UPVC, PVC (Prince brand).",
        "For bathroom — P-trap commode, flush tank, mixer set, wash basin (Cera / Varmora brand).",
        "External plumbing, chamber making, and connection to the septic tank / main line chamber.",
      ]},
      { title: "ELECTRICAL DETAILS", items: [
        "All electrical points are concealed (25-18mm pipe), Polycab wire, Anchor Roma switch and socket.",
        "Per floor, individual main 2.5 sq mm wire; normal points 1 sq mm; power points 1.5 sq mm.",
        "Per room 5 points are given — 1 fan point, 1 light point, 1 AC point, 1 charging point and 1 extra point.",
        "Fittings such as lights and fans are provided by the client.",
        "Wiring for the inverter and the inverter itself are not included; these will be charged extra as per requirement.",
        "All electrical work is considered after the electric meter and main wire connection from MSEB, arranged by the client.",
      ]},
      { title: "POP WORK", items: ["Not included."] },
      { title: "PAINTING", items: [
        "Exterior surface — Nerolac Suraksha Plus including 1 coat primer and 2 coats paint.",
        "Interior — Oil Bound Distemper (OBD) including 1 coat primer, 2 coats putty and 2 coats paint.",
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
        "Work done as per the architect's drawing. Plate shuttering for slab. Steel: Uma / Kalika or equivalent. Cement: Birla Super 53 Grade.",
      ]},
      { title: "BRICKWORK, PLASTER & WATERPROOFING DETAILS", items: [
        `Brick work as per the architect's drawing, using red brick. Outer wall 9" and all internal walls 6".`,
        "Inside taar finish 12mm thick plaster for all walls. Outside plaster double coat — one coat 12mm taar plaster and second coat 12mm plaster dabba finish. JK cement and artificial / plaster sand used.",
        "Brickbat waterproofing shall be done in all bathrooms using Dr. Fixit URP.",
        "Terrace waterproofing shall be done in brickbat using Dr. Fixit LW URP liquid and JK Super cement.",
      ]},
      { title: "GRILL, RAILING, SLIDING WINDOW & DOOR DETAILS", items: [
        "Window grill using 10mm bar in typical Bombay design in MS, or as per selection on site.",
        'SS railing for staircase — 2" round pipe, 0.75" pipe and 1.5" pipe, 10mm glass for balcony.',
        "All sliding windows shall be 3-track, including mosquito net and white powder coating (18x40mm section).",
        "Ventilators with louvered glass and mosquito net shall be provided for bathrooms and toilets.",
        "All door frames in typical Z-black granite. Different granite selection shall cost extra.",
        "Flush doors laminated on both sides for the main door and bedroom doors, including Europa lock for all bedroom doors, hinges, fittings, etc.",
        "Bathroom door in FRP material, including fittings, tadi patti, hinges, etc.",
      ]},
      { title: "TILE & GRANITE DETAILS", items: [
        "Toilet / bathroom dado using 1200 x 600mm tile.",
        "Bathroom and balcony flooring in anti-skid tile 600 x 600mm.",
        "1200 x 1200mm tile is used for flooring, up to the considered rate.",
        "All door frames fitted in Z-black granite.",
        "All window frames fitted with pearl black granite with chamfer polish in single frame.",
        "Staircase riser and tread shall be covered with Z-black granite.",
        "For the kitchen platform, quartz will be used.",
        'Parking tile of size 16" x 16".',
        "If any selected material is above or below the mentioned rate, the rate difference for material and labour will be added to the billing.",
      ]},
      { title: "PLUMBING DETAILS", items: [
        "All inside lines are concealed and outside lines are clamped. Pipes used: CPVC, UPVC, PVC (Prince brand).",
        "For bathroom — wall hanging commode, flush valve, diverter spout set, wash basin (Cera / Varmora brand).",
        "External plumbing, chamber making, and connection to the septic tank / main line chamber.",
      ]},
      { title: "ELECTRICAL DETAILS", items: [
        "All electrical points are concealed (25-18mm pipe), Polycab wire, Anchor Roma switch and socket.",
        "Per floor, individual main 2.5 sq mm wire; normal points 1 sq mm; power points 1.5 sq mm.",
        "All electrical points are as per the drawing given by the architect.",
        "Fittings such as lights and fans are in the client's scope. The architect is to provide the position of lights and fans one week before the slab.",
        "Wiring for the inverter and the inverter itself are not included; these will be charged extra as per requirement.",
        "All electrical work is considered after the electric meter and main wire connection from MSEB.",
      ]},
      { title: "POP WORK", items: ["POP (Plaster of Paris) for all internal walls, excluding bathrooms and ceilings."] },
      { title: "PAINTING", items: [
        "Exterior surface — Nerolac Suraksha including 1 coat primer and 2 coats paint.",
        "Interior — Tractor Emulsion (Asian) including 1 coat primer, 2 coats putty and 2 coats paint.",
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
    areaPercents: { plinth: 1, ground: 0.75, upper: 1, terrace: 0.5 },
    sections: [
      { title: "RATE", items: [
        "As per the below mode of measuring and scope of works, the rate for R.C.C. and brick work plaster work (for built-up area) will be:",
        "For work — Rs. 870 / sq.ft + taxes.",
      ]},
      { title: "FOR OTHER WORKS", items: [
        "Raft — Rs. 600 / sq.ft + taxes.",
        "Retaining wall — Rs. 550 / sq.ft + taxes.",
        "RCC tank — Rs. 25 / litre.",
        "Extra height shuttering area rate will differ (up to 3m — 1 time; 3m to 3.5m — 1.25 times; 3.5m to 4.5m — 1.5 times; up to 6m — 2 times).",
      ]},
      { title: "SCOPE OF THE WORK", items: [
        "All work done as per the drawing provided by the architect.",
        'For brick work, outer wall 9" and all internal walls 6" — red brick or AAC block.',
        "For outside, double coat plaster of 12mm each — first taar plaster and second dabba finish coat.",
        "Internally, all taar plaster.",
        "RCC work as per the structural drawings.",
        "Floor to floor height considered as 11 feet.",
      ]},
      { title: "MATERIAL USAGE", items: [
        "Steel — Uma / Kalika / equivalent brand (Fe 500 / 550).",
        "Cement — Birla Super for RCC, and JK Super for brick work plaster.",
        "Brick — red brick / AAC block.",
        "Plaster — M sand (plaster sand).",
        "Aggregate — crush sand for other work.",
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
    notes: [
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
    ],
  },
];
