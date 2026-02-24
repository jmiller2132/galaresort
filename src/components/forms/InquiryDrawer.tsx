"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";

interface CabinDrawerProps {
  type: "cabin";
  cabinSlug: string;
  cabinName: string;
  maxGuests: number;
}

interface CampingDrawerProps {
  type: "camping";
}

type InquiryDrawerProps = CabinDrawerProps | CampingDrawerProps;

export default function InquiryDrawer(props: InquiryDrawerProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"primary" | "general">("primary");

  const openDrawer = useCallback((m: "primary" | "general") => {
    setMode(m);
    setOpen(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  const isCabin = props.type === "cabin";

  const primaryLabel = isCabin
    ? props.cabinName.startsWith("The ")
      ? `Inquire About ${props.cabinName}`
      : `Inquire About the ${props.cabinName}`
    : "Reserve a Campsite";

  const drawerTitle = mode === "general" ? "General Inquiry" : primaryLabel;

  const formKey = isCabin ? `${mode}-${props.cabinSlug}` : `${mode}-camping`;

  const formProps =
    mode === "general"
      ? { defaultType: "general" as const }
      : isCabin
        ? { defaultCabin: props.cabinSlug, maxGuests: props.maxGuests }
        : { defaultType: "camping" as const };

  return (
    <>
      <div className="space-y-3">
        <button
          onClick={() => openDrawer("primary")}
          className="inline-flex items-center justify-center gap-2 font-semibold tracking-wide uppercase transition-all duration-300 rounded-md bg-river-blue text-white hover:bg-river-blue-light active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-river-blue focus-visible:ring-offset-2 focus-visible:ring-offset-cream px-8 py-4 text-sm w-full"
        >
          {primaryLabel}
        </button>
        <button
          onClick={() => openDrawer("general")}
          className="inline-flex items-center justify-center gap-2 font-semibold tracking-wide uppercase transition-all duration-300 rounded-md text-river-blue hover:bg-river-blue/10 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-river-blue focus-visible:ring-offset-2 focus-visible:ring-offset-cream px-6 py-3 text-sm w-full"
        >
          General Inquiry
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-cream shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-sand/50 bg-white">
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-charcoal">
                    {drawerTitle}
                  </h2>
                  <p className="text-xs text-river-gray mt-0.5">
                    We&apos;ll get back to you as soon as we can.
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md text-river-gray hover:text-charcoal hover:bg-sand/30 transition-colors"
                  aria-label="Close inquiry form"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <Suspense fallback={null}>
                  <ContactForm key={formKey} {...formProps} />
                </Suspense>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
