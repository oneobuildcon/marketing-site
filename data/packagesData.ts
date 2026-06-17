export type PackageId = "structure" | "basic" | "standard" | "premium" | "royal" | "luxury";
export type CategoryId =
  | "designs"
  | "earthwork"
  | "structure"
  | "flooring"
  | "kitchen"
  | "bathroom"
  | "doors"
  | "window"
  | "plumbing"
  | "electrical";

export interface PackageMeta {
  id: PackageId;
  name: string;
  price: string;
}

export interface CategoryMeta {
  id: CategoryId;
  name: string;
}

export type PackageContent = Record<PackageId, Record<CategoryId, string[]>>;

export const packages: PackageMeta[] = [
  { id: "structure", name: "Structure Only", price: "1,199" },
  { id: "basic", name: "Basic", price: "1,549" },
  { id: "standard", name: "Standard", price: "1,699" },
  { id: "premium", name: "Premium", price: "1,949" },
  { id: "royal", name: "Royal", price: "2,099" },
  { id: "luxury", name: "Luxury", price: "2,499" },
];

export const categories: CategoryMeta[] = [
  { id: "designs", name: "Designs & Layouts" },
  { id: "earthwork", name: "Earth Work" },
  { id: "structure", name: "Structure" },
  { id: "flooring", name: "Flooring" },
  { id: "kitchen", name: "Kitchen Counter" },
  { id: "bathroom", name: "Bathroom" },
  { id: "doors", name: "Door Frames & Fitting" },
  { id: "window", name: "Window" },
  { id: "plumbing", name: "Plumbing & Sanitation" },
  { id: "electrical", name: "Electrical" },
];

