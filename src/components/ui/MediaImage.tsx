"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaPlaceholder, type PlaceholderAspect } from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/utils";

export type MediaAspect = PlaceholderAspect;
export type MediaFit = "contain" | "cover";

export interface MediaImageProps {
  src?: string | null;
  alt: string;
  /** Pass `false` to size via `className` (e.g. `min-h-[440px]`, `h-64`) instead of a fixed ratio. */
  aspect?: MediaAspect | false;
  fit?: MediaFit;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
}

const aspectClass: Record<MediaAspect, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  square: "aspect-square",
  "3/4": "aspect-[3/4]",
};

export function MediaImage({
  src,
  alt,
  aspect = "4/3",
  fit = "cover",
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  objectPosition = "object-center",
}: MediaImageProps) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <MediaPlaceholder
        aspect={aspect === false ? "4/3" : aspect}
        label={alt}
        bordered={false}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        aspect !== false && aspectClass[aspect],
        fit === "contain" && "bg-white",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setFailed(true)}
        className={cn(
          fit === "contain" ? "object-contain p-2" : "object-cover",
          objectPosition,
        )}
      />
    </div>
  );
}
