import { Match, MatchScore } from '../types';

// Подписи статусов по-русски. Неизвестный статус показываем как есть,
// чтобы ничего не терялось молча.
const STATUS_LABELS: Record<string, string> = {
  scheduled: 'Запланирован',
  live: 'Идёт',
  finished: 'Завершён',
  postponed: 'Отложен',
};

export function statusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

// Завершённым считаем только status === 'finished'. Всё остальное
// (scheduled, live, postponed и будущие статусы) — незавершённое:
// так live- и postponed-матчи не теряются между фильтрами.
export function isFinished(match: Match): boolean {
  return match.status === 'finished';
}

export function isLive(match: Match): boolean {
  return match.status === 'live';
}

// Даты приходят в UTC (…Z); toLocaleString переводит их в часовой пояс
// устройства. Пустая или некорректная дата — «Дата уточняется».
export function formatKickoff(startsAt: string | null): string {
  if (!startsAt) return 'Дата уточняется';
  const date = new Date(startsAt);
  if (Number.isNaN(date.getTime())) return 'Дата уточняется';
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// score === null — счёта ещё нет. Проверяем именно на null, а не на
// «пустоту»: 0:0 — валидный счёт, который нельзя затирать прочерком.
export function formatScore(score: MatchScore | null): string {
  if (!score) return '—';
  return `${score.home} : ${score.away}`;
}

// Хронологический порядок; матчи без даты (перенесённые) — в конце.
export function sortMatches(matches: Match[]): Match[] {
  const time = (match: Match): number => {
    if (!match.startsAt) return Number.POSITIVE_INFINITY;
    const value = new Date(match.startsAt).getTime();
    return Number.isNaN(value) ? Number.POSITIVE_INFINITY : value;
  };
  return [...matches].sort((a, b) => time(a) - time(b));
}
