export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string; // The main display image
  elo_rating: number;
  active: boolean;
  genero: 'masculino' | 'femenino';
  wins?: number;
  losses?: number;
  matches?: number;
  career?: string; // e.g. "Diseño Multimedia"
  image_url?: string; // Fallback or secondary image
}

export interface Vote {
  id?: string;
  winner_id: string;
  loser_id: string;
  created_at?: string;
}

export interface MatchPair {
  left: Profile;
  right: Profile;
}