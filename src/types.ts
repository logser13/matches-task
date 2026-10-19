// Типы данных матчей: ответ сервера (data/matches.json) и элементы списка.

export type Team = {
  id: string;
  name: string;
  city: string;
};

export type MatchScore = {
  home: number;
  away: number;
};

export type Match = {
  id: string;
  // Может быть null: например, у перенесённого матча дата ещё не назначена.
  startsAt: string | null;
  // scheduled | live | finished | postponed; оставляем строкой, чтобы новые
  // статусы сервера не ломали типы, а отображались как есть.
  status: string;
  // Идёт только у live-матчей.
  minute?: number;
  home: Team;
  away: Team;
  // null, если матч ещё не начался (или не состоялся).
  score: MatchScore | null;
};

export type MatchesResponse = {
  round: number;
  matches: Match[];
};
