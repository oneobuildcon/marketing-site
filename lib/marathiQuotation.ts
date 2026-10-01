// Marathi for the quotation PDF.
//
// Two kinds of text are handled differently. Everything that repeats on every
// quotation — headings, table columns, payment stages, floor names — is
// translated by hand here, because machine translation gets trade terms wrong
// ("built-up area" becomes "अंगभूत क्षेत्र", which no builder in Pune says).
// Only the free-text specification and note lines go through the translator,
// and FIXES below corrects its usual mistakes afterwards.

/** Fixed labels used by the Marathi quotation layout. */
export const L = {
  quotation: "कोटेशन",
  clientName: "ग्राहकाचे नाव",
  phone: "फोन",
  projectLocation: "प्रकल्पाचे ठिकाण",
  address: "पत्ता",
  quotationNo: "कोटेशन क्र.",
  date: "दिनांक",
  validFor: "वैधता",
  duration: "कालावधी",
  floors: "मजले",
  builtUp: "बिल्ट-अप क्षेत्र",
  perSqft: "प्रति चौ.फूट",
  scopeTitle: "कामाची व्याप्ती व तपशील",
  specialNotes: "विशेष सूचना",
  thanking: "धन्यवाद,",
  acceptedByClient: "ग्राहकाची संमती",
  name: "नाव",
  signature: "सही",
  dateShort: "दिनांक",
  ratesBrands: "विचारात घेतलेले दर व ब्रँड",
  ratesConsidered: "विचारात घेतलेले दर",
  brandsUsed: "वापरलेले ब्रँड",
  estimate: "अंदाजित खर्च",
  description: "तपशील",
  approxArea: "अंदाजे क्षेत्र (चौ.फूट)",
  amount: "रक्कम",
  total: "एकूण",
  sqft: "चौ.फूट",
  gstNote: "मूळ रकमेवर १८% जीएसटी अतिरिक्त, विशेष सूचनांनुसार.",
  paymentSchedule: "टप्प्यानुसार पेमेंट शेड्यूल",
  srNo: "अ.क्र.",
  stageOfWork: "कामाचा टप्पा",
  bankDetails: "पेमेंटसाठी बँक तपशील",
  accountName: "खाते नाव",
  accountNumber: "खाते क्रमांक",
  bank: "बँक",
  ifsc: "IFSC",
  branch: "शाखा",
  page: "पान",
  of: "/",
} as const;

/**
 * Exact-match dictionary. Anything found here skips the translator entirely,
 * which keeps headings and stage names consistent from quotation to quotation.
 */
