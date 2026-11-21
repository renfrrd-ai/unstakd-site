"use client";

import { motion, MotionConfig, useScroll, useSpring, type HTMLMotionProps, type Variants } from "motion/react";
import type { ReactNode } from "react";

// Scroll-reveal vocabulary for the server-rendered sections: wrap markup, pass plain props only.
// Everything plays once as it enters the viewport and honours "reduce motion" (fades only, no movement).

export const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.2 } as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease }}>
      {children}
    </MotionConfig>
  );
}

const tags = { div: motion.div, section: motion.section, ol: motion.ol, ul: motion.ul, li: motion.li, pre: motion.pre, span: motion.span, h1: motion.h1, p: motion.p } as const;
type Tag = keyof typeof tags;
type Props = { as?: Tag } & HTMLMotionProps<"div">;

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// One block fading up as it scrolls into view (or on load with `now`, for the hero).
export function Reveal({ as = "div", delay = 0, now, ...props }: Props & { delay?: number; now?: boolean }) {
  const C = tags[as] as typeof motion.div;
  const target = now ? { animate: "show" } : { whileInView: "show", viewport };
  // The delay goes inside the variant: a variant's own transition wins over the `transition` prop.
  const variants = { hidden: rise.hidden, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay } } };
  return <C initial="hidden" {...target} variants={variants} {...props} />;
}

// Children (Item) arrive one after another when the group scrolls into view.
export function Stagger({ as = "div", delay = 0, step = 0.08, now, ...props }: Props & { delay?: number; step?: number; now?: boolean }) {
  const C = tags[as] as typeof motion.div;
  const target = now ? { animate: "show" } : { whileInView: "show", viewport };
  return <C initial="hidden" {...target} variants={{ hidden: {}, show: { transition: { staggerChildren: step, delayChildren: delay } } }} {...props} />;
}

export function Item({ as = "div", lift, ...props }: Props & { lift?: boolean }) {
  const C = tags[as] as typeof motion.div;
  return <C variants={rise} whileHover={lift ? { y: -4, transition: { duration: 0.25, ease } } : undefined} {...props} />;
}

// Pops in with its parent Item, e.g. a step number badge.
export function Pop({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.span
      className={className}
      variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 420, damping: 18 } } }}
    >
      {children}
    </motion.span>
  );
}

// A bar that grows to `width` when it scrolls into view.
export function Grow({ width, className, delay = 0 }: { width: string; className?: string; delay?: number }) {
  return (
    <motion.span
      className={className}
      initial={{ width: 0 }}
      whileInView={{ width }}
      viewport={viewport}
      transition={{ duration: 0.9, ease, delay }}
    />
  );
}

// Thin accent line under the nav showing how far down the page you are.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return <motion.div aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent" style={{ scaleX }} />;
}
