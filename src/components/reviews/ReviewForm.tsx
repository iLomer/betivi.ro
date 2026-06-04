"use client";

import { useRef, useState, useTransition } from "react";
import { Star } from "lucide-react";
import { submitReviewAction, deleteReviewAction } from "@/lib/reviews/actions";
import type { Review } from "@/types/database";

interface ReviewFormProps {
  venueId: string;
  existingReview: Review | null;
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`${star} ${star === 1 ? "stea" : "stele"}`}
          className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <Star
            className={`h-7 w-7 transition-colors ${
              star <= display
                ? "fill-brand-400 text-brand-400"
                : "fill-surface-700 text-surface-700"
            }`}
            aria-hidden="true"
          />
        </button>
      ))}
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
        setError(err instanceof Error ? err.message : "Eroare necunoscută.");
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
        setError(err instanceof Error ? err.message : "Eroare necunoscută.");
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="venue_id" value={venueId} />

      <div>
        <label className="mb-2 block text-sm font-medium text-surface-300">Rating</label>
        <StarPicker value={rating} onChange={setRating} />
      </div>

      <div>
        <label htmlFor="body" className="mb-1 block text-sm font-medium text-surface-300">
          Recenzia ta <span className="text-surface-500">(opțional)</span>
        </label>
        <textarea
          id="body"
          name="body"
          rows={3}
          defaultValue={existingReview?.body ?? ""}
          placeholder="Spune-ne ce ai băut și cum a fost..."
          className="w-full rounded-lg border border-surface-600 bg-surface-800 px-3 py-2 text-sm text-surface-100 placeholder:text-surface-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {success && <p className="text-sm text-green-400">Recenzia a fost salvată!</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending || isDeleting}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-bold text-surface-900 transition-colors hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Se salvează..." : existingReview ? "Actualizează" : "Trimite recenzia"}
        </button>

        {existingReview && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending || isDeleting}
            className="rounded-lg border border-red-800/60 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-950/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Se șterge..." : "Șterge"}
          </button>
        )}
      </div>
    </form>
  );
}
