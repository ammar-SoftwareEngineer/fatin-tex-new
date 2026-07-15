import type { Transition, Variants } from "framer-motion";

export const transitionBase: Transition = {
  duration: 0.75,
  ease: [0.25, 0.1, 0.25, 1],
};

export const transitionFast: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: transitionBase },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transitionBase },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: transitionBase },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: transitionBase },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: transitionBase },
};

export const cardHover = {
  y: -10,
} as const;

export const imageHoverClass =
  "object-cover transition-transform duration-700 group-hover:scale-110";

export function staggerDelay(index: number, step = 0.1): number {
  return index * step;
}
