"use client";

import {
  useId,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { cn } from "@/lib/utils";
import {
  ACCEPTED_UPLOAD_ACCEPT,
  MAX_UPLOAD_BYTES,
  isAcceptedUploadFile,
  type FilePayload,
} from "@/types/form";

export interface FileUploadProps {
  label?: string;
  hint?: string;
  browseLabel?: string;
  dragLabel?: string;
  maxSizeLabel?: string;
  typeError?: string;
  sizeError?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  onFilesChange?: (files: FilePayload[], rawFiles: File[]) => void;
  onError?: (message: string | null) => void;
}

function toFilePayload(file: File): FilePayload {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
  };
}

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 13h6M9 17h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FileUpload({
  label = "Upload files",
  hint = "PDF, JPG, or PNG",
  browseLabel = "Browse files",
  dragLabel = "Drop files here",
  maxSizeLabel = "Up to 10 MB per file",
  typeError = "Only PDF, JPG, or PNG.",
  sizeError = "File exceeds 10 MB.",
  multiple = true,
  disabled = false,
  className,
  onFilesChange,
  onError,
}: FileUploadProps) {
  const inputId = useId();
  const [files, setFiles] = useState<FilePayload[]>([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function applyFiles(list: File[]) {
    if (list.length === 0) {
      setFiles([]);
      setError(null);
      onError?.(null);
      onFilesChange?.([], []);
      return;
    }

    for (const file of list) {
      if (!isAcceptedUploadFile(file)) {
        setError(typeError);
        onError?.(typeError);
        return;
      }
      if (file.size > MAX_UPLOAD_BYTES) {
        setError(sizeError);
        onError?.(sizeError);
        return;
      }
    }

    const payloads = list.map(toFilePayload);
    setFiles(payloads);
    setError(null);
    onError?.(null);
    onFilesChange?.(payloads, list);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const list = event.target.files ? Array.from(event.target.files) : [];
    applyFiles(list);
  }

  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    if (!disabled) setDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    if (disabled) return;
    const list = Array.from(event.dataTransfer.files);
    applyFiles(list);
  }

  const hasFiles = files.length > 0;

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <label
        htmlFor={inputId}
        onDragEnter={handleDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex cursor-pointer flex-col items-start gap-2 rounded-md border-2 border-dashed px-5 py-8",
          "bg-white transition-colors",
          dragging
            ? "border-accent bg-[rgba(254,202,22,0.12)]"
            : "border-border hover:border-accent hover:bg-surface/60",
          "focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/40",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <span className="text-sm font-semibold tracking-tight text-foreground">
          {label}
        </span>

        {hasFiles ? (
          <ul className="flex w-full flex-col gap-2">
            {files.map((file) => (
              <li
                key={`${file.name}-${file.lastModified}`}
                className="flex w-full items-center gap-3 rounded-md border border-border bg-surface px-3 py-2.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-heading shadow-sm">
                  <DocumentIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {file.name}
                  </span>
                  <span className="block text-xs text-muted">
                    {formatFileSize(file.size)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <span className="text-sm leading-relaxed text-muted">{hint}</span>
            <span className="text-xs font-medium text-muted">
              {dragging ? dragLabel : maxSizeLabel}
            </span>
          </>
        )}

        <span className="mt-1 inline-flex h-9 items-center rounded-md border border-border bg-surface px-3 text-xs font-bold uppercase tracking-wide text-foreground">
          {browseLabel}
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

      <div className="relative min-h-[1.25rem]">
        {error ? (
          <p className="absolute inset-x-0 top-0 text-xs text-red-600">{error}</p>
        ) : null}
      </div>
    </div>
  );
}
