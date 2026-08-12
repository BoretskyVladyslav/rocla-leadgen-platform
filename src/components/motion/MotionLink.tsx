"use client";

import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const motionHover = {
  whileHover: { scale: 1.03, y: -1 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 420, damping: 24 },
};

export function MotionLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { children: ReactNode }) {
  return (
    <motion.div className="inline-flex" {...motionHover}>
      <Link className={cn("shadow-sm transition-shadow hover:shadow-md", className)} {...props}>
        {children}
      </Link>
    </motion.div>
  );
}
