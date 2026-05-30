export type DrinkCategory = "beer" | "wine" | "spirit";

export interface DrinkLog {
  id: string;
  user_id: string;
  name: string;
  category: DrinkCategory;
  producer: string | null;
  venue_id: string | null;
  rating: number | null;
  notes: string | null;
  logged_at: string;
  created_at: string;
}

export interface DrinkStats {
  total: number;
  beer: number;
  wine: number;
  spirit: number;
}

export type VenueCategory =
  | "bar"
  | "berarie"
  | "crama"
  | "terasa"
  | "club"
  | "restaurant";

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  address: string | null;
  description: string | null;
  category: VenueCategory | null;
  lat: number | null;
  lng: number | null;
  rating_avg: number;
  review_count: number;
  created_by: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  venue_id: string;
  user_id: string;
  rating: number;
  body: string | null;
  created_at: string;
}

export type ProducerCategory = "brewery" | "winery" | "distillery";

export interface Producer {
  id: string;
  name: string;
  category: ProducerCategory;
  region: string;
  description: string | null;
  website: string | null;
  created_at: string;
}
