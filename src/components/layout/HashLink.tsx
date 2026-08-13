"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { cn } from "@/lib/utils";

function splitHref(href: string): { path: string; hash: string } {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return { path: href, hash: "" };
  return {
    path: href.slice(0, hashIndex) || "/",
    hash: href.slice(hashIndex + 1),
  };
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${id}`);
  return true;
}

export type HashLinkProps = ComponentProps<typeof Link>;

export function HashLink({
  href,
  className,
  onClick,
  children,
  ...props
}: HashLinkProps) {
  const pathname = usePathname();
  const hrefString = typeof href === "string" ? href : "";
  const { path, hash } = splitHref(hrefString);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || !hash) return;

    const currentPath = pathname.replace(/\/$/, "") || "/";
    const targetPath = path.replace(/\/$/, "") || "/";
    const samePage = currentPath === targetPath;

    if (samePage) {
      event.preventDefault();
      scrollToId(hash);
    }
  }

  return (
    <Link
      href={href}
      scroll={!hash}
      className={cn(className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}
