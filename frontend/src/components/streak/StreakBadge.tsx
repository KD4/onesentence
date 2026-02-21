import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakBadgeProps {
  currentStreak: number;
  maxStreak: number;
  className?: string;
}

export default function StreakBadge({
  currentStreak,
  maxStreak,
  className,
}: StreakBadgeProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="flex items-center gap-2">
        <Flame className="w-5 h-5 text-orange-500" />
        <div>
          <p className="text-lg font-bold">{currentStreak}일</p>
          <p className="text-xs text-muted-foreground">연속 출석</p>
        </div>
      </div>
      <div className="w-px h-8 bg-border" />
      <div>
        <p className="text-lg font-bold">{maxStreak}일</p>
        <p className="text-xs text-muted-foreground">최장 기록</p>
      </div>
    </div>
  );
}
