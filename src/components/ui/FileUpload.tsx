"use client";

import { useId, useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import {
  ACCEPTED_UPLOAD_ACCEPT,
  type FilePayload,
} from "@/types/form";

export interface FileUploadProps {
  label?: string;
  hint?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  onFilesChange?: (files: FilePayload[], rawFiles: File[]) => void;
}

function toFilePayload(file: File): FilePayload {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
  };
}

export function FileUpload({
  label = "Upload files",
  hint = "PDF, JPG, or PNG",
  multiple = true,
  disabled = false,
  className,
  onFilesChange,
}: FileUploadProps) {
  const inputId = useId();
  const [files, setFiles] = useState<FilePayload[]>([]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const list = event.target.files ? Array.from(event.target.files) : [];
    const payloads = list.map(toFilePayload);
    setFiles(payloads);
    onFilesChange?.(payloads, list);
  }

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <label
        htmlFor={inputId}
        className={cn(
          "flex cursor-pointer flex-col items-start gap-2 rounded-md border-2 border-dashed border-border bg-white px-5 py-8",
          "transition-colors hover:border-foreground/35 hover:bg-surface/60",
          "focus-within:border-foreground/40 focus-within:ring-2 focus-within:ring-foreground/15",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <span className="text-sm font-semibold tracking-tight text-foreground">
          {label}
        </span>
        <span className="text-sm leading-relaxed text-muted">{hint}</span>
        <span className="mt-1 inline-flex h-9 items-center rounded-md border border-border bg-surface px-3 text-xs font-medium text-foreground">
          Browse files
        </span>
        <input
          id={inputId}
          type="file"
          className="sr-only"
          accept={ACCEPTED_UPLOAD_ACCEPT}
          multiple={multiple}
          disabled={disabled}
          onChange={handleChange}
        />
      </label>

      {files.length > 0 ? (
        <ul className="space-y-1.5 rounded-md border border-border bg-white px-3 py-2 text-xs text-muted">
          {files.map((file) => (
            <li key={`${file.name}-${file.lastModified}`}>
              {file.name} ({Math.round(file.size / 1024)} KB)
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
