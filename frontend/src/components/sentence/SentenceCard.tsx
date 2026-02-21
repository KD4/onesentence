import { Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Sentence } from '@/types';
import { useGuestStore } from '@/stores/guestStore';
import TtsButton from './TtsButton';
import { cn } from '@/lib/utils';

interface SentenceCardProps {
  sentence: Sentence;
  className?: string;
}

export default function SentenceCard({ sentence, className }: SentenceCardProps) {
  const { toggleBookmark, isBookmarked } = useGuestStore();
  const bookmarked = isBookmarked(sentence.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-2xl bg-white border border-border shadow-sm p-6 space-y-4',
        className,
      )}
    >
      {/* English sentence */}
      <div className="space-y-2">
        <p className="text-xl font-semibold leading-relaxed text-foreground">
          {sentence.englishText}
        </p>
        <TtsButton text={sentence.englishText} />
      </div>

      {/* Korean translation */}
      <p className="text-base text-muted-foreground">{sentence.koreanTranslation}</p>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Key expression */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-primary">핵심 표현</p>
        <p className="text-sm text-foreground">{sentence.keyExpression}</p>
      </div>

      {/* Explanation */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-primary">해설</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {sentence.explanation}
        </p>
      </div>

      {/* Bookmark button */}
      <div className="flex justify-end">
        <button
          onClick={() => toggleBookmark(sentence.id)}
          className={cn(
            'flex items-center gap-1 text-sm px-3 py-1.5 rounded-full transition-colors',
            bookmarked
              ? 'bg-primary/10 text-primary'
              : 'bg-muted text-muted-foreground hover:text-primary',
          )}
        >
          {bookmarked ? (
            <BookmarkCheck className="w-4 h-4" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
          {bookmarked ? '저장됨' : '저장'}
        </button>
      </div>
    </motion.div>
  );
}
