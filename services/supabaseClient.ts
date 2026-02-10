import { createClient } from '@supabase/supabase-js';
import { Profile } from '../types';

// NOTE: In a real app, these come from import.meta.env
// Safely access env to prevent crash if import.meta.env is undefined
const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseKey = env.VITE_SUPABASE_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// --- ELO Logic ---
const K_FACTOR = 32;

export const calculateElo = (winnerElo: number, loserElo: number) => {
  const expectedScoreWinner = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
  const expectedScoreLoser = 1 / (1 + Math.pow(10, (winnerElo - loserElo) / 400));

  const newWinnerElo = Math.round(winnerElo + K_FACTOR * (1 - expectedScoreWinner));
  const newLoserElo = Math.round(loserElo + K_FACTOR * (0 - expectedScoreLoser));

  return { newWinnerElo, newLoserElo };
};

// --- Data Services ---

// Fetch 2 random profiles filtered by gender
export const fetchRandomPair = async (gender: 'masculino' | 'femenino'): Promise<[Profile, Profile] | null> => {
  try {
    // Get all active IDs for specific gender
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('active', true)
      .eq('genero', gender)
      .limit(50); 

    if (error) throw error;
    if (!data || data.length < 2) return null;

    // Shuffle
    const shuffled = data.sort(() => 0.5 - Math.random());
    return [shuffled[0], shuffled[1]];
  } catch (error) {
    console.error("Error fetching pair:", error);
    // Return mock data if DB fails so UI can be reviewed
    return getMockPair(gender);
  }
};

export const fetchTopProfiles = async (gender: 'masculino' | 'femenino'): Promise<Profile[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('active', true)
      .eq('genero', gender)
      .order('elo_rating', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching ranking:", error);
    return getMockProfiles()
      .filter(p => p.genero === gender)
      .sort((a, b) => b.elo_rating - a.elo_rating)
      .slice(0, 10);
  }
};

export const recordVote = async (winner: Profile, loser: Profile) => {
  try {
    const { newWinnerElo, newLoserElo } = calculateElo(winner.elo_rating, loser.elo_rating);

    // Update Winner
    await supabase.from('profiles').update({ elo_rating: newWinnerElo }).eq('id', winner.id);
    // Update Loser
    await supabase.from('profiles').update({ elo_rating: newLoserElo }).eq('id', loser.id);
    // Record Vote
    await supabase.from('votes').insert([{ winner_id: winner.id, loser_id: loser.id }]);

    return { newWinnerElo, newLoserElo };
  } catch (error) {
    console.error("Error recording vote:", error);
    return null;
  }
};

// --- Mock Data Fallback (For Visual Demo) ---
const getMockPair = (gender: 'masculino' | 'femenino'): [Profile, Profile] | null => {
  const p = getMockProfiles().filter(p => p.genero === gender);
  if (p.length < 2) return null;
  // Simple shuffle for mock
  const shuffled = p.sort(() => 0.5 - Math.random());
  return [shuffled[0], shuffled[1]];
}

