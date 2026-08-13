"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/components/motion/variants";

const viewport = { once: true, amount: 0.15 } as const;

export interface StaggerRevealProps extends HTMLMotionProps<"ul"> {
  children: ReactNode;
  className?: string;
  as?: "ul" | "div";
}

export function StaggerReveal({
  children,
  className,
  as = "ul",
  ...props
}: StaggerRevealProps) {
  const shared = {
    className: cn("will-change-transform", className),
    variants: staggerContainer,
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport,
    ...props,
  };

  if (as === "div") {
    return (
      <motion.div
        className={shared.className}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {children}
      </motion.div>
    );
  }

  return <motion.ul {...shared}>{children}</motion.ul>;
}

export interface StaggerItemProps extends HTMLMotionProps<"li"> {
  children: ReactNode;
  className?: string;
  as?: "li" | "div";
}

export function StaggerItem({
  children,
  className,
  as = "li",
  ...props
}: StaggerItemProps) {
  if (as === "div") {
    return (
      <motion.div
        className={cn("will-change-transform", className)}
        variants={staggerItem}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.li
      className={cn("will-change-transform", className)}
      variants={staggerItem}
      {...props}
    >
      {children}
    </motion.li>
  );
}
