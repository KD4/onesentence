import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import { useGuestStore } from '@/stores/guestStore';
import { useStreak } from '@/hooks/useStreak';
import SentenceCard from '@/components/sentence/SentenceCard';
import ShareModal from '@/components/sentence/ShareModal';
import StreakBadge from '@/components/streak/StreakBadge';
import { LEVEL_LABELS } from '@/types';
import type { Sentence } from '@/types';
import apiClient from '@/api/client';

export default function HomePage() {
  const navigate = useNavigate();
  const { level } = useGuestStore();
  const { currentStreak, maxStreak, checkedInToday, checkIn } = useStreak();
  const [sentence, setSentence] = useState<Sentence | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);

  // Redirect to level quiz if no level set
  useEffect(() => {
    if (!level) {
      navigate('/level-quiz', { replace: true });
    }
  }, [level, navigate]);

  // Fetch today's sentence
  useEffect(() => {
    if (!level) return;
    setLoading(true);
    apiClient
      .get<Sentence>('/sentences/today', { params: { level } })
      .then((res) => setSentence(res.data))
      .catch(() => {
        // Fallback: use placeholder if API is not available
        setSentence(null);
      })
      .finally(() => setLoading(false));
  }, [level]);

  // Auto check-in when viewing sentence
  useEffect(() => {
    if (sentence && !checkedInToday) {
      checkIn();
    }
  }, [sentence, checkedInToday, checkIn]);

  if (!level) return null;

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">오늘의 문장</h1>
        <p className="text-sm text-muted-foreground">
          레벨: {LEVEL_LABELS[level]}
        </p>
      </div>

      {/* Streak badge */}
      <StreakBadge currentStreak={currentStreak} maxStreak={maxStreak} />

      {/* Sentence card */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-32 bg-muted rounded" />
        </div>
      ) : sentence ? (
        <div className="space-y-3">
          <SentenceCard sentence={sentence} />
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Share2 className="w-4 h-4" />
            공유하기
          </button>
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>오늘의 문장을 불러올 수 없습니다.</p>
          <p className="text-sm mt-1">서버 연결을 확인해 주세요.</p>
        </div>
      )}

      {/* Share modal */}
      {shareOpen && sentence && (
        <ShareModal sentence={sentence} onClose={() => setShareOpen(false)} />
      )}
    </div>
  );
}
