"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const PHONE = "919607407474";
const MESSAGE = encodeURIComponent("Hello! I'm interested in your construction services. Can you please share more details?");

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end gap-2 md:bottom-6">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25 }}
            className="relative flex items-center gap-2 rounded-2xl bg-white shadow-xl border border-black/8 px-4 py-3 mr-1"
          >
            <div>
              <p className="text-xs font-bold text-navy">Chat with us!</p>
              <p className="text-xs text-navy/60">We reply within minutes</p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="ml-1 text-navy/30 hover:text-navy/60 transition"
            >
              <X className="h-3 w-3" />
            </button>
            {/* Triangle pointer */}
            <div className="absolute -bottom-2 right-6 h-3 w-3 rotate-45 bg-white border-r border-b border-black/8" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.a
        href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowTooltip(false)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#25D366" }} />
        {/* WhatsApp SVG icon */}
        <svg viewBox="0 0 32 32" className="h-8 w-8 fill-white">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.738 5.469 2.028 7.77L0 32l8.43-2.007A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.77-1.853l-.486-.289-4.998 1.19 1.22-4.875-.317-.5A13.227 13.227 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.87c-.398-.2-2.355-1.163-2.72-1.295-.365-.133-.63-.2-.896.2-.266.398-1.031 1.295-1.264 1.561-.232.266-.465.3-.863.1-.398-.2-1.682-.62-3.203-1.977-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.174-.811.18-.178.398-.465.598-.698.199-.232.265-.398.398-.664.133-.265.066-.498-.034-.698-.1-.2-.896-2.16-1.228-2.958-.323-.776-.651-.671-.896-.683-.232-.01-.498-.013-.764-.013s-.697.1-.063 1.063c-.332.331-1.262 1.232-1.262 3.003 0 1.77 1.292 3.48 1.473 3.72.181.24 2.544 3.886 6.163 5.45.862.372 1.534.595 2.058.762.865.275 1.652.236 2.274.143.694-.103 2.135-.873 2.437-1.716.3-.843.3-1.565.21-1.716-.09-.15-.332-.232-.73-.432z" />
        </svg>
      </motion.a>
    </div>
  );
}