export const TERMS: Record<string, string> = {
  // ── Specification section headings ──
  "RCC WORK": "आरसीसी काम",
  "BRICKWORK, PLASTER & WATERPROOFING": "विटकाम, प्लास्टर व वॉटरप्रूफिंग",
  "GRILLS, RAILINGS, WINDOWS & DOORS": "ग्रिल, रेलिंग, खिडक्या व दरवाजे",
  "TILE & GRANITE WORK": "टाइल व ग्रॅनाइट काम",
  "PLUMBING WORK": "प्लंबिंग काम",
  "ELECTRICAL WORK": "इलेक्ट्रिकल काम",
  "POP WORK": "पीओपी काम",
  PAINTING: "रंगकाम",
  "GYPSUM CEILING": "जिप्सम सीलिंग",
  "RATE CONSIDERED": "विचारात घेतलेला दर",
  "RATES FOR OTHER WORKS": "इतर कामांचे दर",
  "SCOPE OF WORK": "कामाची व्याप्ती",
  "MATERIALS USED": "वापरलेले साहित्य",

  // ── Special note group headings ──
  "CLIENT'S SCOPE": "ग्राहकाची जबाबदारी",
  "NOT INCLUDED IN THIS QUOTATION": "या कोटेशनमध्ये समाविष्ट नाही",
  "COMMERCIAL TERMS": "व्यावसायिक अटी",
  "PLEASE NOTE": "कृपया लक्षात घ्या",

  // ── Rate & brand table rows ──
  Tile: "टाइल",
  Granite: "ग्रॅनाइट",
  Brick: "वीट",
  Plumbing: "प्लंबिंग",
  Grill: "ग्रिल",
  "SS Railing": "एसएस रेलिंग",
  Steel: "स्टील",
  "Cement (RCC)": "सिमेंट (आरसीसी)",
  "Cement (All other work)": "सिमेंट (इतर सर्व कामे)",
  "Plumbing Pipes": "प्लंबिंग पाइप",
  "CP Fittings": "सीपी फिटिंग",
  "Water Tank": "पाण्याची टाकी",
  Waterproofing: "वॉटरप्रूफिंग",
  "Electrical Work": "इलेक्ट्रिकल काम",
  Painting: "रंगकाम",

  // ── Floor and area labels ──
  "Ground Floor": "तळमजला",
  "First Floor": "पहिला मजला",
  "Second Floor": "दुसरा मजला",
  "Third Floor": "तिसरा मजला",
  "Fourth Floor": "चौथा मजला",
  "Fifth Floor": "पाचवा मजला",
  "Sixth Floor": "सहावा मजला",
  "Seventh Floor": "सातवा मजला",
  Plinth: "प्लिंथ",
  Terrace: "टेरेस",
  "Ground Floor — House": "तळमजला — घर",
  "Ground Floor — Parking": "तळमजला — पार्किंग",

  // ── Payment stages ──
  "Advance / Booking": "अ‍ॅडव्हान्स / बुकिंग",
  "After Plinth": "प्लिंथनंतर",
  "After 1st RCC Slab": "पहिल्या आरसीसी स्लॅबनंतर",
  "After 2nd RCC Slab": "दुसऱ्या आरसीसी स्लॅबनंतर",
  "After 3rd RCC Slab": "तिसऱ्या आरसीसी स्लॅबनंतर",
  "After 4th RCC Slab": "चौथ्या आरसीसी स्लॅबनंतर",
  "After 5th RCC Slab": "पाचव्या आरसीसी स्लॅबनंतर",
  "After 6th RCC Slab": "सहाव्या आरसीसी स्लॅबनंतर",
  "After Brickwork (all floors)": "विटकामानंतर (सर्व मजले)",
  "After Brickwork (2 Floors)": "विटकामानंतर (२ मजले)",
  "After Plaster (all floors)": "प्लास्टरनंतर (सर्व मजले)",
  "After Tile & Plumbing Work": "टाइल व प्लंबिंग कामानंतर",
  "After Electrical & POP Work": "इलेक्ट्रिकल व पीओपी कामानंतर",
  "At Start of Brickwork": "विटकाम सुरू करताना",
  "At Start of Inside Plaster": "अंतर्गत प्लास्टर सुरू करताना",
  "Before Outer Plaster": "बाह्य प्लास्टरपूर्वी",
  "Before Painting": "रंगकामापूर्वी",
  "On Handover / Possession": "ताबा देताना",
  "Not included.": "समाविष्ट नाही.",
};

/**
 * Corrections applied after machine translation. Each entry replaces a literal
 * translation with the words actually used on site in Pune.
 */
const FIXES: Array<[RegExp, string]> = [
  [/अंगभूत क्षेत्र/g, "बिल्ट-अप क्षेत्र"],
  [/अंगभूत/g, "बिल्ट-अप"],
  [/मजला क्षेत्र/g, "फ्लोअर एरिया"],
  [/जमिनीचा स्लॅब/g, "ग्राउंड स्लॅब"],
  [/जमिनीच्या स्लॅब/g, "ग्राउंड स्लॅबच्या"],
  [/तळ मजला/g, "तळमजला"],
  [/चौरस फूट/g, "चौ.फूट"],
  [/टार-फिनिश/g, "taar फिनिश"],
  [/वीट बॅट/g, "ब्रिकबॅट"],
  [/छतावरील/g, "टेरेसवरील"],
];

