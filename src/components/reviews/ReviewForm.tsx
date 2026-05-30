"use client";

import { useRef, useState, useTransition } from "react";
import { submitReviewAction, deleteReviewAction } from "@/lib/reviews/actions";
import type { Review } from "@/types/database";

interface ReviewFormProps {
  venueId: string;
  existingReview: Review | null;
}

interface StarPickerProps {
  value: number;
  onChange: (value: number) => void;
}

function StarPicker({ value, onChange }: StarPickerProps) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Rating">
      {Array.from({ length: 5 }, (_, i) => {
        const star = i + 1;
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`${star} ${star === 1 ? "stea" : "stele"}`}
            className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-7 w-7 transition-colors ${
                star <= display
                  ? "text-brand-400"
                  : "text-surface-300 dark:text-surface-600"
              }`}
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export function ReviewForm({ venueId, existingReview }: ReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (rating === 0) {
      setError("Selectează cel puțin o stea.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.set("rating", String(rating));

    startTransition(async () => {
      try {
        await submitReviewAction(formData);
        setSuccess(true);
        if (!existingReview) {
          formRef.current?.reset();
          setRating(0);
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Eroare necunoscută.";
        setError(message);
      }
    });
  }

  function handleDelete() {
    if (!existingReview) return;
    setError(null);
    setSuccess(false);

    startDeleteTransition(async () => {
      try {
        await deleteReviewAction(existingReview.id, venueId);
        setRating(0);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Eroare necunoscută.";
        setError(message);
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="venue_id" value={venueId} />

      <div>
        <label className="mb-1 block text-sm font-medium text-surface-700 dark:text-surface-300">
          Rating
        </label>
        <StarPicker value={rating} onChange={setRating} />
      </div>

      <div>
        <label
          htmlFor="body"
          className="mb-1 block text-sm font-medium text-surface-700 dark:text-surface-300"
        >
          Recenzia ta <span className="text-surface-400">(opțional)</span>
        </label>
        <textarea
          id="body"
          name="body"
          rows={3}
          defaultValue={existingReview?.body ?? ""}
          placeholder="Spune-ne ce ai băut și cum a fost..."
          className="w-full rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-50"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {success && (
        <p className="text-sm text-green-600 dark:text-green-400">
          Recenzia a fost salvată cu succes!
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending || isDeleting}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? "Se salvează..."
            : existingReview
              ? "Actualizează recenzia"
              : "Trimite recenzia"}
        </button>

        {existingReview && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending || isDeleting}
            className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
          >
            {isDeleting ? "Se șterge..." : "Șterge recenzia"}
          </button>
        )}
      </div>
    </form>
  );
}
