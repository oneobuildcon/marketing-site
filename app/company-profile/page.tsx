"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { projects } from "@/lib/projects";
import { Printer, Phone, Mail, MapPin, CheckCircle2, Share2, ClipboardList, PencilRuler, Calculator, HardHat, ShieldCheck, KeyRound, Globe, Camera, MessageCircle, Building2, CalendarDays, Users, MapPinned, Home, Layers, Warehouse, Hammer, PaintBucket } from "lucide-react";

const t = {
  en: {
    profile: "Company Profile",
    tagline: "From blueprint to brilliance.",
    about: "About Us",
    aboutText:
      "One O Buildcon is a trusted construction company based in Pune, Maharashtra, specialising in premium bungalows, row houses, residential buildings and farmhouses. From foundation and RCC work to final interior finishing, we deliver durable, modern structures with complete transparency, quality craftsmanship and on-time execution.",
    founderTitle: "Message From the Founder",
    founderName: "Avinash Shinde",
    founderRole: "Founder & Director",
    founderMsg:
      "At One O Buildcon, every project we take on is a personal commitment. From the first blueprint to the final handover, my team and I focus on honest pricing, quality craftsmanship, and delivering on time — because we are not just building structures, we are building lasting trust with every family we serve.",
    statsTitle: "By the Numbers",
    services: "Our Services",
    serviceList: [
      "Premium Bungalows",
      "Row Houses",
      "Residential Buildings",
      "Farmhouses",
      "RCC Structural Work",
      "Interior Finishing",
    ],
    why: "Why One O Buildcon?",
    whyList: [
      "End-to-End Project Execution",
      "Transparent Costing & BOQ",
      "Dedicated Site Supervision",
      "Quality Material Assurance",
      "On-Time Delivery Commitment",
      "Structural & Design Expertise",
    ],
    process: "How We Work",
    processSteps: ["Planning", "Design", "Estimation", "Construction", "Quality Inspection", "Handover"],
    portfolio: "Project Portfolio",
    completed: "Completed",
    ongoing: "Ongoing",
    contact: "Contact Us",
    phone: "Phone",
    email: "Email",
    address: "Address",
    addressVal: "Pune, Maharashtra, India",
    download: "Download PDF",
    preparing: "Preparing…",
    share: "Share",
    copied: "Link copied!",
    cats: {
      bungalow: "Bungalow",
      rowhouse: "Row House",
      residential: "Residential Building",
      farmhouse: "Farmhouse",
    },
    stat: (n: number, s: string, l: string) => ({ value: `${n}${s}`, label: l }),
    statLabels: ["Projects Completed", "Years Experience", "Happy Clients", "Cities Served"],
    location: "Location",
  },
  mr: {
    profile: "कंपनी प्रोफाइल",
    tagline: "ब्लूप्रिंटपासून उत्कृष्टतेपर्यंत.",
    about: "आमच्याबद्दल",
    aboutText:
      "वन ओ बिल्डकॉन ही पुणे, महाराष्ट्र येथील एक विश्वासू बांधकाम कंपनी आहे, जी प्रीमियम बंगले, रो हाउस, निवासी इमारती आणि फार्महाउसमध्ये तज्ञ आहे. पाया आणि आरसीसी कामापासून अंतिम इंटेरियर फिनिशिंगपर्यंत, आम्ही पूर्ण पारदर्शकता, दर्जेदार कारागिरी आणि वेळेवर अंमलबजावणीसह टिकाऊ, आधुनिक संरचना देतो.",
    founderTitle: "संस्थापकांचा संदेश",
    founderName: "अविनाश शिंदे",
    founderRole: "संस्थापक व संचालक",
    founderMsg:
      "वन ओ बिल्डकॉनमध्ये आम्ही घेतलेला प्रत्येक प्रकल्प ही वैयक्तिक बांधिलकी असते. पहिल्या ब्लूप्रिंटपासून अंतिम हस्तांतरणापर्यंत, माझी टीम आणि मी प्रामाणिक किंमत, दर्जेदार कारागिरी आणि वेळेवर पूर्णत्वावर लक्ष केंद्रित करतो — कारण आम्ही केवळ संरचना नाही, तर प्रत्येक कुटुंबाशी टिकाऊ विश्वास बांधतो.",
    statsTitle: "आकड्यांमध्ये",
    services: "आमच्या सेवा",
    serviceList: [
      "प्रीमियम बंगले",
      "रो हाउस",
      "निवासी इमारती",
      "फार्महाउस",
      "आरसीसी संरचनात्मक काम",
      "इंटेरियर फिनिशिंग",
    ],
    why: "वन ओ बिल्डकॉनच का?",
    whyList: [
      "संपूर्ण प्रकल्प अंमलबजावणी",
      "पारदर्शक खर्च आणि बीओक्यू",
      "समर्पित साइट पर्यवेक्षण",
      "दर्जेदार सामग्रीची हमी",
      "वेळेवर पूर्णत्वाची हमी",
      "संरचनात्मक व डिझाइन तज्ञता",
    ],
    process: "आम्ही कसे काम करतो",
    processSteps: ["नियोजन", "डिझाइन", "अंदाजपत्रक", "बांधकाम", "गुणवत्ता तपासणी", "हस्तांतरण"],
    portfolio: "प्रकल्प पोर्टफोलिओ",
    completed: "पूर्ण",
    ongoing: "सुरू",
    contact: "संपर्क करा",
    phone: "फोन",
    email: "ईमेल",
    address: "पत्ता",
    addressVal: "पुणे, महाराष्ट्र, भारत",
    download: "पीडीएफ डाउनलोड करा",
    preparing: "तयार होत आहे…",
    share: "शेअर करा",
    copied: "लिंक कॉपी झाली!",
    cats: {
      bungalow: "बंगला",
      rowhouse: "रो हाउस",
      residential: "निवासी इमारत",
      farmhouse: "फार्महाउस",
    },
    stat: (n: number, s: string, l: string) => ({ value: `${n}${s}`, label: l }),
    statLabels: ["पूर्ण झालेले प्रकल्प", "वर्षांचा अनुभव", "समाधानी ग्राहक", "सेवा दिलेली शहरे"],
    location: "ठिकाण",
  },
};