const getMockProfiles = (): Profile[] => [
  {
    id: '1',
    username: 'viper_elena',
    full_name: 'Elena "Viper" K.',
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrx8b72dpQ1enfNbhtmzRCkz_Ffrivt1NUs8zNY25_Ugk3ikkWPmr_9gzhaLjpursWZS1GDFVH7g41VK0Bowf8N-k0o2PPyrWooh0gLtwpvxbpfdtjrJEhr0VhIHwJpQw2N-H3FuKSZqnf-YCTTZcq4DsW4pGtY3p1ztQMqioR87CiZ1cy-jvizYUXpmlQsiJ30ujj-CgO281OeGsHXZuwX33w0-rOjHCU216ntIK693vCNIerNiqQQHkBkjdkvFoGehk7Avwsn40',
    elo_rating: 2842,
    active: true,
    genero: 'femenino',
    career: "Arquitectura"
  },
  {
    id: '2',
    username: 'mchen_design',
    full_name: 'Marcus Chen',
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5LCxU51kusrwtM27dsZS_OZu90wGiWsl8eaKSGwltxx5KBWczkBM_YN1raULQdppdMcwzVbjjPbztha6CFO-mC1WZT86gJ_07ha0r6AQZzdrbog-6xGvaz0IRjqMOB6oCsln5BQ31tHLAfOEIwHYYj5S0Y4fSUeM2qoib6oGCTtUtpXs0AVGGiY8NS1SeQEUfLqDqtE3rJ3tu443GqAOFJZ_BYfbaEXvdjqzbMYszm_4fBUMK4BXFE0zrJB1m_p0JAGns5ODfwFk',
    elo_rating: 2750,
    active: true,
    genero: 'masculino',
    career: "Diseño Gráfico"
  },
  {
    id: '3',
    username: 'sara_j',
    full_name: 'Sarah Jenkins',
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALMgSlDsQQLit4jOIYdczGX2_s__KVJNjswzz7iPSKqMbMZQunpZPat-emaiMVyHBwxtr_h-SFRSSLkSoj3gkGR5p3Pp7IU4Rq1rECLVaI5T5uKElgabDKC5kEKp1vV6Xqfx3BRgMz7C8k-mXmvlmCT03UXpdLEfkEeR3M9uCPNy4_gAGw78UFk6fEllfqTOjGRw_U8HrOgVMGsMLz5HvgzZvxZV22AG5oBQodDoIxxOv07ocwYAyiXTGPmWRM5Sr9enqPQzUwtPg',
    elo_rating: 2695,
    active: true,
    genero: 'femenino',
    career: "Marketing"
  },
  {
    id: '4',
    username: 'david_ross',
    full_name: 'David Ross',
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdlRfee9TTqfqxSbJEyhHpY1AMhYihcWVtL-FgNRv-09dgdFdifihR8WojHA6RTo40WlWzIXSycgeGUmVgdP6eDMQWBB7lfjN-lPSWbMc1PgcxFRRFK4Ehrlvumeg1QpU2-QM3cYujmm4qfv5e_VMPbMjejw4fNS2Fz8KL0b-EidFXG6G7e-lngZnfaUxFq79vO03d6n3BJDJEXQAseHVcxIsqmMVQgDo7v7MUxwo4JPsFLQmdtmOaE3BbOA7lcZ5KVxpMsZZbCuo',
    elo_rating: 2540,
    active: true,
    genero: 'masculino',
    career: "Ingeniería"
  },
  {
    id: '5',
    username: 'barnaby_dog',
    full_name: 'Barnaby',
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlqqCXaNOS-Rq0ssNs_z4PkfQ-p8cp0mZAUlC-3Ss9m9AqlOTaD49gcc0F_71u6d8QcYRLQuVWRbgkMLPhL9B2gdOvkFUEkBm_9OYo8IxpA0UjlnzJRJDG1AkylD9wzEuRNnJx9ej6i7tZmRDyS3IzVy0u-ezdZD0pkk6mkGQaSx61mlfyemUr_xMngd-jXTVpH-rVVU2jjjsxb8gg6Ub_43tGSyfuj4OiZLln-RmQvFkuZThVY4NxhK_Mqo3y4cOYMWlbvaW_p6Q',
    elo_rating: 1450,
    active: true,
    genero: 'masculino',
    career: "Mascota"
  },
  {
    id: '6',
    username: 'lady_whiskers',
    full_name: 'Lady Whiskers',
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArSGv35g7Vf-7ttsY1uvspiyViCeQgJrUqvU6P_44T_dp9pCV1vgEoNTzYeOdKLwwYvvczaNJrPg697hmAW4RP8KWj5INz8jtmqF8tOEwCJtN0Ig3io7_NZBifPEq8EG9aMvn4ZhTPT4O-p6aXrGpisuY1HPBKf-vbgA50Q1hPBgrd4jWIfgP-ohvxVunD_hDr5f3Ll0aFwEh4GhtxVV7cLn_WXKNYZhMdAV0aC6g15bilnN6AXoeXTHi3oDoSsqxI0Cs717rXT-I',
    elo_rating: 1392,
    active: true,
    genero: 'femenino',
    career: "Mascota"
  }
];