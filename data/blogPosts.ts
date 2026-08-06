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
    title: "RCC-Only or Full Turnkey — Which Should You Choose?",
    summary:
      "Some owners give out only the structure and manage the finishing themselves. It can save money, and it can cost a great deal. Here is how to decide.",
    cover: "",
    date: "2026-08-06",
    published: false,
    body: `There are two common ways to build a house in Pune. You give one contractor the whole job, or you give out the RCC and brickwork and manage the finishing yourself.

Both are legitimate. Which suits you depends less on money than on time.

## The RCC-only route

You engage a contractor for the structure — footings, columns, beams, slabs, brickwork and plaster — at a rate per sq.ft of built-up area. Everything after that is yours to arrange: flooring, plumbing, electrical, doors, windows, painting.

**It suits you if:**

- You have time to be on site regularly
- You know reliable tile, plumbing and electrical contractors
- You want to buy materials yourself and control every selection
- You enjoy the process rather than dreading it

**The real cost is coordination.** Six trades that need sequencing, each blaming the other when something is wrong, and no single person answerable for the finished house.

## The turnkey route

One contractor, one rate, one point of accountability, from foundation to handover.

**It suits you if:**

- You have a job and cannot visit site during the week
- You would rather approve selections than source them
- You want a fixed cost you can plan around
- You want one person to call when something is not right

You pay for that coordination. Whether it is worth it depends on what your time is worth and how much site experience you have.

## The money question

RCC-only looks cheaper because the headline number is smaller. But by the time you have bought tiles at retail, paid six separate contractors, absorbed the wastage, and taken the days off work to supervise, the gap narrows more than most people expect.

The honest way to compare is to price the finishing work properly before you decide — not to compare a structure rate against a turnkey rate, which are two different things.

## A middle path

Some owners take a turnkey package but keep two or three items in their own scope — usually kitchen, wardrobes and light fittings, where taste is personal and shopping is enjoyable. That works well, provided the boundary is written into the quotation so nobody is surprised later.

## What we would say

If you have the time and the contacts, RCC-only can work well and you will learn a great deal. If you do not, turnkey is not a luxury — it is what stops a six-month project becoming an eighteen-month one.

Either way, insist on the same things: itemised specifications, named brands, a written built-up area calculation and a stage-wise payment schedule.`,
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
