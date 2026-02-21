import { useMemo } from 'react';
import { useGuestStore } from '@/stores/guestStore';

export function useStreak() {
  const { attendanceDates, currentStreak, maxStreak, checkIn, isCheckedInToday } =
    useGuestStore();

  const checkedInToday = useMemo(() => isCheckedInToday(), [attendanceDates]);

  return {
    attendanceDates,
    currentStreak,
    maxStreak,
    checkedInToday,
    checkIn,
  };
}
