import { useState } from 'react';

// Избранные матчи (по id). Хранятся только в памяти, пока открыто приложение.
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // includes вместо indexOf: indexOf возвращает -1 для отсутствующего id,
  // а Boolean(-1) — это true (из-за этого горели все звёзды).
  const isFavorite = (id: string) => favorites.includes(id);

  // Новый массив в setState: React перерисовывает компонент только тогда,
  // когда ссылка на состояние меняется.
  const toggle = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return { favorites, isFavorite, toggle };
}