/** Applies the corrections above to a machine-translated string. */
export function polish(text: string): string {
  let out = text;
  for (const [re, to] of FIXES) out = out.replace(re, to);
  return out;
}

/**
 * Rupees in words, Marathi, Indian numbering. The English PDF prints the same
 * figure in English words; this is its counterpart.
 */
export function amountInWordsMr(n: number): string {
  const num = Math.round(Math.abs(n));
  if (!num) return "रुपये शून्य फक्त";

  // Marathi has a distinct word for every number to 99 — they are not built
  // from tens plus units the way English does it, so the list is spelled out.
  const UNDER_100 = [
    "", "एक", "दोन", "तीन", "चार", "पाच", "सहा", "सात", "आठ", "नऊ",
    "दहा", "अकरा", "बारा", "तेरा", "चौदा", "पंधरा", "सोळा", "सतरा", "अठरा", "एकोणीस",
    "वीस", "एकवीस", "बावीस", "तेवीस", "चोवीस", "पंचवीस", "सव्वीस", "सत्तावीस", "अठ्ठावीस", "एकोणतीस",
    "तीस", "एकतीस", "बत्तीस", "तेहतीस", "चौतीस", "पस्तीस", "छत्तीस", "सदतीस", "अडतीस", "एकोणचाळीस",
    "चाळीस", "एक्केचाळीस", "बेचाळीस", "त्रेचाळीस", "चव्वेचाळीस", "पंचेचाळीस", "सेहेचाळीस", "सत्तेचाळीस", "अठ्ठेचाळीस", "एकोणपन्नास",
    "पन्नास", "एक्कावन्न", "बावन्न", "त्रेपन्न", "चोपन्न", "पंचावन्न", "छप्पन्न", "सत्तावन्न", "अठ्ठावन्न", "एकोणसाठ",
    "साठ", "एकसष्ट", "बासष्ट", "त्रेसष्ट", "चौसष्ट", "पासष्ट", "सहासष्ट", "सदुसष्ट", "अडुसष्ट", "एकोणसत्तर",
    "सत्तर", "एक्काहत्तर", "बाहत्तर", "त्र्याहत्तर", "चौऱ्याहत्तर", "पंच्याहत्तर", "शहात्तर", "सत्त्याहत्तर", "अठ्ठ्याहत्तर", "एकोणऐंशी",
    "ऐंशी", "एक्क्याऐंशी", "ब्याऐंशी", "त्र्याऐंशी", "चौऱ्याऐंशी", "पंच्याऐंशी", "शहाऐंशी", "सत्त्याऐंशी", "अठ्ठ्याऐंशी", "एकोणनव्वद",
    "नव्वद", "एक्क्याण्णव", "ब्याण्णव", "त्र्याण्णव", "चौऱ्याण्णव", "पंच्याण्णव", "शहाण्णव", "सत्त्याण्णव", "अठ्ठ्याण्णव", "नव्व्याण्णव",
  ];
  const HUNDREDS = ["", "एकशे", "दोनशे", "तीनशे", "चारशे", "पाचशे", "सहाशे", "सातशे", "आठशे", "नऊशे"];

  const three = (v: number): string => {
    const h = Math.floor(v / 100);
    const r = v % 100;
    // Exactly one hundred is शंभर; with anything after it, it becomes एकशे.
    const hw = h === 1 && r === 0 ? "शंभर" : h ? HUNDREDS[h] : "";
    return [hw, r ? UNDER_100[r] : ""].filter(Boolean).join(" ");
  };

  const parts: string[] = [];
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const rest = num % 1000;
  if (crore) parts.push(`${three(crore)} कोटी`);
  if (lakh) parts.push(`${three(lakh)} लाख`);
  if (thousand) parts.push(`${three(thousand)} हजार`);
  if (rest) parts.push(three(rest));
  return `रुपये ${parts.join(" ")} फक्त`;
}
