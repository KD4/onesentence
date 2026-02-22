import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGuestStore } from '@/stores/guestStore';
import type { Level } from '@/types';
import { cn } from '@/lib/utils';

const LEVEL_OPTIONS: {
  level: Level;
  emoji: string;
  title: string;
  description: string;
  example: string;
}[] = [
  {
    level: 'BEGINNER',
    emoji: '🌱',
    title: '입문',
    description: '영어를 처음 시작해요',
    example: '"Hello, how are you?"',
  },
  {
    level: 'ELEMENTARY',
    emoji: '🌿',
    title: '초급',
    description: '간단한 문장은 이해해요',
    example: '"I used to play soccer."',
  },
  {
    level: 'INTERMEDIATE',
    emoji: '🌳',
    title: '중급',
    description: '일상 대화는 할 수 있어요',
    example: '"The more you practice, the better."',
  },
  {
    level: 'UPPER_INTERMEDIATE',
    emoji: '🏔️',
    title: '중고급',
    description: '뉴스나 기사를 읽을 수 있어요',
    example: '"In hindsight, we should have..."',
  },
  {
    level: 'ADVANCED',
    emoji: '🚀',
    title: '고급',
    description: '원서나 학술 글도 읽어요',
    example: '"Notwithstanding the setbacks..."',
  },
];

export default function SelectLevelPage() {
  const navigate = useNavigate();
  const { setLevel } = useGuestStore();

  const handleSelect = (level: Level) => {
    setLevel(level, 0);
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-dvh px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">나의 영어 수준은?</h1>
        <p className="text-sm text-muted-foreground">
          부담 없이 골라주세요. 언제든 바꿀 수 있어요!
        </p>
      </div>

      <div className="space-y-3">
        {LEVEL_OPTIONS.map((option, index) => (
          <motion.button
            key={option.level}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            onClick={() => handleSelect(option.level)}
            className={cn(
              'w-full text-left px-4 py-4 rounded-2xl border border-border',
              'bg-white hover:border-primary/40 hover:bg-primary/5 transition-all',
              'active:scale-[0.98]',
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{option.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{option.title}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
                <p className="text-xs text-primary/70 mt-1 italic">{option.example}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
