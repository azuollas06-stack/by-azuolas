"use client";

import { MotionConfig } from "framer-motion";

/**
 * Honours prefers-reduced-motion across every Framer animation at once.
 *
 * The GSAP components each guard for the media query themselves, but the Framer
 * ones did not — the divider rules, Hero CTA, scroll cue, blockquote rule, page
 * transitions and the mobile nav all animated regardless of the OS setting.
 *
 * `reducedMotion="user"` drops transform and layout animation for those users
 * while keeping opacity and colour, which is the behaviour WCAG actually wants:
 * the interface still communicates state, it just stops moving.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
