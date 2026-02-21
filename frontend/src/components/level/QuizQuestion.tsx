import { motion } from 'framer-motion';
import type { LevelQuestion } from '@/types';
import { cn } from '@/lib/utils';

interface QuizQuestionProps {
  question: LevelQuestion;
  selectedOptionId: number | null;
  onSelect: (optionId: number, score: number) => void;
}

export default function QuizQuestion({
  question,
  selectedOptionId,
  onSelect,
}: QuizQuestionProps) {
  const sortedOptions = [...question.options].sort(
    (a, b) => a.orderIndex - b.orderIndex,
  );

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-6"
    >
      <h2 className="text-lg font-semibold leading-relaxed">
        {question.questionText}
      </h2>
      <div className="space-y-3">
        {sortedOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id, option.score)}
            className={cn(
              'w-full text-left px-4 py-3 rounded-xl border transition-all',
              selectedOptionId === option.id
                ? 'border-primary bg-primary/5 text-primary font-medium'
                : 'border-border bg-white hover:border-primary/40',
            )}
          >
            {option.optionText}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
