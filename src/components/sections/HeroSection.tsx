"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/wolf-river-canoe.png"
        alt="Canoeing down the Wolf River surrounded by lush green trees on a sunny day"
        fill
        className="object-cover"
        priority
        sizes="100vw"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-b from-river-blue-dark/55 via-river-blue-dark/25 to-river-blue-dark/65" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-wood-light mb-6"
        >
          Wolf River &bull; Fremont, WI
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight"
        >
          Life on the River
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
        >
          Waterfront cabins, riverside camping, live music, and good
          times on the Wolf River. This is The Gala.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/contact" variant="primary" size="lg">
            Check Cabin & Camping Availability
          </Button>
          <Button href="/stay" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-river-blue-dark">
            Explore Stays
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
