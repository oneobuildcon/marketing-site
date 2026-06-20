# How to Manage Projects

Everything about projects lives in **two places**:

1. **`lib/projects.ts`** — the details of each project (name, location, date, phase, description, etc.)
2. **`public/projects/<slug>/`** — the photos for each project (`1.jpg`, `2.jpg`, `3.jpg` …)

The website **Projects page** and the **Company Profile** both read from these two
places automatically. The page also has two filter rows so visitors can filter by:

- **Category** — Bungalow / Row House / Residential / Farmhouse
- **Phase** — Completed / Under Construction / Upcoming

---

## ➕ Add a NEW project

### Step 1 — Add the photos
Create a new folder under `public/projects/` named with the project "slug"
(lowercase, no spaces, use dashes). Example: `public/projects/new-villa/`

Put the photos inside, named in order:
- `1.jpg` ← **this is the cover photo** (shown on the card and profile)
- `2.jpg`, `3.jpg`, `4.jpg` … (the rest of the gallery)

### Step 2 — Add the details
Open **`lib/projects.ts`** and copy an existing block, then change the values.
Add it to the `projects` list:

```ts
{
  slug: "new-villa",            // must match the folder name in public/projects/
  count: 4,                     // how many photos (1.jpg ... 4.jpg)
  category: "bungalow",         // bungalow | rowhouse | residential | farmhouse
  status: "ongoing",            // completed | ongoing | pipeline  (= the PHASE)
  area: "3,200 Sq.ft",          // used for the "sq.ft built" stat in the profile
  year: "Dec 2026",             // completion year / target date
  duration: "On request",
  budget: "On request",
  en: {
    name: "New Villa",
    type: "Premium Bungalow",
    location: "Wagholi, Pune",
    desc: "Short description of the project...",
    highlights: ["Point one", "Point two", "Point three", "Point four"],
    // testimonial is optional:
    // testimonial: { quote: "Great work!", author: "Mr. Owner" },
  },
  mr: {
    name: "न्यू व्हिला",         // Marathi version of the same fields
    type: "प्रीमियम बंगला",
    location: "वाघोली, पुणे",
    desc: "प्रकल्पाचे थोडक्यात वर्णन...",
    highlights: ["मुद्दा एक", "मुद्दा दोन", "मुद्दा तीन", "मुद्दा चार"],
  },
},
```

That's it — the project now appears on the website and counts toward the profile stats.

---

## ✏️ Change a project's details

Open **`lib/projects.ts`**, find the project by its `name` or `slug`, and edit:

- **Name** → change `name` (in both `en` and `mr`)
- **Date** → change `year`
- **Phase** → change `status`:
  - `"completed"` → shows green **Completed** badge
  - `"ongoing"` → shows amber **Under Construction** badge
  - `"pipeline"` → shows blue **Upcoming** badge
- **Location / description / highlights** → edit those fields

---

## 🖼️ Change or add photos

Go to the project's folder `public/projects/<slug>/`:

- **Change the cover** → replace `1.jpg`
- **Add a photo** → add the next number (e.g. `5.jpg`) **and** increase `count`
  in `lib/projects.ts` by 1
- **Remove a photo** → delete the file, renumber the rest so there are no gaps
  (1, 2, 3 …), and lower `count`

---

## 🗑️ Delete a project

1. Delete its block from the `projects` list in **`lib/projects.ts`**
2. Delete its folder `public/projects/<slug>/`

---

After any change, commit and push — the live site updates automatically.
