import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import type { Level } from '@/types';
import { LEVEL_LABELS } from '@/types';

interface LevelResultProps {
  level: Level;
  score: number;
  onConfirm: () => void;
}

export default function LevelResult({ level, score, onConfirm }: LevelResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center space-y-6 py-8"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
        <Trophy className="w-10 h-10 text-primary" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">레벨 진단 완료!</h2>
        <p className="text-muted-foreground">당신의 영어 레벨을 확인해 보세요</p>
      </div>

      <div className="space-y-1">
        <p className="text-4xl font-bold text-primary">{LEVEL_LABELS[level]}</p>
        <p className="text-sm text-muted-foreground">{level}</p>
        <p className="text-sm text-muted-foreground">총점: {score}점</p>
      </div>

      <button
        onClick={onConfirm}
        className="w-full max-w-xs px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
      >
        시작하기
      </button>
    </motion.div>
  );
}