const statValues = [
  { n: 20, s: "+" },
  { n: 6, s: "+" },
  { n: 25, s: "+" },
  { n: 3, s: "" },
];

const processIcons = [ClipboardList, PencilRuler, Calculator, HardHat, ShieldCheck, KeyRound];
const statIcons = [Building2, CalendarDays, Users, MapPinned];
const serviceIcons = [Home, Layers, Building2, Warehouse, Hammer, PaintBucket];

export default function CompanyProfilePage() {
  const { lang } = useLanguage();
  const c = t[lang];
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    const el = document.getElementById("profile-doc");
    if (!el) return;
    setDownloading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const img = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgH = (canvas.height * pageW) / canvas.width;
      let heightLeft = imgH;
      let position = 0;
      pdf.addImage(img, "JPEG", 0, position, pageW, imgH);
      heightLeft -= pageH;
      while (heightLeft > 0) {
        position -= pageH;
        pdf.addPage();
        pdf.addImage(img, "JPEG", 0, position, pageW, imgH);
        heightLeft -= pageH;
      }
      pdf.save("One-O-Buildcon-Company-Profile.pdf");
    } finally {
      setDownloading(false);
    }
  };

  // Live counts derived from the actual projects data
  const completedCount = projects.filter((p) => p.status === "completed").length;
  const ongoingCount = projects.filter((p) => p.status === "ongoing").length;

  const handleShare = async () => {
    const url = "https://oneobuildcon.com/company-profile";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "One O Buildcon — Company Profile", url });
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      alert(c.copied);
    } catch {
      window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank");
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen py-8 print:bg-white print:py-0">
      {/* Action bar — hidden when printing */}
      <div className="no-print mx-auto mb-6 flex max-w-4xl justify-end gap-3 px-4 sm:px-6">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 rounded-md border border-navy/30 px-5 py-2.5 font-semibold text-navy transition hover:bg-navy/5"
        >
          <Share2 className="h-4 w-4" /> {c.share}
        </button>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 rounded-md bg-amber px-5 py-2.5 font-semibold text-navy transition hover:bg-amber-light disabled:opacity-60"
        >
          <Printer className="h-4 w-4" /> {downloading ? c.preparing : c.download}
        </button>
      </div>

      {/* The printable A4 document */}
      <article id="profile-doc" className="profile-doc mx-auto max-w-4xl bg-white text-navy shadow-xl print:max-w-none print:shadow-none">
        {/* Header / cover */}
        <header className="flex items-center gap-4 bg-navy px-5 py-6 text-white sm:gap-5 sm:px-10 sm:py-8">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-amber/40 sm:h-20 sm:w-20">
            <Image src="/logo.png" alt="One O Buildcon" fill className="object-contain p-1" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold sm:text-3xl">
              One O <span className="text-amber">Buildcon</span>
            </h1>
            <p className="text-amber-light">{c.tagline}</p>
            <p className="mt-1 text-sm text-white/70">{c.profile}</p>
          </div>
        </header>

        <div className="space-y-10 px-5 py-8 sm:space-y-14 sm:px-10 sm:py-12">
          {/* About */}
          <section>
            <h2 className="mb-3 border-l-4 border-amber pl-3 font-display text-xl font-bold">{c.about}</h2>
            <p className="leading-relaxed text-gray-700">{c.aboutText}</p>
          </section>

          {/* Stats */}
          <section>
            <h2 className="mb-4 border-l-4 border-amber pl-3 font-display text-xl font-bold">{c.statsTitle}</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {statValues.map((s, i) => {
                const Icon = statIcons[i];
                return (
                  <div key={i} className="flex flex-col items-center rounded-lg bg-navy/5 px-3 py-4 text-center">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-navy text-amber">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="font-display text-3xl font-bold text-amber">
                      {s.n}
                      {s.s}
                    </p>
                    <p className="mt-1 text-xs font-medium text-gray-600">{c.statLabels[i]}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Services + Why (two columns) */}
          <section className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="mb-3 border-l-4 border-amber pl-3 font-display text-xl font-bold">{c.services}</h2>
              <ul className="space-y-2.5">
                {c.serviceList.map((s, i) => {
                  const Icon = serviceIcons[i] ?? CheckCircle2;
                  return (
                    <li key={s} className="flex items-center gap-2.5 text-gray-700">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber/15 text-amber">
                        <Icon className="h-4 w-4" />
                      </span>
                      {s}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h2 className="mb-3 border-l-4 border-amber pl-3 font-display text-xl font-bold">{c.why}</h2>
              <ul className="space-y-2">
                {c.whyList.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Process flow — how projects are delivered */}
          <section className="break-inside-avoid">
            <h2 className="mb-4 border-l-4 border-amber pl-3 font-display text-xl font-bold">{c.process}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {c.processSteps.map((step, i) => {
                const Icon = processIcons[i];
                return (
                  <div key={step} className="relative flex flex-col items-center rounded-lg bg-navy/5 px-2 py-4 text-center">
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-navy text-amber">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-bold text-amber">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-0.5 text-xs font-semibold leading-tight text-navy">{step}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Portfolio — generated live from projects data */}
          <section className="break-inside-avoid">
            <h2 className="mb-1 border-l-4 border-amber pl-3 font-display text-xl font-bold">{c.portfolio}</h2>
            <p className="mb-4 pl-3 text-sm text-gray-500">
              {projects.length} {lang === "en" ? "projects" : "प्रकल्प"} · {completedCount} {c.completed} · {ongoingCount} {c.ongoing}
            </p>
            {/* Completed projects (real photos) and ongoing projects, grouped */}
            {(["completed", "ongoing"] as const).map((group) => {
              const items = projects.filter((p) => p.status === group);
              if (items.length === 0) return null;
              return (
                <div key={group} className="mt-5">
                  <div className="mb-3 flex items-center gap-2 pl-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${group === "completed" ? "bg-green-500" : "bg-amber"}`}
                    />
                    <h3 className="font-display text-base font-bold text-navy">
                      {group === "completed" ? c.completed : c.ongoing} {lang === "en" ? "Projects" : "प्रकल्प"}
                    </h3>
                    <span className="text-sm text-gray-400">({items.length})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {items.map((p) => {
                      const content = p[lang];
                      return (
                        <div key={p.slug} className="break-inside-avoid overflow-hidden rounded-lg border border-gray-200">
                          <div className="relative aspect-[4/3] w-full bg-gray-100">
                            <Image
                              src={`/projects/${p.slug}/1.jpg`}
                              alt={content.name}
                              fill
                              sizes="(max-width: 640px) 50vw, 33vw"
                              className="object-cover"
                            />
                          </div>
                          <div className="px-3 py-2">
                            <p className="truncate text-sm font-semibold text-navy">{content.name}</p>
                            <p className="truncate text-xs text-gray-500">{content.location}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Founder message — placed near the end */}
          <section className="break-inside-avoid rounded-lg border border-amber/30 bg-amber/5 p-5 sm:p-6">
            <h2 className="mb-4 font-display text-xl font-bold text-navy">{c.founderTitle}</h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-amber/40">
                <Image src="/logo.png" alt={c.founderName} fill className="object-contain p-1" />
              </div>
              <div>
                <p className="italic leading-relaxed text-gray-700">&ldquo;{c.founderMsg}&rdquo;</p>
                <p className="mt-3 font-display text-lg font-bold text-navy">{c.founderName}</p>
                <p className="text-sm font-medium text-amber">{c.founderRole}</p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="break-inside-avoid rounded-lg bg-navy px-5 py-6 text-white sm:px-6">
            <h2 className="mb-4 font-display text-xl font-bold">{c.contact}</h2>
            <div className="grid gap-3 text-sm sm:grid-cols-3 sm:text-base">
              <a href="tel:+918806029907" className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-amber" /> +91 88060 29907
              </a>
              <a href="mailto:oneobuildcon@gmail.com" className="flex items-center gap-2 break-all">
                <Mail className="h-4 w-4 shrink-0 text-amber" /> oneobuildcon@gmail.com
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-amber" /> {c.addressVal}
              </p>
              <a href="https://oneobuildcon.com" className="flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0 text-amber" /> oneobuildcon.com
              </a>
              <a href="https://wa.me/918806029907" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-amber" /> WhatsApp
              </a>
              <a href="https://instagram.com/one_o_buildcon" className="flex items-center gap-2">
                <Camera className="h-4 w-4 shrink-0 text-amber" /> @one_o_buildcon
              </a>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
