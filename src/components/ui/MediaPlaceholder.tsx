import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PlaceholderAspect = "16/9" | "4/3" | "1/1" | "square";

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
  "1/1": "aspect-square",
  square: "aspect-square",
};

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <rect
        x="6"
        y="14"
        width="36"
        height="26"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 14 19.5 8h9L32 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="27" r="7" stroke="currentColor" strokeWidth="2" />
      <circle cx="36" cy="20" r="1.5" fill="currentColor" />
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
        "relative w-full overflow-hidden bg-surface",
        aspectClass[aspect],
        bordered && "border border-border",
        className,
      )}
      role="img"
      aria-label={[label, sizeHint].filter(Boolean).join(" · ")}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #f5f5f5 25%, #ebebeb 25%, #ebebeb 50%, #f5f5f5 50%, #f5f5f5 75%, #ebebeb 75%)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(245,245,245,0.2)_100%)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-accent bg-white text-accent-fg shadow-sm">
          {icon ?? <CameraIcon className="h-7 w-7" />}
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
