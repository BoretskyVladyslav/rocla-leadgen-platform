"use client";

import { motion } from "framer-motion";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const motionHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring" as const, stiffness: 420, damping: 24 },
};

function splitHref(href: string): { path: string; hash: string } {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return { path: href, hash: "" };
  return {
    path: href.slice(0, hashIndex) || "/",
    hash: href.slice(hashIndex + 1),
  };
}

export function MotionLink({
  className,
  children,
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { children: ReactNode }) {
  const pathname = usePathname();
  const hrefString = typeof href === "string" ? href : "";
  const { path, hash } = splitHref(hrefString);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || !hash) return;

    const currentPath = pathname.replace(/\/$/, "") || "/";
    const targetPath = path.replace(/\/$/, "") || "/";
    if (currentPath !== targetPath) return;

    event.preventDefault();
    const el = document.getElementById(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${hash}`,
    );
  }

  return (
    <motion.div className="inline-flex" {...motionHover}>
      <Link
        href={href}
        scroll={!hash}
        className={cn(
          "relative cta-glow cta-shine shadow-sm transition-shadow",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
}
