import { cn } from '@/lib/utils';

interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          {current + 1} / {total}
        </span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full bg-primary rounded-full transition-all duration-300')}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
