"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Faq = { question: string; answer: string };

export function FaqIndex({ faqs }: { faqs: Faq[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <div className="mt-14 grid gap-2 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
      <div className="border-t border-white/10">
        {faqs.map((faq, index) => {
          const isActive = index === active;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;
          return (
            <div key={faq.question} className="border-b border-white/10">
              <button
                id={buttonId}
                type="button"
                onClick={() => setActive(index)}
                aria-expanded={isActive}
                aria-controls={panelId}
                className="group relative flex w-full items-baseline gap-5 py-6 text-left focus-visible:outline-none"
              >
                <span
                  className={`font-['var(--font-display)'] text-xl transition-colors duration-300 sm:text-2xl ${
                    isActive ? "text-[#c7a97b]" : "text-white/25"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-lg font-semibold transition-colors duration-300 sm:text-2xl ${
                    isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-0 h-px bg-[#c7a97b] transition-all duration-500 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full group-hover:bg-white/20"
                  }`}
                />
              </button>

              <div id={panelId} role="region" aria-labelledby={buttonId} className="lg:hidden">
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 text-base leading-8 text-white/60">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden lg:sticky lg:top-28 lg:block lg:h-fit">
        <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              role="region"
              aria-live="polite"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-['var(--font-condensed)'] text-7xl leading-none text-white/10">
                {String(active + 1).padStart(2, "0")}
              </span>
              <p className="mt-6 max-w-md text-lg leading-8 text-white/70">{faqs[active].answer}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-1.5">
            {faqs.map((faq, index) => (
              <span
                key={faq.question}
                className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                  index <= active ? "bg-[#c7a97b]" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
