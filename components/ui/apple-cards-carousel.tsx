"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface CardData {
  category: string;
  title: string;
  src: string;
  content: React.ReactNode;
}

export const Carousel = ({ items, initialScroll = 0 }: { items: React.ReactNode[]; initialScroll?: number }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScroll();
    }
  }, [initialScroll]);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-end gap-2 mb-4 max-w-7xl mx-auto px-4 md:px-8">
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-650 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-650 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div
        ref={carouselRef}
        onScroll={checkScroll}
        className="flex w-full overflow-x-auto py-4 scrollbar-none gap-6 px-4 md:px-8 max-w-7xl mx-auto scroll-smooth"
      >
        {items.map((item, index) => (
          <div key={index} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Card = ({ card, index, layout = true }: { card: CardData; index: number; layout?: boolean }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-55 overflow-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/40 pointer-events-none"
            />
            <motion.div
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="bg-white max-w-3xl w-full h-[80vh] md:h-[85vh] rounded-3xl overflow-hidden border border-slate-100 shadow-2xl relative flex flex-col"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="h-56 md:h-80 w-full relative shrink-0">
                <img src={card.src} alt={card.title} className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-6 text-white space-y-1">
                  <span className="inline-block bg-white/20 text-white backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                    {card.category}
                  </span>
                  <h4 className="text-lg md:text-2xl font-black">{card.title}</h4>
                </div>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-1 text-xs md:text-sm leading-relaxed text-slate-600 font-medium font-sans">
                {card.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="w-72 h-[380px] rounded-3xl bg-slate-100 overflow-hidden relative flex flex-col justify-end p-6 border border-slate-150 shadow-xs hover-lift cursor-pointer group text-left"
      >
        <img
          src={card.src}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-white space-y-2">
          <span className="inline-block bg-white/20 text-white backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
            {card.category}
          </span>
          <h4 className="text-base font-black leading-tight text-white drop-shadow-md">
            {card.title}
          </h4>
        </div>
      </motion.button>
    </>
  );
};
