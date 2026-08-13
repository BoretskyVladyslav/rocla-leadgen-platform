import Image from "next/image";
import { cn } from "@/lib/utils";

export type MediaAspect = "16/9" | "4/3" | "1/1" | "square" | "3/4";
export type MediaFit = "contain" | "cover";

export interface MediaImageProps {
  src: string;
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
        className={cn(
          fit === "contain" ? "object-contain object-center p-3" : "object-cover object-center",
        )}
      />
    </div>
  );
}
