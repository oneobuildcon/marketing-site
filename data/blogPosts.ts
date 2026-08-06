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
    title: "House Construction Cost per Sq.Ft in Pune — What You Actually Pay",
    summary:
      "A straight explanation of what a per-sq.ft rate covers, what it never covers, and how built-up area is measured — so you can compare two quotations honestly.",
    cover: "",
    date: "2026-08-06",
    published: true,
    author: "Avinash Shinde, Founder — One O Buildcon",
    faqs: [
      { q: "What is the construction cost per sq.ft in Pune?", a: "It depends entirely on the specification behind the rate. A turnkey package covering structure, flooring, plumbing, electrical, doors, windows and painting sits in a different band from a structure-only rate. Ask for the itemised specification and the material rates considered before comparing any two figures." },
      { q: "Is the rate applied to carpet area or built-up area?", a: "Built-up area. Plinth is usually counted at about 50% of the ground slab, upper floors at 100% each, and terrace at around 35% of the top slab. Ask for this calculation in writing — it changes the total more than the rate does." },
      { q: "What is normally excluded from a construction quotation?", a: "Compound wall and gate, landscaping, external facade detailing, overhead RCC water tanks, borewell, electricity meter, water connection, and furniture or interior work. These exclusions are normal; the problem is only when they are not written down." },
      { q: "Why do two contractors quote very different rates for the same house?", a: "Usually because they are quoting different houses. Check the material rates considered, the brands named, and how each measures built-up area. Once those three match, the rates become comparable." },
    ],
    body: `Almost every conversation about building a house in Pune starts the same way: "What is your rate per sq.ft?" It is a fair question, but the number on its own tells you very little. Two contractors can quote the same rate and hand you houses that differ by lakhs in value.

Here is what actually sits behind that figure.

## What a per-sq.ft rate includes

A turnkey rate should cover the structure and all the finishing work needed to hand you a house you can live in:

- Excavation-ready RCC work — footings, columns, beams, slabs
- Brickwork and plaster, internal and external
- Waterproofing for bathrooms and the terrace
- Flooring, dado, granite for windows, doors and the kitchen platform
- Plumbing, including fittings up to a stated rate
- Electrical wiring, switches and points
- Painting, internal and external
- Doors, windows, grills and railings

If a quotation does not list these line by line, you cannot tell what has been left out.

## What it almost never includes

This is where most disputes start. Standard exclusions across the industry are:

- Compound wall and gate
- Landscaping
- External facade detailing and mouldings
- Overhead RCC water tanks
- Borewell, electricity meter and water connection
- Furniture and interior work

None of these are unreasonable to exclude. The problem is only when they are not written down.

## How built-up area is measured

This matters as much as the rate itself. A house is not billed on carpet area. The built-up area typically counts:

- **Plinth** — usually 50% of the ground slab area
- **Ground floor** — 100% if it is living space, less if it is parking
- **Upper floors** — 100% each
- **Terrace** — usually around 35% of the top slab

So a 1,000 sq.ft footprint over two floors is not 2,000 sq.ft of billing — with plinth and terrace it comes closer to 2,850. Ask any contractor to show you this breakdown in writing. If they will not, that is your answer.

## Comparing two quotations properly

Put them side by side and check three things:

1. **The same built-up area** — if one measures terrace at 50% and the other at 35%, the rates are not comparable at all.
2. **The material rates considered** — a quotation that allows Rs. 35/sq.ft for tiles and one that allows Rs. 80/sq.ft are different houses at the same headline rate.
3. **The brands named** — steel, cement, waterproofing, wiring and CP fittings should all be stated by name.

## The honest summary

A low rate is not a saving if the specification is thin, and a high rate is not quality if it is not itemised. Ask for the breakdown, read the exclusions, and compare like with like.

If you would like a written quotation with all of this set out — built-up area calculation, material rates, brands and a stage-wise payment schedule — we are happy to prepare one for your plot.`,
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
