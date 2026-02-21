import { useMemo, useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCalendarProps {
  attendanceDates: string[];
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function StreakCalendar({ attendanceDates }: StreakCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const startDayOfWeek = getDay(days[0]);
  const attendanceSet = useMemo(() => new Set(attendanceDates), [attendanceDates]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
          className="p-1 hover:bg-muted rounded-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-semibold">
          {format(currentMonth, 'yyyy년 M월', { locale: ko })}
        </h3>
        <button
          onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
          className="p-1 hover:bg-muted rounded-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center text-xs text-muted-foreground">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const attended = attendanceSet.has(dateStr);
          const isToday = dateStr === format(new Date(), 'yyyy-MM-dd');

          return (
            <div
              key={dateStr}
              className={cn(
                'aspect-square flex items-center justify-center text-sm rounded-lg',
                attended && 'bg-primary text-primary-foreground font-medium',
                isToday && !attended && 'ring-2 ring-primary/30',
              )}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
}
