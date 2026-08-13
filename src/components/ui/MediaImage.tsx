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
  aspect?: MediaAspect;
  fit?: MediaFit;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

const aspectClass: Record<MediaAspect, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
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
}: MediaImageProps) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <MediaPlaceholder
        aspect={aspect}
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
        aspectClass[aspect],
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
          fit === "contain" ? "object-contain object-center p-3" : "object-cover object-center",
        )}
      />
    </div>
  );
}
