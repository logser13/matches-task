import { StyleSheet, Text, View } from 'react-native';
import { FavoriteButton } from './FavoriteButton';
import { Match } from '../types';
import { formatKickoff, formatScore, isLive, statusLabel } from '../utils/matches';

type Props = {
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

// Карточка одного матча: команды, счёт, дата начала и статус.
export function MatchCard({ match, isFavorite, onToggleFavorite }: Props) {
  const live = isLive(match);
  const minute = live && match.minute ? ` · ${match.minute}′` : '';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.status, live && styles.statusLive]}>
          {statusLabel(match.status)}
          {minute}
        </Text>
        <FavoriteButton active={isFavorite} onPress={onToggleFavorite} />
      </View>

      <Text style={styles.teams}>
        {match.home.name} — {match.away.name}
      </Text>
      <Text style={styles.cities}>
        {match.home.city} / {match.away.city}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.score}>{formatScore(match.score)}</Text>
        <Text style={styles.date}>{formatKickoff(match.startsAt)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#fff',
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  statusLive: {
    color: '#ef3124',
    fontWeight: '700',
  },
  teams: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
  },
  cities: {
    fontSize: 12,
    color: '#9ca3af',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  score: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  date: {
    fontSize: 13,
    color: '#374151',
  },
});
