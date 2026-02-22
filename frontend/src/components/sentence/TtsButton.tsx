import { Volume2, VolumeX, VolumeOff } from 'lucide-react';
import { useTts } from '@/hooks/useTts';
import { cn } from '@/lib/utils';

interface TtsButtonProps {
  text: string;
  className?: string;
}

export default function TtsButton({ text, className }: TtsButtonProps) {
  const { isPlaying, isSupported, speed, speak, stop, cycleSpeed } = useTts();

  if (!isSupported) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <VolumeOff className="w-4 h-4" />
          <span>이 브라우저에서는 음성을 지원하지 않아요</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button
        onClick={() => (isPlaying ? stop() : speak(text))}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
      >
        {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
      <button
        onClick={cycleSpeed}
        className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
      >
        {speed}x
      </button>
    </div>
  );
}
