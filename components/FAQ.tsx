"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const faqsData = {
  en: [
    {
      q: "Which areas do you serve?",
      a: "We're based in Pune and take on projects across the wider Maharashtra region — including bungalows, row houses, residential buildings, farmhouses, and RCC work.",
    },
    {
      q: "How do I get a quote?",
      a: "It's free and easy. Use our online cost calculator for an instant estimate, or fill out the contact form, and our team will get back to you within one business day with a detailed quote.",
    },
    {
      q: "Can I get a cost estimate before committing?",
      a: "Absolutely. Our online calculator gives you an instant ballpark based on your area and chosen package, with no obligation. For an exact figure, we'll visit your site and prepare a detailed estimate.",
    },
    {
      q: "What's included in your construction packages?",
      a: "Each package covers design, earthwork, structure, flooring, kitchen, bathroom, doors, windows, plumbing, and electrical work — with clear details on what's included at each tier. See the Packages page for a full breakdown.",
    },
    {
      q: "How long does a typical project take?",
      a: "Timelines depend on the size and scope of your project. After understanding your requirements, we share a realistic schedule upfront and keep you updated at every stage — on-time delivery is one of our core commitments.",
    },
    {
      q: "Do you handle approvals and permits?",
      a: "Yes. We guide you through the required approvals and documentation so the process is smooth and compliant from start to finish.",
    },
  ],
  mr: [
    {
      q: "तुम्ही कोणत्या भागात सेवा देता?",
      a: "आम्ही पुण्यात आधारित आहोत आणि महाराष्ट्र प्रदेशभर प्रकल्प हाती घेतो — बंगले, रो हाउस, निवासी इमारती, फार्महाउस आणि आरसीसी कामासह.",
    },
    {
      q: "मी कोटेशन कसे मिळवू?",
      a: "ते मोफत आणि सोपे आहे. त्वरित अंदाजासाठी आमचा ऑनलाइन कॉस्ट कॅल्क्युलेटर वापरा, किंवा संपर्क फॉर्म भरा — आमची टीम एका व्यावसायिक दिवसात तपशीलवार कोटेशनसह तुमच्याशी संपर्क साधेल.",
    },
    {
      q: "वचनबद्ध होण्यापूर्वी मला खर्चाचा अंदाज मिळू शकतो का?",
      a: "नक्कीच. आमचा ऑनलाइन कॅल्क्युलेटर तुमच्या क्षेत्र आणि निवडलेल्या पॅकेजवर आधारित त्वरित अंदाज देतो, कोणतेही बंधन नाही. अचूक आकड्यासाठी, आम्ही तुमच्या साइटला भेट देऊन तपशीलवार अंदाज तयार करू.",
    },
    {
      q: "तुमच्या बांधकाम पॅकेजमध्ये काय समाविष्ट आहे?",
      a: "प्रत्येक पॅकेजमध्ये डिझाइन, मातीकाम, संरचना, फ्लोरिंग, स्वयंपाकघर, बाथरूम, दरवाजे, खिडक्या, प्लंबिंग आणि विद्युत कामाचा समावेश आहे — प्रत्येक स्तरावर काय समाविष्ट आहे याचे स्पष्ट तपशील. पूर्ण माहितीसाठी पॅकेजेस पेज पहा.",
    },
    {
      q: "एक सामान्य प्रकल्प किती वेळ घेतो?",
      a: "टाइमलाइन तुमच्या प्रकल्पाच्या आकारावर आणि व्याप्तीवर अवलंबून असते. तुमच्या आवश्यकता समजून घेतल्यानंतर, आम्ही आगाऊ वास्तववादी वेळापत्रक सामायिक करतो आणि प्रत्येक टप्प्यावर तुम्हाला अपडेट ठेवतो — वेळेवर डिलिव्हरी हे आमच्या मुख्य वचनबद्धतेपैकी एक आहे.",
    },
    {
      q: "तुम्ही मंजुरी आणि परवाने सांभाळता का?",
      a: "होय. आम्ही तुम्हाला आवश्यक मंजुरी आणि दस्तऐवजीकरणाद्वारे मार्गदर्शन करतो जेणेकरून प्रक्रिया सुरुवातीपासून शेवटपर्यंत सुलभ आणि अनुपालनात असेल.",
    },
  ],
};

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-2xl border border-black/8 bg-white overflow-hidden transition-colors hover:border-amber/40">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
      >
        <span className="font-semibold text-navy">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber/10"
        >
          <Plus className="h-4 w-4 text-amber" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 text-sm text-navy/70 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { lang } = useLanguage();
  const faqs = faqsData[lang];

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <HelpCircle className="h-5 w-5 text-amber" />
            <p className="text-xs font-semibold uppercase tracking-widest text-amber">
              {lang === "en" ? "Got Questions?" : "प्रश्न आहेत का?"}
            </p>
          </div>
          <h2 className="text-3xl font-bold text-navy">
            {lang === "en" ? "Frequently Asked Questions" : "वारंवार विचारले जाणारे प्रश्न"}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-navy/60">
          {lang === "en" ? (
            <>
              Still have questions?{" "}
              <Link href="/contact" className="font-semibold text-amber hover:text-amber-light transition">
                Get in touch →
              </Link>
            </>
          ) : (
            <>
              अजून प्रश्न आहेत?{" "}
              <Link href="/contact" className="font-semibold text-amber hover:text-amber-light transition">
                संपर्क करा →
              </Link>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
