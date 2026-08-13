"use client";

import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type MouseEvent,
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
  removeLabel?: string;
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
  removeLabel = "Remove file",
  typeError = "Only PDF, JPG, or PNG.",
  sizeError = "File exceeds 10 MB.",
  multiple = true,
  disabled = false,
  className,
  onFilesChange,
  onError,
}: FileUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FilePayload[]>([]);
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function commitFiles(list: File[]) {
    const payloads = list.map(toFilePayload);
    setRawFiles(list);
    setFiles(payloads);
    setError(null);
    onError?.(null);
    onFilesChange?.(payloads, list);
  }

  function applyFiles(list: File[]) {
    if (list.length === 0) {
      commitFiles([]);
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

    commitFiles(list);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const list = event.target.files ? Array.from(event.target.files) : [];
    applyFiles(list);
    // Allow re-selecting the same file after remove
    event.target.value = "";
  }

  function removeFile(index: number, event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const nextRaw = rawFiles.filter((_, i) => i !== index);
    commitFiles(nextRaw);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (!disabled) setDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    if (disabled) return;
    const list = Array.from(event.dataTransfer.files);
    applyFiles(list);
  }

  const hasFiles = files.length > 0;

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <div
        onDragEnter={handleDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "grid gap-4 rounded-md border-2 border-dashed px-4 py-5 sm:grid-cols-2 sm:px-5 sm:py-6",
          "bg-white transition-colors",
          dragging
            ? "border-accent bg-[rgba(254,202,22,0.12)]"
            : "border-border hover:border-accent/80",
          "focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/40",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <div className="flex flex-col items-start gap-2">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {label}
          </span>
          <span className="text-sm leading-relaxed text-muted">
            {hint}
            {maxSizeLabel ? (
              <>
                {" "}
                <span className="whitespace-nowrap">({maxSizeLabel})</span>
              </>
            ) : null}
          </span>
          <span className="text-xs font-medium text-muted">
            {dragging ? dragLabel : null}
          </span>
          <label
            htmlFor={inputId}
            className="mt-1 inline-flex h-9 cursor-pointer items-center rounded-md border border-border bg-surface px-3 text-xs font-bold uppercase tracking-wide text-foreground transition-colors hover:border-accent"
          >
            {browseLabel}
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            className="sr-only"
            accept={ACCEPTED_UPLOAD_ACCEPT}
            multiple={multiple}
            disabled={disabled}
            onChange={handleChange}
          />
        </div>

        <div
          className={cn(
            "flex min-h-[5.5rem] flex-col gap-2 overflow-y-auto rounded-md border border-dashed border-border/80 bg-surface/40 p-2",
            !hasFiles && "items-center justify-center",
          )}
        >
          {hasFiles ? (
            <ul className="flex flex-col gap-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${file.lastModified}-${index}`}
                  className="flex items-center gap-2 rounded-md border border-border bg-white px-2.5 py-2 shadow-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-heading">
                    <DocumentIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs font-semibold text-foreground">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-muted transition-colors hover:bg-surface hover:text-heading"
                    aria-label={`${removeLabel}: ${file.name}`}
                    onClick={(event) => removeFile(index, event)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <span className="px-2 text-center text-xs text-muted">
              {dragLabel}
            </span>
          )}
        </div>
      </div>

      <div className="relative min-h-[1.25rem]">
        {error ? (
          <p className="absolute inset-x-0 top-0 text-xs text-red-600">{error}</p>
        ) : null}
      </div>
    </div>
  );
}
