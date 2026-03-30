"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { HeroSlide } from "@/data/mock";

interface HeroSliderProps {
  slides: HeroSlide[];
  autoplayInterval?: number;
}

export function HeroSlider({ slides, autoplayInterval = 5000 }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, autoplayInterval);
    return () => clearInterval(timer);
  }, [next, autoplayInterval]);

  const slide = slides[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="relative w-full overflow-hidden bg-artiz-primary" style={{ height: "clamp(400px, 60vh, 600px)" }}>
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background gradient placeholder */}
          <div className="absolute inset-0 bg-gradient-to-bl from-artiz-primary via-artiz-primary/90 to-artiz-primary/70" />

          {/* Decorative accent */}
          <div
            className="absolute top-0 left-0 w-1/2 h-full opacity-10"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${["#f28db2", "#c6e8f1", "#fde480", "#b0d8a2"][current % 4]} 0%, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative h-full container mx-auto px-6 flex items-center">
            <div className="max-w-xl text-white space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-3xl md:text-5xl font-bold leading-tight"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="text-base md:text-lg text-white/80 leading-relaxed max-w-md"
              >
                {slide.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Link href={slide.buttonLink}>
                  <Button
                    size="lg"
                    className="bg-artiz-pink hover:bg-artiz-pink/90 text-white rounded-full text-base px-8 py-6"
                  >
                    {slide.buttonText}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        aria-label="שקופית הבאה"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        aria-label="שקופית קודמת"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-artiz-pink" : "w-2.5 bg-white/40"
            }`}
            aria-label={`שקופית ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
