"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { projects } from "@/lib/projects";
import {
  Printer, Phone, Mail, MapPin, CheckCircle2, Share2, ClipboardList, PencilRuler,
  Calculator, HardHat, ShieldCheck, KeyRound, Globe, Camera, MessageCircle, Building2,
  CalendarDays, Users, Home, Layers, Warehouse, Hammer, PaintBucket, Ruler, Star,
  Package, Phone as PhoneIcon, Sparkles, Languages, Gem, Handshake, Clock, Eye,
} from "lucide-react";

const t = {
  en: {
    profile: "Company Profile",
    tagline: "From blueprint to brilliance.",
    rating: "5.0 Rating on Google",
    about: "About Us",
    aboutText:
      "One O Buildcon is a Pune-based construction company specializing in premium residential, commercial and farmhouse projects. With 6+ years of experience and 20+ completed projects, we provide end-to-end construction solutions — from planning and RCC work to interior finishing — ensuring quality, transparency and timely delivery on every site we take on.",
    founderTitle: "Our Commitment",
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
    why: "Why Clients Choose One O Buildcon",
    whyList: [
      "Transparent BOQ & Costing",
      "No Hidden Costs",
      "Daily Site Updates",
      "Branded Material Usage",
      "Dedicated Project Manager",
      "On-Time Handover",
      "Structural Warranty",
      "Post-Handover Support",
    ],
    quality: "Our Quality Commitment",
    qualityList: [
      "IS Standard Construction Practices",
      "Branded Material Usage",
      "Structural Safety Checks",
      "Multi-Level Quality Inspection",
      "Waterproofing Assurance",
      "Daily Site Supervision",
    ],
    materials: "Materials We Trust",
    materialsList: ["Birla Super Cement", "JK Cement", "Tata Tiscon Steel", "Uma TMT", "Asian Paints", "Cera", "Varmora Tiles", "Jaquar", "Kajaria Tiles", "Polycab", "Dr. Fixit"],
    team: "Our Team",
    teamList: ["Civil Engineers", "Architects", "Site Supervisors", "Skilled Technicians", "Project Managers"],
    teamStrength: "Team Strength",
    coreValues: "Our Core Values",
    coreValuesList: ["Quality", "Transparency", "Commitment", "Safety", "Timely Delivery"],
    safety: "Safety First",
    safetyList: ["PPE Compliance", "Site Safety Inspections", "Structural Safety Checks", "Safe Work Practices"],
    serviceAreas: "Service Areas",
    serviceAreasList: ["Pune", "PCMC", "Chakan", "Alandi", "Charholi", "Moshi", "Wagholi"],
    closing: "Your vision. Our expertise. Built to last.",
    process: "How We Work",
    processSteps: ["Planning", "Design", "Estimation", "Construction", "Quality Inspection", "Handover"],
    portfolio: "Featured Projects",
    completed: "Completed",
    ongoing: "Ongoing",
    pipeline: "Pipeline",
    underConstruction: "Under Construction",
    planned: "Planned",
    expected: "Expected",
    certs: "Certifications & Registrations",
    certNote: "Registered & compliant — documents available on request.",
    testimonialsTitle: "What Our Clients Say",
    ctaTitle: "Planning Your Dream Home?",
    ctaBtn: "Schedule a Free Site Visit",
    contact: "Free Consultation",
    contactSub: "Get in touch — we respond within 24 hours.",
    callNow: "Call Now",
    scanLabel: "Scan to visit our website",
    download: "Download PDF",
    preparing: "Preparing…",
    share: "Share",
    copied: "Link copied!",
    statLabels: ["Projects Completed", "Sq.ft Constructed", "Satisfied Clients", "Years Experience"],
    projectsWord: "projects",
  },
  mr: {
    profile: "कंपनी प्रोफाइल",
    tagline: "ब्लूप्रिंटपासून उत्कृष्टतेपर्यंत.",
    rating: "गूगलवर ५.० रेटिंग",
    about: "आमच्याबद्दल",
    aboutText:
      "वन ओ बिल्डकॉन ही पुणेस्थित बांधकाम कंपनी आहे, जी प्रीमियम निवासी, व्यावसायिक आणि फार्महाउस प्रकल्पांमध्ये तज्ञ आहे. ६+ वर्षांचा अनुभव आणि २०+ पूर्ण झालेल्या प्रकल्पांसह, आम्ही नियोजन आणि आरसीसी कामापासून इंटेरियर फिनिशिंगपर्यंत संपूर्ण बांधकाम उपाय देतो — प्रत्येक साइटवर दर्जा, पारदर्शकता आणि वेळेवर पूर्णत्वाची हमी देत.",
    founderTitle: "आमची बांधिलकी",
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
    why: "ग्राहक वन ओ बिल्डकॉनच का निवडतात",
    whyList: [
      "पारदर्शक बीओक्यू आणि खर्च",
      "कोणतेही छुपे खर्च नाहीत",
      "दैनंदिन साइट अपडेट्स",
      "ब्रँडेड सामग्रीचा वापर",
      "समर्पित प्रकल्प व्यवस्थापक",
      "वेळेवर हस्तांतरण",
      "संरचनात्मक वॉरंटी",
      "हस्तांतरणानंतर सहाय्य",
    ],
    quality: "आमची गुणवत्ता बांधिलकी",
    qualityList: [
      "आयएस मानक बांधकाम पद्धती",
      "ब्रँडेड सामग्रीचा वापर",
      "संरचनात्मक सुरक्षा तपासणी",
      "बहु-स्तरीय गुणवत्ता तपासणी",
      "वॉटरप्रूफिंग हमी",
      "दैनंदिन साइट पर्यवेक्षण",
    ],
    materials: "आम्ही विश्वास ठेवतो ती सामग्री",
    materialsList: ["बिर्ला सुपर सिमेंट", "जेके सिमेंट", "टाटा टिस्कॉन स्टील", "उमा टीएमटी", "एशियन पेंट्स", "सेरा", "व्हर्मोरा टाइल्स", "जॅक्वार", "कजारिया टाइल्स", "पॉलिकॅब", "डॉ. फिक्सिट"],
    team: "आमची टीम",
    teamList: ["सिव्हिल इंजिनिअर्स", "आर्किटेक्ट्स", "साइट सुपरवायझर्स", "कुशल तंत्रज्ञ", "प्रकल्प व्यवस्थापक"],
    teamStrength: "टीम संख्या",
    coreValues: "आमची मूल्ये",
    coreValuesList: ["दर्जा", "पारदर्शकता", "बांधिलकी", "सुरक्षा", "वेळेवर पूर्णत्व"],
    safety: "सुरक्षा प्रथम",
    safetyList: ["पीपीई अनुपालन", "साइट सुरक्षा तपासणी", "संरचनात्मक सुरक्षा तपासणी", "सुरक्षित कार्यपद्धती"],
    serviceAreas: "सेवा क्षेत्रे",
    serviceAreasList: ["पुणे", "पीसीएमसी", "चाकण", "आळंदी", "चऱ्होली", "मोशी", "वाघोली"],
    closing: "तुमची दूरदृष्टी. आमची तज्ञता. टिकणारे बांधकाम.",
    process: "आम्ही कसे काम करतो",
    processSteps: ["नियोजन", "डिझाइन", "अंदाजपत्रक", "बांधकाम", "गुणवत्ता तपासणी", "हस्तांतरण"],
    portfolio: "निवडक प्रकल्प",
    completed: "पूर्ण",
    ongoing: "सुरू",
    pipeline: "नियोजित",
    underConstruction: "बांधकाम सुरू",
    planned: "नियोजित",
    expected: "अपेक्षित",
    certs: "प्रमाणपत्रे व नोंदणी",
    certNote: "नोंदणीकृत व अनुपालनशील — कागदपत्रे विनंतीनुसार उपलब्ध.",
    testimonialsTitle: "आमचे ग्राहक काय म्हणतात",
    ctaTitle: "तुमच्या स्वप्नातील घराचे नियोजन करत आहात?",
    ctaBtn: "मोफत साइट भेटीचे नियोजन करा",
    contact: "मोफत सल्ला",
    contactSub: "संपर्क करा — आम्ही २४ तासांत प्रतिसाद देतो.",
    callNow: "आता कॉल करा",
    scanLabel: "वेबसाइटला भेट देण्यासाठी स्कॅन करा",
    download: "पीडीएफ डाउनलोड करा",
    preparing: "तयार होत आहे…",
    share: "शेअर करा",
    copied: "लिंक कॉपी झाली!",
    statLabels: ["पूर्ण झालेले प्रकल्प", "बांधलेले चौ.फूट", "समाधानी ग्राहक", "वर्षांचा अनुभव"],
    projectsWord: "प्रकल्प",
  },
};

