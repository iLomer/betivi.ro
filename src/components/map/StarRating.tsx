import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  max?: number;
}

export function StarRating({ value, max = 5 }: StarRatingProps) {
  const filled = Math.round(value);

  return (
    <span className="flex items-center gap-0.5" aria-label={`${value} din ${max} stele`}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`h-3.5 w-3.5 ${
            i < filled
              ? "fill-brand-400 text-brand-400"
              : "fill-surface-700 text-surface-700"
          }`}
        />
      ))}
    </span>
  );
}