export const defaultPackageContent: PackageContent = {
  structure: {
    designs: ["Architectural floor plan", "Structural Drawings"],
    earthwork: ["Excavation as per drawing", "Anti-termite treatment", "PCC (Plain Cement Concrete)"],
    structure: ["RCC as per design", "Cement: OPC 53 grade", "Steel: Fe 500", "6-inch solid block masonry", "Single coat plastering"],
    flooring: ["Not included in this package"],
    kitchen: ["Not included in this package"],
    bathroom: ["Not included in this package"],
    doors: ["Not included in this package"],
    window: ["Not included in this package"],
    plumbing: ["Not included in this package"],
    electrical: ["Not included in this package"],
  },
  basic: {
    designs: ["Architectural floor plan", "3D Elevation", "Electrical layout", "Plumbing layout", "Brickwork layout", "Working Drawings", "Structural Drawings"],
    earthwork: ["Excavation as per drawing", "Anti-termite treatment", "PCC (Plain Cement Concrete)", "Backfilling after foundation"],
    structure: ["RCC M20 grade concrete", "Cement: OPC 53 grade", "Steel: Fe 500", "6-inch solid block masonry", "River sand for masonry", "Single coat internal plastering", "Waterproofing for terrace"],
    flooring: ["Vitrified tiles up to Rs. 40/sqft", "Granite for staircase (standard)", "Parking: Kota stone", "Skirting up to 4 inches"],
    kitchen: ["Granite counter top 20mm thick", "Single bowl SS sink", "Dado tiles up to Rs. 30/sqft (2 ft height)"],
    bathroom: ["Wall tiles up to Rs. 35/sqft (7 ft height)", "Basic CP fittings", "EWC (floor-mounted)", "Wash basin with pedestal", "15-litre geyser provision"],
    doors: ["Main door: Teak wood frame + flush door", "Internal: Sal wood frame + flush door", "Door fittings: Godrej or equivalent", "Tower bolt + door stopper"],
    window: ["UPVC windows with plain glass", "MS grills for safety"],
    plumbing: ["CPVC pipes for water supply", "PVC pipes for drainage", "Underground water tank (5000L)", "Overhead water tank (1000L)"],
    electrical: ["Concealed wiring with ISI wires", "Switches: Anchor/Roma or equivalent", "1 light + 1 fan point per 100 sqft", "MCB distribution board", "Earthing as per IS standards"],
  },
  standard: {
    designs: ["Architectural floor plan", "3D Elevation", "Interior 3D views (2 rooms)", "Electrical layout", "Plumbing layout", "Brickwork layout", "Working Drawings", "Structural Drawings"],
    earthwork: ["Excavation as per drawing", "Anti-termite treatment (Chlorpyrifos)", "PCC M15 grade", "Dewatering if required"],
    structure: ["RCC M25 grade concrete", "Cement: Ultratech / ACC 53 grade", "Steel: Fe 500D (TATA/SAIL)", "AAC blocks 6-inch", "Double coat plastering", "Waterproofing for wet areas + terrace"],
    flooring: ["Vitrified tiles up to Rs. 60/sqft", "Granite for staircase", "Parking: Vitrified tiles", "Skirting up to 4 inches", "Anti-skid tiles in bathrooms"],
    kitchen: ["Granite counter top 20mm", "Double bowl SS sink", "Dado tiles up to Rs. 40/sqft (3 ft height)", "Provision for chimney + exhaust"],
    bathroom: ["Wall tiles up to Rs. 50/sqft", "Jaquar / Cera CP fittings", "EWC with health faucet", "Wash basin with counter top", "Shower area with curtain rod", "25-litre geyser provision"],
    doors: ["Main door: Burma teak frame + solid panel door", "Internal: Sal frame + flush door with laminate", "Door fittings: Godrej / Hettich", "Hydraulic door closer for main door"],
    window: ["UPVC windows with plain glass", "MS grills with design", "Mosquito mesh sliding"],
    plumbing: ["CPVC for hot & cold water supply", "SWR pipes for drainage", "Underground + overhead tanks", "Water softener provision", "Borewell connection provision"],
    electrical: ["Concealed wiring (Finolex/Havells)", "Switches: Legrand / GM Modular", "2 lights + 1 fan + 1 AC point per bedroom", "MCB + ELCB distribution board", "Inverter provision"],
  },
  premium: {
    designs: ["Architectural floor plan", "3D Elevation + walkthrough video", "Full interior 3D design (all rooms)", "Electrical & plumbing layout", "Landscape design", "Working & Structural Drawings", "Revision up to 3 times"],
    earthwork: ["Excavation + soil testing report", "Anti-termite treatment (warranty)", "PCC M20 + waterproofing membrane", "Dewatering if required"],
    structure: ["RCC M30 grade concrete", "Cement: Ultratech / Ambuja 53 grade", "Steel: Fe 550 (TATA/JSW)", "AAC blocks + thermal insulation boards", "Machine plastering (smooth finish)", "Full waterproofing package"],
    flooring: ["Imported vitrified tiles up to Rs. 100/sqft", "Italian marble for staircase", "Engineered wood flooring in master bedroom", "Anti-skid tiles in all bathrooms", "Designer border tiles"],
    kitchen: ["Granite / Quartz counter top 25mm", "Stainless steel double bowl sink (Franke/Carysil)", "Dado tiles up to Rs. 80/sqft", "Modular kitchen carcass provision", "Chimney + exhaust point"],
    bathroom: ["Designer tiles up to Rs. 80/sqft", "Jaquar / Kohler CP fittings", "Wall-hung EWC with soft-close seat", "Shower enclosure with glass partition", "Rain shower provision", "50-litre geyser"],
    doors: ["Main door: Teak solid wood with carving + polish", "Internal: Teak frame + laminated flush", "Fittings: Hettich / Hafele", "Pivot door option for main", "Bedroom locks: Godrej premium"],
    window: ["UPVC with toughened glass", "Sliding / casement with mosquito mesh", "Decorative MS grills", "Provision for motorized blinds"],
    plumbing: ["CPVC / PPR pipes premium brand", "Concealed cistern (Jaquar)", "Underground + overhead + borewell connection", "Water softener", "Hot water circulation loop"],
    electrical: ["Concealed wiring (Havells/Polycab)", "Switches: Schneider / Legrand Arteor", "Home automation provision (wiring)", "Solar provision", "CCTV & video door phone provision", "Fire alarm provision"],
  },
  royal: {
    designs: ["Complete architectural package", "3D elevation + full VR walkthrough", "Interior design consultation (professional ID)", "Vastu-compliant design", "Landscape + exterior design", "All engineering drawings", "Unlimited revisions"],
    earthwork: ["Full soil investigation report", "Deep foundation as required", "Anti-termite + full waterproofing treatment", "Site levelling included"],
    structure: ["RCC M35 grade", "Premium cement (Ultratech)", "Fe 550D TMT steel", "AAC blocks with exterior cladding provision", "Three coat premium plastering", "Expansion joints provision"],
    flooring: ["Italian / Spanish marble up to Rs. 200/sqft", "Hardwood flooring in all bedrooms", "Designer tiles in common areas (no limit)", "Natural stone for outdoor areas", "Heated flooring provision"],
    kitchen: ["Quartz / imported stone counter top", "Franke / Carysil premium sink", "Full modular kitchen (basic carcass + shutters)", "Dado tiles up to Rs. 120/sqft", "Island counter provision"],
    bathroom: ["Premium designer tiles up to Rs. 150/sqft", "Kohler / American Standard full suite", "Concealed cistern", "Jacuzzi provision in master bath", "Steam room provision", "Heated towel rail"],
    doors: ["Solid hardwood main door with designer finish + glass inserts", "Engineered wood internal doors (European style)", "Hettich / Hafele premium fittings throughout", "Smart lock provision on main door"],
    window: ["uPVC with double-glazed glass", "Motorized blinds provision (wiring)", "Fly mesh integrated in frame", "Bay windows as per design"],
    plumbing: ["PPR pipes (Ashirvad/Supreme premium)", "Grohe / Jaquar concealed fittings", "Overhead + underground + borewell", "Water recycling provision", "Rainwater harvesting provision"],
    electrical: ["Premium wiring (Polycab/Finolex)", "Smart switches (Legrand/Schneider)", "Home automation (basic – lights + fans)", "Solar + generator provision", "Full CCTV + video door phone + intercom", "EV charger provision"],
  },
  luxury: {
    designs: ["Full architect-led design (RERA registered)", "VR + AR walkthrough experience", "Professional interior design (turnkey)", "Vastu + Feng Shui consultation", "Landscape architecture", "Complete drawing set + unlimited revisions", "Project management included"],
    earthwork: ["Geotechnical investigation (full report)", "Raft / pile foundation as needed", "Full waterproofing package (10-year warranty)", "Professional site levelling + compound"],
    structure: ["RCC M40 grade premium concrete", "Imported / premium cement", "Fe 550D high-strength steel (TATA)", "Insulated exterior walls + cladding", "Machine plastering (mirror finish)", "Structural audit by registered engineer"],
    flooring: ["Luxury imported marble (no budget limit)", "Engineered hardwood in all rooms", "Heated underfloor provision throughout", "Outdoor natural stone cladding + decking", "Customised inlay work in lobby"],
    kitchen: ["Imported stone (Calacatta / Statuario) counter top", "Franke / Blanco premium sink + accessories", "Full turnkey modular kitchen with appliances provision", "Ceiling-height cabinets with soft-close", "Wine cooler + bar unit provision"],
    bathroom: ["No-limit designer tiles (imported)", "Full Grohe / Kohler / Toto suite", "Spa-style rain shower + steam room", "Heated towel rail + floor heating", "Smart mirror with LED + defogging", "Freestanding bathtub"],
    doors: ["Custom-designed solid teak / walnut main door", "European-style engineered wood internal doors", "Biometric / smart entry system", "Concealed hinges + soft-close throughout", "Frameless glass doors for select areas"],
    window: ["Triple-glazed uPVC (noise + heat insulation)", "Motorized curtains + blinds (smart control)", "Integrated fly screens", "Bay windows + skylights as per design"],
    plumbing: ["Full concealed premium plumbing (Grohe/Geberit)", "Water recycling + rainwater harvesting system", "Softener + RO provision at source", "Underfloor heating provision", "Jacuzzi + steam plumbing"],
    electrical: ["Full KNX / Crestron smart home automation", "Solar rooftop system (grid-tied)", "EV charging point (32A)", "Home theatre + multi-room audio wiring", "Full IP CCTV + alarm + access control system", "Backup generator (auto-changeover)"],
  },
};
