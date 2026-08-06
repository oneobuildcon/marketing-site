// Starter blog posts. These are the defaults — once the admin saves posts in
// Admin → Blog they are stored in Supabase and these are no longer used.
//
// Body format is deliberately simple so it can be typed on a phone:
//   ## Heading
//   - bullet point
//   plain paragraphs, **bold** inline
export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  cover: string;      // image URL, or "" for none
  date: string;       // YYYY-MM-DD
  published: boolean;
  body: string;
  // Google weighs demonstrated first-hand experience, so posts carry a byline.
  author?: string;
  // Rendered at the foot of the post and emitted as FAQPage structured data.
  faqs?: { q: string; a: string }[];
};

export const defaultBlogPosts: BlogPost[] = [
  {
    slug: "house-construction-cost-per-sqft-pune",
    title: "House Construction Cost per Sq.Ft in Pune — 2026 Rates",
    summary:
      "Turnkey construction in Pune runs Rs. 1,499 to Rs. 2,099 per sq.ft in 2026, and Rs. 870 for RCC and brick work only. Here is what sits behind those figures, how built-up area is measured, and two real Pune projects worked through.",
    cover: "",
    date: "2026-08-06",
    published: true,
    author: "Avinash Shinde, Founder — One O Buildcon",
    faqs: [
      { q: "What is the construction cost per sq.ft in Pune in 2026?", a: "Turnkey construction runs about Rs. 1,499 to Rs. 2,099 per sq.ft depending on the finishing specification. RCC and brick work only is about Rs. 870 per sq.ft. GST at 18% is extra on the base amount." },
      { q: "Is the rate applied to carpet area or built-up area?", a: "Built-up area. Plinth is counted at about 50% of the ground slab, upper floors at 100% each, and terrace at about 35% of the top slab. A 1,000 sq.ft footprint over two floors bills at roughly 2,850 sq.ft, not 2,000." },
      { q: "How much does it cost to build a 2,000 sq.ft house in Pune?", a: "At a Standard turnkey rate of Rs. 1,649 per sq.ft, 2,000 sq.ft of built-up area works out to about Rs. 33 lakh before GST. The figure moves with the package chosen and the material selections made during construction." },
      { q: "What is normally excluded from a construction quotation?", a: "Compound wall and gate, landscaping, external facade detailing, overhead RCC water tank, borewell, electricity meter, water connection, and furniture or interior work. These exclusions are normal; the problem is only when they are not written down." },
      { q: "Why do two contractors quote very different rates for the same house?", a: "Usually because they are quoting different houses. Compare how each measures built-up area, the material rates they have considered, and the brands they name. Once those three match, the rates become comparable." },
    ],
    body: `Almost every conversation starts the same way: "What is your rate per sq.ft?" The short answer, for a bungalow in and around Pune in 2026, is **Rs. 1,499 to Rs. 2,099 per sq.ft for turnkey construction**, and **Rs. 870 per sq.ft if you want only the RCC and brick work**. The range depends on the finishing specification, not on the structure — the concrete and steel are much the same at either end.

The longer answer matters more, because the rate alone will not tell you what a house costs. Two contractors can quote the same figure and hand you houses that differ by lakhs. What follows is our own rate card, how built-up area is actually measured, and two real projects worked through.

## Our 2026 rates

| Package | Rate per sq.ft |
| --- | --- |
| RCC & brick work only | Rs. 870 |
| Basic turnkey | Rs. 1,499 |
| Standard turnkey | Rs. 1,649 |
| Premium turnkey | Rs. 1,949 |
| Royal turnkey | Rs. 2,099 |

All rates are on built-up area, and GST at 18% is extra on the base amount.

## What separates Rs. 870 from Rs. 1,649

The Rs. 870 rate covers the structure: footings, columns, beams, slabs, brickwork and plaster. You get a completed shell. Everything after that — flooring, granite, plumbing fittings, wiring, doors, windows, painting — is yours to arrange.

The turnkey rates cover that same structure plus all the finishing work, with one contractor answerable for the whole house.

So roughly **half the turnkey rate is structure and half is finishing**. That is the split worth understanding before you decide which route to take, because the finishing half is where your choices — and your time — actually go.

## Built-up area is not floor area

This is the part most people get wrong, and it changes the total more than the rate does.

A house is not billed on carpet area. Built-up area is counted like this:

- **Plinth** — about 50% of the ground slab area
- **Ground floor** — 100% if it is living space, 50% if it is parking
- **Upper floors** — 100% each
- **Terrace** — about 35% of the top slab

So a 1,000 sq.ft footprint over two floors is not 2,000 sq.ft of billing. Add plinth at 500 and terrace at 350 and you are near 2,850 sq.ft. At Rs. 1,649 that is the difference between Rs. 33 lakh and Rs. 47 lakh — on the same house, at the same rate.

Ask any contractor to show you this calculation in writing before you compare their number with anyone else's.

## Three real projects

**Charoli, Pune — 5,565 sq.ft, completed 2025.** A modern bungalow with exposed brick accents, wooden louvers and open balconies. At our Standard turnkey rate of Rs. 1,649, a built-up area of 5,565 sq.ft works out to about **Rs. 91.8 lakh** before GST. At the Premium rate of Rs. 1,949 the same area would be about Rs. 1.08 crore.

**Charoli, Pune — 3,330 sq.ft, completed 2023.** A modern bungalow with a double-height living room, glass balcony railings and terracotta facade accents. At the Standard turnkey rate of Rs. 1,649, 3,330 sq.ft comes to about **Rs. 54.9 lakh** before GST. This is closer to the size most families build, and a useful benchmark if you are planning a G+1 on a standard plot.

**Lohegaon, Pune — 5,700 sq.ft, under construction.** A premium bungalow built on an RCC structure with quality brickwork. At Rs. 1,949 per sq.ft, 5,700 sq.ft comes to roughly **Rs. 1.11 crore** before GST.

Two things to note honestly. First, these are the arithmetic at the stated rates — the contracted value on any specific project depends on the package chosen and on selections made during construction. Second, both are large bungalows; a 2,000 to 3,000 sq.ft house is a far more common size, and at Rs. 1,649 that lands between Rs. 33 lakh and Rs. 49 lakh before GST.

## What is not in the rate

This is where most disputes begin. Standard exclusions, across the industry and in our own quotations:

- Compound wall and gate
- Landscaping outside the parking area
- External facade detailing and mouldings
- Overhead RCC water tank
- Borewell, electricity meter and water connection
- Furniture and interior work
- Excavation and back-filling, on some packages

None of these are unreasonable to exclude. The problem is only when they are not written down before you pay an advance.

## Why one contractor says Rs. 1,500 and another says Rs. 2,100

Usually because they are quoting two different houses. Check three things and the gap normally explains itself:

1. **The built-up area measurement.** If one counts terrace at 50% and the other at 35%, the rates are not comparable at all.
2. **The material rates considered.** A quotation allowing Rs. 35 per sq.ft for tiles and one allowing Rs. 100 per sq.ft are different houses at the same headline rate.
3. **The brands named.** Steel, cement, waterproofing, wiring, pipes and CP fittings should all be stated by name, not left as "standard quality".

A quotation that does not contain all three is not a quotation. It is a number.

## What we put in writing

Every quotation we issue sets out the built-up area calculation floor by floor, the specification for each trade, the material rates considered, the brands used, a stage-wise payment schedule tied to completed work, and the exclusions. It is a five-page document, and it exists so you can compare us honestly against anyone else.

If you have a plot and a drawing, we will prepare one for your project.`,
  },
  {
    slug: "what-is-included-turnkey-construction-package",
    title: "What Is Actually Included in a Turnkey Construction Package?",
    summary:
      "Turnkey means you hand over a drawing and receive a finished house. Here is the work that sits between those two points, stage by stage.",
    cover: "",
    date: "2026-08-06",
    published: false,
    body: `"Turnkey" is one of those words that sounds precise and often is not. In practice it should mean one thing: you hand over an approved drawing, and you receive a house you can move into, with one contractor answerable for all of it.

Here is what that involves.

## Stage 1 — Foundation and plinth

Excavation, footings, column starters, plinth beams and filling. This is the stage where shortcuts are invisible later, which is exactly why the steel grade and cement brand should be named in your quotation before work starts.

## Stage 2 — RCC structure

Columns, beams and slabs, floor by floor, as per the structural drawing. Plate shuttering gives a cleaner finish than traditional shuttering and reduces plaster thickness afterwards.

Slab work sets the pace of the whole project. Each floor typically takes three to four weeks including curing.

## Stage 3 — Brickwork and plaster

External walls are usually 9 inches and internal walls 6 inches. Plaster is where quality shows: a double-coat external plaster protects far better than single coat, and internal finish determines how good the paint looks.

## Stage 4 — Waterproofing

Bathrooms and the terrace. Brickbat coba for bathrooms, and a proper terrace treatment. This is a small line item that causes the largest number of complaints when skipped.

## Stage 5 — Flooring, doors and windows

Tiles, granite for window and door frames, staircase, kitchen platform. Flush doors, bathroom doors, sliding windows with mosquito nets, grills and railings.

Material selection happens here, and this is where a quotation's "rate considered" figures become real money. If you choose tiles above the allowed rate, you pay the difference.

## Stage 6 — Plumbing and electrical

Concealed internal lines, clamped external lines, chambers and drainage connection. Electrical points per room, mains per floor, switches and sockets.

Fittings such as lights and fans are usually in the client's scope, since taste varies so widely.

## Stage 7 — Painting and handover

Primer, putty and paint coats, internal and external. Final cleaning, then handover.

## What turnkey does not mean

It does not mean unlimited. Every package has boundaries, and the honest ones write them down: compound wall, landscaping, furniture, facade detailing and utility connections are nearly always separate.

## What to ask for before you sign

- A stage-wise payment schedule tied to work completed, not dates
- Material rates considered, in writing
- Brands named for steel, cement, waterproofing, pipes, fittings and paint
- A built-up area calculation you can check yourself

If a contractor can give you all four on paper, you are dealing with someone who has thought about the job. If not, keep asking until they can.`,
  },
  {
    slug: "rcc-vs-turnkey-which-to-choose",
    title: "Grey Structure vs Turnkey in Pune — Which Is Cheaper, and What's the Catch?",
    summary:
      "RCC and brick work only costs about Rs. 870 per sq.ft in Pune. Turnkey starts at Rs. 1,499. The gap is not profit — it is the finishing work, and whether you save by doing it yourself depends on your time more than your budget.",
    cover: "",
    date: "2026-08-07",
    published: true,
    author: "Avinash Shinde, Founder — One O Buildcon",
    faqs: [
      { q: "What is the difference between grey structure and turnkey construction?", a: "Grey structure, also called RCC and brick work, covers footings, columns, beams, slabs, brickwork and plaster — a completed shell. Turnkey covers that plus all finishing: flooring, granite, plumbing, electrical, doors, windows and painting, handed over ready to occupy." },
      { q: "What does grey structure cost per sq ft in Pune?", a: "About Rs. 870 per sq.ft on built-up area in Pune and PCMC, with GST extra. Turnkey runs Rs. 1,499 to Rs. 2,099 per sq.ft depending on the finishing specification." },
      { q: "Is grey structure cheaper overall?", a: "The headline number is smaller, but once you buy materials at retail, pay six separate trades, absorb wastage and take time off work to supervise, the gap narrows considerably. It saves money reliably only if you have the time and the contacts." },
      { q: "Can I take a turnkey package but keep some work in my own scope?", a: "Yes, and many owners do — usually kitchen, wardrobes and light fittings, where taste is personal. The important thing is that the boundary is written into the quotation so there is no dispute about who does what." },
    ],
    body: `In Pune and PCMC, **RCC and brick work costs about Rs. 870 per sq.ft** and **turnkey construction starts at Rs. 1,499 per sq.ft**. So the finishing half of a house costs roughly as much as the structure — about Rs. 630 per sq.ft at Basic specification, more as the specification rises.

The real question is not which number is smaller. It is whether you want to spend that Rs. 630 through one contractor, or spend it yourself across six trades.

## What each one actually covers

**Grey structure (Rs. 870 per sq.ft)** — footings, columns, beams, slabs, brickwork, internal and external plaster. You receive a completed shell with walls plastered and nothing else.

**Turnkey (Rs. 1,499 to Rs. 2,099 per sq.ft)** — all of the above, plus flooring, granite for windows and doors, kitchen platform, bathroom dado and sanitary ware, concealed plumbing and electrical, doors, windows, grills, railings, waterproofing and painting. Handed over ready to live in.

Both are quoted on built-up area, with GST extra.

## Worked example — a 2,500 sq.ft house

| | Grey structure | Basic turnkey | Standard turnkey |
| --- | --- | --- | --- |
| Rate per sq.ft | Rs. 870 | Rs. 1,499 | Rs. 1,649 |
| 2,500 sq.ft built-up | Rs. 21.8 L | Rs. 37.5 L | Rs. 41.2 L |
| Difference | — | Rs. 15.7 L | Rs. 19.4 L |

So on this house, the finishing work is worth roughly **Rs. 15.7 lakh** at Basic specification. That is your budget to beat if you take the grey-structure route and finish it yourself.

## What that Rs. 15.7 lakh has to cover

If you finish it yourself, you are buying and coordinating:

- Flooring tiles and laying labour
- Granite for windows, doors, staircase and kitchen platform
- Bathroom dado, anti-skid flooring, waterproofing
- Sanitary ware and CP fittings, plus a plumber
- Concealed wiring, switches, sockets, plus an electrician
- Doors, frames, locks and fittings
- Sliding windows, grills, railings
- Primer, putty, paint and a painting contractor

Eight trades, eight sets of negotiations, eight opportunities for someone to not turn up on Monday.

## Where grey structure genuinely saves

It saves reliably when three things are true:

1. **You have time.** Not "I can visit on Sunday" — closer to two or three visits a week during finishing.
2. **You have contacts.** A tiler, plumber, electrician, carpenter and painter you already trust, or someone in the family who does.
3. **You enjoy it.** Some owners find material selection and site visits genuinely satisfying. Others find it the worst year of their life.

If all three are true, you can save a meaningful part of that Rs. 15.7 lakh, mostly by buying materials directly and cutting the coordination margin.

## Where it costs more than people expect

**Retail versus trade pricing.** A contractor buying tiles for four sites gets a rate you will not get for one.

**Wastage.** Ordering 5% short means a second trip and a different dye lot. Ordering 20% over means money left in the garage.

**Sequencing.** Tiling before plumbing testing, or painting before the electrician finishes, means work done twice.

**Nobody answerable.** When a bathroom leaks, the plumber blames the waterproofing and the tiler blames the plumber. On a turnkey contract, that argument is not yours to have.

**Your time.** Twelve months of site visits, phone calls and material runs is real. Price it honestly, at whatever a day off work costs you.

## The middle path

Many owners take a turnkey package and keep two or three items in their own scope — typically the kitchen, wardrobes and light fittings, where taste is personal and shopping is enjoyable.

That works well, on one condition: the boundary must be written into the quotation. Which items, at what stage, and who is responsible if a delay in your scope holds up the contractor's work.

## Our honest recommendation

If you have the time and the contacts, grey structure is a legitimate way to build and you will learn a great deal. Take the Rs. 870 rate, get the structure right, and manage the finishing at your own pace.

If you have a full-time job, turnkey is not a luxury. It is what stops a twelve-month project becoming a twenty-month one.

Either way, insist on the same things: an itemised specification, named brands, a written built-up area calculation, and a stage-wise payment schedule. We provide all four on both our RCC-only and turnkey quotations — ask and we will prepare one for your plot.`,
  },
  {
    slug: "cost-to-build-1000-1500-2000-sqft-house-pune",
    title: "Cost to Build a 1000, 1500 or 2000 Sq.Ft House in Pune & PCMC (2026)",
    summary:
      "A 1,000 sq.ft house costs about Rs. 15 lakh to build in Pune and PCMC, 1,500 sq.ft about Rs. 22 lakh and 2,000 sq.ft about Rs. 30 lakh at Basic specification. Full table, plus why built-up area is larger than you think.",
    cover: "",
    date: "2026-08-07",
    published: true,
    author: "Avinash Shinde, Founder — One O Buildcon",
    faqs: [
      { q: "How much does it cost to build a 1000 sq ft house in Pune?", a: "About Rs. 15 lakh at Basic specification (Rs. 1,499 per sq.ft) and about Rs. 21 lakh at Royal specification (Rs. 2,099 per sq.ft), before GST. That is on 1,000 sq.ft of built-up area, not plot area." },
      { q: "How much does it cost to build a 1500 sq ft house in Pune or PCMC?", a: "Roughly Rs. 22.5 lakh at Basic and Rs. 31.5 lakh at Royal, before GST. Rates are the same across Pune and Pimpri-Chinchwad; only site access and material transport change slightly." },
      { q: "How much for a 2000 sq ft house?", a: "About Rs. 30 lakh at Basic and Rs. 42 lakh at Royal, before GST. Add roughly 18% GST on top of the base amount." },
      { q: "Is a 1000 sq ft plot the same as 1000 sq ft of construction?", a: "No. If you build G+1 on a 1,000 sq.ft footprint, the built-up area including plinth and terrace is closer to 2,850 sq.ft. The rate applies to built-up area, so this is the single biggest reason estimates surprise people." },
      { q: "Do rates differ between Pune city and PCMC?", a: "Our rates are the same in Pune, Pimpri-Chinchwad, Moshi, Chakan, Wagholi, Charholi and Alandi. What varies is site access, water availability and material transport, which are handled in the site conditions rather than the rate." },
    ],
    body: `The short answer, at 2026 rates in Pune and Pimpri-Chinchwad: **a 1,000 sq.ft house costs about Rs. 15 lakh to build, 1,500 sq.ft about Rs. 22.5 lakh, and 2,000 sq.ft about Rs. 30 lakh** at Basic specification, before GST. At the top of the range those become roughly Rs. 21 lakh, Rs. 31.5 lakh and Rs. 42 lakh.

But there is a catch in the question itself, and it is worth reading the next section before you use any of these numbers.

## "1,000 sq.ft" usually means two different things

When people say "a 1,000 sq.ft house", they usually mean one of two things:

- **1,000 sq.ft of built-up area** — the total constructed area across all floors. This is what a construction rate applies to.
- **A 1,000 sq.ft plot footprint** — the ground area they own or plan to build on.

These give very different answers. If you build G+1 on a 1,000 sq.ft footprint, the built-up area is not 2,000 sq.ft. Plinth adds about 50% of the ground slab and terrace about 35% of the top slab, so you land near **2,850 sq.ft** of billable area.

At Rs. 1,649 that is about Rs. 47 lakh — not the Rs. 33 lakh you would get from the simple multiplication. This is the single most common surprise in a first meeting.

The table below is on **built-up area**.

## Cost table — Pune and PCMC, 2026

| Built-up area | Basic Rs. 1,499 | Standard Rs. 1,649 | Premium Rs. 1,949 | Royal Rs. 2,099 |
| --- | --- | --- | --- | --- |
| 1,000 sq.ft | Rs. 15.0 L | Rs. 16.5 L | Rs. 19.5 L | Rs. 21.0 L |
| 1,500 sq.ft | Rs. 22.5 L | Rs. 24.7 L | Rs. 29.2 L | Rs. 31.5 L |
| 2,000 sq.ft | Rs. 30.0 L | Rs. 33.0 L | Rs. 39.0 L | Rs. 42.0 L |
| 2,500 sq.ft | Rs. 37.5 L | Rs. 41.2 L | Rs. 48.7 L | Rs. 52.5 L |
| 3,000 sq.ft | Rs. 45.0 L | Rs. 49.5 L | Rs. 58.5 L | Rs. 63.0 L |

All figures are before GST. **GST at 18% is extra on the base amount.**

## What changes between Basic and Royal

The structure barely changes. The concrete, the steel and the brickwork are much the same at Rs. 1,499 and Rs. 2,099 — that is not where the money goes.

What changes is finishing:

- **Plaster** — single coat externally at Basic, double coat at Standard and above
- **Tiles** — 600 x 600mm at Basic, 1200 x 1200mm at Standard and above
- **Granite** — Steel Gray at Basic, Z-black and pearl black higher up
- **Kitchen platform** — granite at Basic, quartz at Standard and above
- **Sanitary** — P-trap commode and flush tank at Basic, wall-hung commode and flush valve higher up
- **Paint** — oil bound distemper internally at Basic, emulsion at Standard and above
- **POP** — not included at Basic, included at Standard and above

So the decision is not "cheap versus good". It is how much finishing you want now, versus later.

## Does the location change the rate?

Not for us. We work across Pune and PCMC — Pimpri, Chinchwad, Moshi, Chakan, Ravet, Punawale, Wagholi, Charholi, Lohegaon, Dighi and Alandi — at the same rates.

What does vary by site:

- **Access** — a narrow approach road means smaller vehicles and more handling
- **Water** — a site without a borewell needs tankers, which is in the client's scope
- **Soil and depth** — footing depth is set by the structural design, not the postcode
- **Excavation** — hard murum or rock changes the excavation effort

None of these change the per-sq.ft rate. They show up as site conditions, and they should be discussed before you sign, not after.

## Real projects for reference

- **Charoli, Pune — 3,330 sq.ft, completed 2023.** Modern bungalow with a double-height living room and glass balcony railings. At Standard Rs. 1,649, about Rs. 54.9 lakh before GST.
- **Charoli, Pune — 5,565 sq.ft, completed 2025.** Exposed brick accents, wooden louvers, open balconies. At Standard, about Rs. 91.8 lakh before GST.
- **Lohegaon, Pune — 5,700 sq.ft, under construction.** Premium bungalow on an RCC frame. At Premium Rs. 1,949, about Rs. 1.11 crore before GST.

These are the arithmetic at those rates. The contracted value on any project depends on the package and on selections made during construction.

## What to budget beyond construction

The construction rate is not the whole project. Set aside separately for:

- Architect and structural consultant fees
- Building permission and municipal charges
- Compound wall and gate
- Borewell, electricity meter and water connection
- Landscaping
- Furniture and interiors
- GST at 18%

A useful rule: whatever the construction figure is, plan for the full project to land meaningfully above it. Anyone who tells you otherwise is selling you a number, not a house.

## Getting a figure for your own plot

Use the [cost calculator](/calculator) for an instant estimate from your slab sizes, or send us your drawing and we will prepare a written quotation with the built-up area calculation, specification, material rates, brands and stage-wise payments set out in full.`,
  },
  {
    slug: "construction-cost-pcmc-pimpri-chinchwad",
    title: "Construction Cost in PCMC — Pimpri, Chinchwad, Moshi, Chakan & Ravet (2026)",
    summary:
      "House construction in Pimpri-Chinchwad costs Rs. 1,499 to Rs. 2,099 per sq.ft turnkey in 2026. What the rate covers, what changes site to site across PCMC, and what to check before you appoint anyone.",
    cover: "",
    date: "2026-08-07",
    published: true,
    author: "Avinash Shinde, Founder — One O Buildcon",
    faqs: [
      { q: "What is the construction cost per sq ft in PCMC in 2026?", a: "Rs. 1,499 to Rs. 2,099 per sq.ft for turnkey construction, and about Rs. 870 per sq.ft for RCC and brick work only. GST at 18% is extra on the base amount." },
      { q: "Is construction more expensive in PCMC than in Pune city?", a: "Not materially. Material and labour costs are similar across Pune and Pimpri-Chinchwad. What varies is site access, water availability and excavation conditions, which are site matters rather than rate matters." },
      { q: "Which areas of PCMC do you build in?", a: "Pimpri, Chinchwad, Moshi, Chakan, Ravet, Punawale, Dighi, Bhosari, Talawade and the surrounding belt, along with Wagholi, Charholi, Lohegaon and Alandi on the Pune side." },
      { q: "How much does a bungalow cost in Moshi or Chakan?", a: "The same per sq.ft rates apply. A 2,000 sq.ft built-up bungalow works out to about Rs. 30 lakh at Basic and Rs. 42 lakh at Royal, before GST." },
    ],
    body: `Building in Pimpri-Chinchwad in 2026 costs **Rs. 1,499 to Rs. 2,099 per sq.ft for turnkey construction**, and about **Rs. 870 per sq.ft if you want only the RCC and brick work**. GST at 18% is extra.

Those are the same rates we quote in Pune city. The interesting question is not whether PCMC is more expensive — it is what actually differs between one plot and the next.

## Rates across PCMC

| Package | Rate per sq.ft |
| --- | --- |
| RCC & brick work only | Rs. 870 |
| Basic turnkey | Rs. 1,499 |
| Standard turnkey | Rs. 1,649 |
| Premium turnkey | Rs. 1,949 |
| Royal turnkey | Rs. 2,099 |

Applied to built-up area, with GST extra. Built-up area includes plinth at about 50% of the ground slab and terrace at about 35% of the top slab, so it is larger than the sum of your floor plans.

## What actually varies from site to site

Material rates in Moshi are not different from material rates in Kharadi. What changes is the site:

**Access.** A plot on a 20-foot road takes a transit mixer. A plot down a 9-foot lane does not, and the concrete has to be handled differently. This affects programme more than price, but it affects both.

**Water.** Sites without a borewell need tankers throughout the structure and curing period. Water is in the client's scope in our quotations, so this is a real cost you should budget rather than assume.

**Excavation.** Parts of the Chakan and Talawade belt hit hard murum quickly; other plots dig easily. Excavation and back-filling sit in the client's scope on most packages precisely because it varies so much.

**Neighbours and setbacks.** A plot with buildings on both sides needs more careful shuttering and scaffolding than an open plot in a new layout.

None of these change the headline rate. All of them should be discussed before an advance changes hands.

## Where we work

Across PCMC: **Pimpri, Chinchwad, Moshi, Chakan, Ravet, Punawale, Dighi, Bhosari and Talawade.** On the Pune side: **Wagholi, Charholi, Lohegaon, Alandi, Dhanori and Kharadi.**

Two of our recent bungalows are in Charoli and one in Lohegaon — 3,330 sq.ft and 5,565 sq.ft completed, and 5,700 sq.ft under construction. If you want to see finished work rather than photographs, ask and we will arrange a visit.

For more on bungalow work specifically in PCMC, see our [bungalow construction in Pimpri-Chinchwad](/bungalow-construction-pimpri-chinchwad) page.

## What to check before appointing anyone in PCMC

The same four things, wherever the plot is:

1. **A written built-up area calculation** — floor by floor, with the plinth and terrace percentages stated. This moves the total more than the rate does.
2. **Material rates considered** — tiles, granite, plumbing fittings, grills and railings, each with a rate. "Good quality tiles" is not a specification.
3. **Brands named** — steel, cement, waterproofing, pipes, CP fittings and paint.
4. **A stage-wise payment schedule** — tied to completed work, not to dates on a calendar.

If a contractor can hand you all four on paper before you pay anything, you are dealing with someone organised. If the quotation is a single page with a rate and a total, you have learned something useful.

## A note on approvals

Whether your plot falls under PCMC, PMRDA or a Gram Panchayat determines which permission process applies, and the answer differs plot by plot even within the same area. We do not publish approval timelines or fees here, because they change and a wrong figure would be worse than none — but we will tell you honestly which authority your plot sits under and what the process looks like when we see your documents.

## Getting a number for your plot

Try the [cost calculator](/calculator) for an instant estimate, or send us your drawing for a written quotation with the full specification, rates, brands and payment schedule.`,
  },
  {
    slug: "how-long-to-build-bungalow-pune-timeline",
    title: "How Long Does It Take to Build a Bungalow in Pune? A Realistic Timeline",
    summary:
      "A G+1 bungalow in Pune typically takes 10 to 14 months from foundation to handover. Here is the month-by-month breakdown, what actually causes delays, and which of them are in your control.",
    cover: "",
    date: "2026-08-07",
    published: true,
    author: "Avinash Shinde, Founder — One O Buildcon",
    faqs: [
      { q: "How long does it take to build a bungalow in Pune?", a: "A G+1 bungalow of around 2,000 to 3,000 sq.ft built-up typically takes 10 to 14 months from foundation to handover. Larger houses and additional floors add roughly one to two months per floor." },
      { q: "What delays house construction most often?", a: "Late material selections by the owner, drawing revisions after work has started, and the monsoon. Of these, the first two are entirely within the owner's control and are the most common cause of a project running long." },
      { q: "Can construction continue during the Pune monsoon?", a: "Internal work continues — plumbing, electrical, tiling, plastering inside. Excavation, external plaster, waterproofing and painting are best paused. A well-planned project uses the monsoon for internal work rather than stopping." },
      { q: "How long does each RCC slab take?", a: "About three to four weeks per floor including curing. Curing cannot be rushed without weakening the structure, which is why the slab cycle sets the pace of the whole project." },
    ],
    body: `A G+1 bungalow of about 2,000 to 3,000 sq.ft built-up area typically takes **10 to 14 months in Pune, from foundation to handover**. Add roughly one to two months for each additional floor.

That is the honest range. Anyone promising six months for a full bungalow is either not counting curing time or not planning to be there at the end.

## Month by month

**Months 1–2: Foundation and plinth.** Site setting out, excavation, footings, column starters, plinth beams and filling. Rain, hard murum or a difficult approach road all land here.

**Months 3–6: RCC structure.** Columns, beams and slabs, floor by floor. Each floor runs about three to four weeks including curing. This is the metronome of the project and it cannot be sped up meaningfully — curing time is chemistry, not effort.

**Months 5–7: Brickwork.** Usually overlaps the upper slabs. External walls 9 inches, internal 6 inches.

**Months 7–9: Plaster and waterproofing.** Internal and external plaster, bathroom and terrace waterproofing. External plaster wants dry weather, so monsoon timing matters here.

**Months 8–11: Flooring, plumbing, electrical.** Concealed lines first, then tiling, granite for windows and doors, staircase, kitchen platform. Doors, windows, grills and railings go in through this period.

**Months 11–13: Painting and finishing.** Primer, putty and paint coats, fittings, final touches.

**Month 13–14: Cleaning and handover.**

These overlap in practice. A well-run site has brickwork on the ground floor while the first-floor slab is curing.

## What actually causes delays

In our experience, in order:

**1. Late material selections.** Tiles, granite, sanitary ware and paint colours have to be decided before the trade reaches that stage. A two-week delay choosing tiles is a two-week delay to the house. This is entirely in the owner's hands and it is the most common cause of overrun.

**2. Drawing revisions after work starts.** Moving a wall after the slab is cast is expensive in both money and weeks. Settle the plan before the foundation goes in.

**3. Monsoon.** Pune's monsoon does not stop a project, but it reshapes it. Excavation, external plaster, waterproofing and external painting pause. Internal work continues. A project planned around this loses far less time than one that simply stops.

**4. Water and power.** Sites waiting on a borewell or an MSEB connection lose weeks. Both are in the client's scope in our quotations, so start them early.

**5. Payment timing.** Work is scheduled around a stage-wise payment plan. A delayed payment stops material orders, and the site does not restart the moment it clears.

## What you can do to keep it on track

- **Freeze the drawing before the foundation.** Every change after that costs more than it did before.
- **Decide selections one stage ahead.** Choose tiles while plaster is running, not when the tiler is standing on site.
- **Start the borewell and meter application early**, before the structure is finished.
- **Visit at slab stage.** Not to supervise, but to see the work at the point where it matters most.
- **Keep payments on schedule.** It is the simplest thing you control and it has an outsized effect.

## A word about "fast" contractors

Speed in construction usually comes from one of three places: more labour, better sequencing, or skipped curing. The first two are good. The third is invisible for two years and then it is not.

Curing is in the client's scope in most quotations, including ours, and it is worth taking seriously. Concrete gains most of its strength in the first 28 days, and only if it stays wet.

## Our approach

We give a project duration in writing on every quotation — typically around 12 months from commencement for a standard bungalow — along with a stage-wise payment schedule tied to completed work. If a stage slips, you can see exactly where.

If you would like a timeline and quotation for your own plot, send us the drawing.`,
  },
  {
    slug: "questions-to-ask-before-hiring-contractor-pune",
    title: "10 Questions to Ask Before Hiring a Contractor in Pune",
    summary:
      "The answers to these will tell you more about a contractor than any brochure. Ask them before you pay an advance, not after.",
    cover: "",
    date: "2026-08-06",
    published: true,
    author: "Avinash Shinde, Founder — One O Buildcon",
    faqs: [
      { q: "What should I check before paying an advance to a contractor?", a: "A written built-up area calculation, the material rates considered, the brands named for steel, cement, waterproofing, pipes, fittings and paint, and a stage-wise payment schedule tied to completed work rather than dates." },
      { q: "How should payments be structured during house construction?", a: "By stage, not by date — typically an advance, then payments after plinth, after each RCC slab, after brickwork, after plaster, before painting, and on handover. This keeps payment tied to work you can see." },
      { q: "Should I ask to visit a contractor's ongoing site?", a: "Yes. Finished photographs are easy to produce; a live site shows how a contractor actually works — supervision, material storage, safety and cleanliness. A contractor with nothing to hide will arrange it the same week." },
    ],
    body: `Choosing a contractor is the single decision that determines how the next year of your life goes. Here are the questions worth asking, and what a good answer sounds like.

## 1. Can I see the built-up area calculation?

**Why it matters:** the area is half the price. If plinth, parking and terrace percentages are not written down, the final bill can move considerably.

**Good answer:** a written breakdown, floor by floor, with the percentages stated.

## 2. What material rates have you considered?

**Why it matters:** "tiles included" means nothing without a rate. Rs. 35/sq.ft and Rs. 100/sq.ft are both "included".

**Good answer:** a table of rates considered for tiles, granite, plumbing fittings, railings and grills.

## 3. Which brands will you use?

**Why it matters:** steel, cement, waterproofing chemicals, pipes, wiring and CP fittings vary enormously in quality.

**Good answer:** brands named in writing, with "or equivalent" defined rather than left open.

## 4. What is not included?

**Why it matters:** exclusions are where the arguments happen.

**Good answer:** a clear list — compound wall, landscaping, facade work, water tank, utility connections, and so on. A contractor who says "everything is included" has not read their own quotation.

## 5. How is payment linked to work?

**Why it matters:** payments tied to dates rather than stages put the risk entirely on you.

**Good answer:** a stage-wise schedule — advance, after plinth, after each slab, after brickwork, after plaster, before painting, on handover.

## 6. How long will it take, and what happens if it slips?

**Why it matters:** every project slips a little. You want to know how much and why.

**Good answer:** a realistic duration in months from commencement, and an honest explanation of what causes delays — usually material decisions and monsoon.

## 7. Can I visit a site you are working on now?

**Why it matters:** finished photographs are easy. A live site shows you how they actually work — safety, storage, cleanliness, supervision.

**Good answer:** yes, and this week.

## 8. Can I speak to a client from two years ago?

**Why it matters:** anyone can produce a happy client at handover. The interesting question is what happened when something needed fixing afterwards.

**Good answer:** a name and number, without hesitation.

## 9. Who supervises day to day, and how often will they be there?

**Why it matters:** you are not buying a brand, you are buying a site engineer's attention.

**Good answer:** a named person, and a realistic answer about how many sites they run.

## 10. Do you have a GST registration?

**Why it matters:** it tells you the business is formally constituted, and it matters for your own records.

**Good answer:** a GSTIN on the quotation itself.

## One more thing

Notice how many of these are answered simply by a properly written quotation. If a contractor hands you a single page with a rate and a total, you have learned something before you have asked a single question.

We are happy to answer all ten for our own work — ask us.`,
  },
];
