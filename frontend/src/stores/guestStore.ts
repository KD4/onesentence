import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GuestState, Level } from '@/types';
import { format, differenceInCalendarDays, parseISO } from 'date-fns';

function generateGuestId() {
  return 'guest_' + Math.random().toString(36).substring(2, 15);
}

function calcStreak(dates: string[]): { current: number; max: number } {
  if (dates.length === 0) return { current: 0, max: 0 };

  const sorted = [...dates].sort().reverse();

  let current = 0;
  let max = 0;
  let streak = 1;

  // Check if attended today or yesterday for current streak
  const latestDiff = differenceInCalendarDays(new Date(), parseISO(sorted[0]));
  if (latestDiff > 1) {
    current = 0;
  } else {
    current = 1;
    for (let i = 1; i < sorted.length; i++) {
      const diff = differenceInCalendarDays(
        parseISO(sorted[i - 1]),
        parseISO(sorted[i]),
      );
      if (diff === 1) {
        current++;
      } else {
        break;
      }
    }
  }

  // Calculate max streak
  streak = 1;
  const asc = [...dates].sort();
  for (let i = 1; i < asc.length; i++) {
    const diff = differenceInCalendarDays(parseISO(asc[i]), parseISO(asc[i - 1]));
    if (diff === 1) {
      streak++;
    } else {
      max = Math.max(max, streak);
      streak = 1;
    }
  }
  max = Math.max(max, streak);

  return { current, max };
}

interface GuestActions {
  setLevel: (level: Level, score: number) => void;
  toggleBookmark: (sentenceId: number) => void;
  isBookmarked: (sentenceId: number) => boolean;
  checkIn: () => boolean;
  isCheckedInToday: () => boolean;
  reset: () => void;
}

const initialState: GuestState = {
  guestId: generateGuestId(),
  level: null,
  levelScore: 0,
  bookmarkedSentenceIds: [],
  attendanceDates: [],
  currentStreak: 0,
  maxStreak: 0,
};

export const useGuestStore = create<GuestState & GuestActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setLevel: (level: Level, score: number) => {
        set({ level, levelScore: score });
      },

      toggleBookmark: (sentenceId: number) => {
        const { bookmarkedSentenceIds } = get();
        const exists = bookmarkedSentenceIds.includes(sentenceId);
        set({
          bookmarkedSentenceIds: exists
            ? bookmarkedSentenceIds.filter((id) => id !== sentenceId)
            : [...bookmarkedSentenceIds, sentenceId],
        });
      },

      isBookmarked: (sentenceId: number) => {
        return get().bookmarkedSentenceIds.includes(sentenceId);
      },

      checkIn: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const { attendanceDates } = get();
        if (attendanceDates.includes(today)) return false;

        const newDates = [...attendanceDates, today];
        const { current, max } = calcStreak(newDates);
        set({
          attendanceDates: newDates,
          currentStreak: current,
          maxStreak: max,
        });
        return true;
      },

      isCheckedInToday: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        return get().attendanceDates.includes(today);
      },

      reset: () => {
        set({ ...initialState, guestId: generateGuestId() });
      },
    }),
    {
      name: 'onesentence-guest',
    },
  ),
);
