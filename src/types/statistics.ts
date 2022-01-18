export interface Guesses {
  [key: number]: number;
}

export interface StatisticsState {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guesses: Guesses;
}
