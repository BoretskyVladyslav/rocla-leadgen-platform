import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PlaceholderAspect = "16/9" | "4/3" | "4/5" | "1/1" | "square" | "3/4";

export interface MediaPlaceholderProps {
  label?: string;
  sizeHint?: string;
  aspect?: PlaceholderAspect;
  className?: string;
  bordered?: boolean;
  icon?: ReactNode;
}

const aspectClass: Record<PlaceholderAspect, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  square: "aspect-square",
  "3/4": "aspect-[3/4]",
};

function FrameIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <rect
        x="8"
        y="10"
        width="32"
        height="28"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 30l8-8 6 6 6-8 12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="18" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function MediaPlaceholder({
  label = "Product Photo Placeholder",
  sizeHint,
  aspect = "4/3",
  className,
  bordered = true,
  icon,
}: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-br from-surface-muted to-surface",
        aspectClass[aspect],
        bordered && "border border-border",
        className,
      )}
      role="img"
      aria-label={[label, sizeHint].filter(Boolean).join(" · ")}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-white text-muted shadow-sm">
          {icon ?? <FrameIcon className="h-7 w-7" />}
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <span className="badge-status-outline max-w-full truncate">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
