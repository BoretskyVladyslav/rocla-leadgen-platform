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
          "flex cursor-pointer flex-col items-start gap-1 rounded-md border border-dashed border-border bg-surface px-4 py-5",
          "hover:border-foreground/30",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted">{hint}</span>
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
        <ul className="space-y-1 text-xs text-muted">
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
