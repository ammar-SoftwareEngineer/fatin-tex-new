import type { Transition, Variants } from "framer-motion";

/** Soft ease-out — no hard start/stop */
export const easeSmooth = [0.22, 1, 0.36, 1] as const;

export const transitionBase: Transition = {
  duration: 0.75,
  ease: easeSmooth,
};

export const transitionFast: Transition = {
  duration: 0.45,
  ease: easeSmooth,
};

export const transitionSlow: Transition = {
  duration: 1,
  ease: easeSmooth,
};

export const transitionHover: Transition = {
  duration: 0.35,
  ease: easeSmooth,
};

export const viewportOnce = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -40px 0px",
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: transitionBase },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transitionBase },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: transitionBase },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: transitionBase },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: transitionBase },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: transitionBase },
};

export const cardHover = {
  y: -6,
  transition: transitionHover,
} as const;

export const imageHoverClass =
  "object-cover transition-transform duration-700 ease-out group-hover:scale-105";

export function staggerDelay(index: number, step = 0.08): number {
  return Math.min(index * step, 0.4);
}