const statValues = [
  { v: "20+", icon: Building2 },
  { v: "60,000+", icon: Ruler },
  { v: "25+", icon: Users },
  { v: "6+", icon: CalendarDays },
];

const processIcons = [ClipboardList, PencilRuler, Calculator, HardHat, ShieldCheck, KeyRound];
const serviceIcons = [Home, Layers, Building2, Warehouse, Hammer, PaintBucket];
const valueIcons = [Gem, Eye, Handshake, ShieldCheck, Clock];
const WEBSITE = "https://oneobuildcon.com";

export default function CompanyProfilePage() {
  const { lang, setLang } = useLanguage();
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
      pdf.save(lang === "mr" ? "One-O-Buildcon-Company-Profile-Marathi.pdf" : "One-O-Buildcon-Company-Profile.pdf");
    } finally {
      setDownloading(false);
    }
  };

  // Live counts derived from the actual projects data
  const completedCount = projects.filter((p) => p.status === "completed").length;
  const ongoingCount = projects.filter((p) => p.status === "ongoing").length;
  const pipelineCount = projects.filter((p) => p.status === "pipeline").length;

  const handleShare = async () => {
    const url = `${WEBSITE}/company-profile`;
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
      <div className="no-print mx-auto mb-6 flex max-w-4xl flex-wrap items-center justify-end gap-3 px-4 sm:px-6">
        <button
          onClick={() => setLang(lang === "en" ? "mr" : "en")}
          className="flex items-center gap-2 rounded-md border border-navy/30 px-5 py-2.5 font-semibold text-navy transition hover:bg-navy/5"
          aria-label="Toggle language"
        >
          <Languages className="h-4 w-4 text-amber" /> {lang === "en" ? "मराठी" : "English"}
        </button>
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
        {/* Cover — hero project image with navy overlay + living sheen */}
        <header className="relative overflow-hidden bg-navy text-white">
          <div className="absolute inset-0 cover-zoom">
            <Image
              src="/projects/shinde/1.jpg"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover opacity-25"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy/95 to-navy/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-transparent to-navy-dark/30" />
          <div className="absolute inset-0 cover-grid opacity-30" />
          <div className="pointer-events-none absolute inset-0 cover-sheen" />
          <div className="relative flex flex-col gap-6 px-5 py-12 sm:px-10 sm:py-16">
            <div className="flex flex-col items-start gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-amber/40 sm:h-20 sm:w-20">
                <Image src="/logo.png" alt="One O Buildcon" fill className="object-contain p-1" />
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber/80">{c.profile}</p>
                <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
                  One O <span className="text-amber">Buildcon</span>
                </h1>
                <p className="mt-2 text-lg text-amber-light sm:text-xl">{c.tagline}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/60 sm:text-sm">
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-semibold text-white">
                <Star className="h-4 w-4 fill-amber text-amber" /> {c.rating}
              </span>
              <a href="tel:+918806029907" className="flex items-center gap-1.5">
                <PhoneIcon className="h-3.5 w-3.5 text-amber" /> +91 88060 29907
              </a>
              <a href={WEBSITE} className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-amber" /> oneobuildcon.com
              </a>
            </div>
          </div>
          {/* Brand accent bar */}
          <div className="relative h-1.5 w-full bg-gradient-to-r from-amber via-amber-light to-amber" />
        </header>

        <div className="space-y-12 px-5 py-8 sm:space-y-16 sm:px-10 sm:py-12">
          {/* About */}
          <section>
            <h2 className="mb-3 border-l-4 border-amber pl-3 font-display text-xl font-bold">{c.about}</h2>
            <p className="leading-relaxed text-gray-700">{c.aboutText}</p>
          </section>

          {/* Stats — corporate navy band */}
          <section>
            <h2 className="mb-4 border-l-4 border-amber pl-3 font-display text-xl font-bold">{c.statsTitle}</h2>
            <div className="overflow-hidden rounded-xl bg-gradient-to-br from-navy to-navy-dark shadow-lg">
              <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4 sm:[&>*:nth-child(-n+2)]:border-b-0 [&>*:nth-child(2)]:border-r-0 sm:[&>*:nth-child(2)]:border-r [&>*:nth-child(-n+2)]:border-b [&>*:nth-child(-n+2)]:border-white/10 sm:[&>*]:border-b-0">
                {statValues.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex flex-col items-center px-3 py-6 text-center">
                      <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-amber/15 text-amber ring-1 ring-amber/30">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="font-display text-2xl font-bold text-amber sm:text-3xl">{s.v}</p>
                      <p className="mt-1 text-xs font-medium text-white/70">{c.statLabels[i]}</p>
                    </div>
                  );
                })}
              </div>
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

          {/* Core Values */}
          <section className="break-inside-avoid">
            <h2 className="mb-4 border-l-4 border-amber pl-3 font-display text-xl font-bold">{c.coreValues}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {c.coreValuesList.map((v, i) => {
                const Icon = valueIcons[i] ?? CheckCircle2;
                return (
                  <div key={v} className="flex flex-col items-center gap-2 rounded-lg border border-navy/10 bg-navy/5 px-3 py-4 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-amber">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-navy">{v}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quality + Materials (two columns) */}
          <section className="grid gap-8 sm:grid-cols-2">
            <div className="break-inside-avoid">
              <h2 className="mb-3 flex items-center gap-2 border-l-4 border-amber pl-3 font-display text-xl font-bold">
                {c.quality}
              </h2>
              <ul className="space-y-2">
                {c.qualityList.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-gray-700">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="break-inside-avoid">
              <h2 className="mb-3 flex items-center gap-2 border-l-4 border-amber pl-3 font-display text-xl font-bold">
                {c.materials}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {c.materialsList.map((m) => (
                  <li key={m} className="flex items-center gap-1.5 rounded-full border border-navy/15 bg-navy/5 px-3 py-1.5 text-sm font-medium text-navy">
                    <Package className="h-3.5 w-3.5 text-amber" /> {m}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Safety First */}
          <section className="break-inside-avoid rounded-xl border border-green-200 bg-green-50/60 p-5 sm:p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-navy">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white">
                <ShieldCheck className="h-5 w-5" />
              </span>
              {c.safety}
            </h2>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {c.safetyList.map((s) => (
                <div key={s} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" /> {s}
                </div>
              ))}
            </div>
          </section>

          {/* Team + Service Areas (two columns) */}
          <section className="grid gap-8 sm:grid-cols-2">
            <div className="break-inside-avoid">
              <h2 className="mb-4 border-l-4 border-amber pl-3 font-display text-xl font-bold">{c.team}</h2>
              <div className="flex flex-wrap items-center gap-2.5">
                {c.teamList.map((role) => (
                  <span key={role} className="flex items-center gap-1.5 rounded-lg bg-navy/5 px-3 py-2 text-sm font-medium text-gray-700">
                    <Users className="h-4 w-4 text-amber" /> {role}
                  </span>
                ))}
                <span className="flex items-center gap-1.5 rounded-lg bg-amber px-3 py-2 text-sm font-bold text-navy">
                  <Sparkles className="h-4 w-4" /> {c.teamStrength}: 25+
                </span>
              </div>
            </div>
            <div className="break-inside-avoid">
              <h2 className="mb-4 border-l-4 border-amber pl-3 font-display text-xl font-bold">{c.serviceAreas}</h2>
              <div className="flex flex-wrap items-center gap-2.5">
                {c.serviceAreasList.map((area) => (
                  <span key={area} className="flex items-center gap-1.5 rounded-full border border-navy/15 bg-navy/5 px-3 py-1.5 text-sm font-medium text-navy">
                    <MapPin className="h-3.5 w-3.5 text-amber" /> {area}
                  </span>
                ))}
              </div>
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
              {projects.length} {c.projectsWord} · {completedCount} {c.completed} · {ongoingCount} {c.ongoing} · {pipelineCount} {c.pipeline}
            </p>
            {(["completed", "ongoing", "pipeline"] as const).map((group) => {
              const items = projects.filter((p) => p.status === group);
              if (items.length === 0) return null;
              const dot = group === "completed" ? "bg-green-500" : group === "ongoing" ? "bg-amber" : "bg-sky-500";
              const heading = group === "completed" ? c.completed : group === "ongoing" ? c.ongoing : c.pipeline;
              return (
                <div key={group} className="mt-5">
                  <div className="mb-3 flex items-center gap-2 pl-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
                    <h3 className="font-display text-base font-bold text-navy">
                      {heading} {c.projectsWord}
                    </h3>
                    <span className="text-sm text-gray-400">({items.length})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {items.map((p) => {
                      const content = p[lang];
                      return (
                        <div key={p.slug} className="break-inside-avoid overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                          <div className="relative aspect-[4/3] w-full bg-gray-100">
                            <Image
                              src={`/projects/${p.slug}/1.jpg`}
                              alt={content.name}
                              fill
                              sizes="(max-width: 640px) 50vw, 33vw"
                              className="object-cover"
                            />
                            {group === "completed" && (
                              <span className="absolute left-2 top-2 rounded bg-green-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                                {c.completed}
                              </span>
                            )}
                            {group === "ongoing" && (
                              <span className="absolute left-2 top-2 rounded bg-amber px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy shadow">
                                {c.underConstruction}
                              </span>
                            )}
                            {group === "pipeline" && (
                              <span className="absolute left-2 top-2 rounded bg-sky-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                                {c.planned}
                              </span>
                            )}
                          </div>
                          <div className="px-3 py-2.5">
                            <p className="truncate font-display text-base font-bold text-navy">{content.name}</p>
                            <p className="truncate text-[11px] font-medium uppercase tracking-wide text-amber">{content.type}</p>
                            <p className="truncate text-xs text-gray-500">{content.location}</p>
                            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-600">
                              <span className="flex items-center gap-1">
                                <Ruler className="h-3 w-3 text-amber" /> {p.area}
                              </span>
                              {p.year && (
                                <span className="flex items-center gap-1">
                                  <CalendarDays className="h-3 w-3 text-amber" />
                                  {group === "completed" ? p.year : `${c.expected} ${p.year}`}
                                </span>
                              )}
                            </div>
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

          {/* Strong closing statement */}
          <section className="break-inside-avoid text-center">
            <p className="mx-auto max-w-2xl font-display text-xl font-bold italic leading-snug text-navy sm:text-2xl">
              &ldquo;{c.closing}&rdquo;
            </p>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber to-amber-light" />
          </section>

          {/* Contact — Free Consultation with QR code */}
          <section className="break-inside-avoid rounded-lg bg-navy px-5 py-6 text-white sm:px-6">
            <h2 className="font-display text-xl font-bold">{c.contact}</h2>
            <p className="mb-4 text-sm text-white/70">{c.contactSub}</p>
            {/* Lead-generation call-to-action */}
            <a
              href="tel:+918806029907"
              className="mb-6 flex flex-col items-start gap-2 rounded-lg border border-amber/40 bg-amber/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-display text-lg font-bold text-amber-light">{c.ctaTitle}</span>
              <span className="flex items-center gap-2 rounded-md bg-amber px-4 py-2 text-sm font-bold text-navy">
                <Phone className="h-4 w-4" /> {c.ctaBtn}
              </span>
            </a>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="grid gap-3.5 text-base sm:text-lg">
                <a href="tel:+918806029907" className="flex items-center gap-2.5">
                  <Phone className="h-5 w-5 shrink-0 text-amber" /> +91 88060 29907
                </a>
                <a href="https://wa.me/918806029907" className="flex items-center gap-2.5">
                  <MessageCircle className="h-5 w-5 shrink-0 text-amber" /> WhatsApp
                </a>
                <a href="mailto:oneobuildcon@gmail.com" className="flex items-center gap-2.5 break-all">
                  <Mail className="h-5 w-5 shrink-0 text-amber" /> oneobuildcon@gmail.com
                </a>
                <a href={WEBSITE} className="flex items-center gap-2.5">
                  <Globe className="h-5 w-5 shrink-0 text-amber" /> oneobuildcon.com
                </a>
                <a href="https://instagram.com/one_o_buildcon" className="flex items-center gap-2.5">
                  <Camera className="h-5 w-5 shrink-0 text-amber" /> @one_o_buildcon
                </a>
                <p className="flex items-center gap-2.5">
                  <MapPin className="h-5 w-5 shrink-0 text-amber" /> Pune, Maharashtra, India
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                {/* QR links to the website */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=0&data=${encodeURIComponent(WEBSITE)}`}
                  alt="QR code to oneobuildcon.com"
                  crossOrigin="anonymous"
                  className="h-28 w-28 rounded-lg bg-white p-2"
                />
                <span className="max-w-[8rem] text-center text-xs text-white/60">{c.scanLabel}</span>
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
