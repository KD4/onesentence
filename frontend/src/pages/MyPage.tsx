import { useNavigate } from 'react-router-dom';
import { BookmarkIcon, RefreshCw, Trash2 } from 'lucide-react';
import { useGuestStore } from '@/stores/guestStore';
import { useStreak } from '@/hooks/useStreak';
import StreakBadge from '@/components/streak/StreakBadge';
import StreakCalendar from '@/components/streak/StreakCalendar';
import { LEVEL_LABELS } from '@/types';

export default function MyPage() {
  const navigate = useNavigate();
  const { level, bookmarkedSentenceIds, reset } = useGuestStore();
  const { attendanceDates, currentStreak, maxStreak } = useStreak();

  const handleRetakeQuiz = () => {
    navigate('/select-level');
  };

  const handleReset = () => {
    if (window.confirm('모든 데이터가 초기화됩니다. 계속하시겠습니까?')) {
      reset();
      navigate('/onboarding', { replace: true });
    }
  };

  return (
    <div className="px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">마이페이지</h1>

      {/* Guest profile */}
      <div className="p-4 bg-white border border-border rounded-2xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
            G
          </div>
          <div>
            <p className="font-semibold">게스트</p>
            <p className="text-sm text-muted-foreground">
              {level ? `레벨: ${LEVEL_LABELS[level]}` : '레벨 미설정'}
            </p>
          </div>
        </div>
      </div>

      {/* Streak */}
      <div className="p-4 bg-white border border-border rounded-2xl space-y-4">
        <h2 className="font-semibold">출석 현황</h2>
        <StreakBadge currentStreak={currentStreak} maxStreak={maxStreak} />
        <StreakCalendar attendanceDates={attendanceDates} />
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={() => navigate('/bookmarks')}
          className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-border rounded-xl hover:bg-muted transition-colors"
        >
          <BookmarkIcon className="w-5 h-5 text-muted-foreground" />
          <span>북마크 목록</span>
          <span className="ml-auto text-sm text-muted-foreground">
            {bookmarkedSentenceIds.length}개
          </span>
        </button>

        <button
          onClick={handleRetakeQuiz}
          className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-border rounded-xl hover:bg-muted transition-colors"
        >
          <RefreshCw className="w-5 h-5 text-muted-foreground" />
          <span>레벨 재진단</span>
        </button>

        <button
          onClick={handleReset}
          className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-border rounded-xl hover:bg-destructive/5 text-destructive transition-colors"
        >
          <Trash2 className="w-5 h-5" />
          <span>데이터 초기화</span>
        </button>
      </div>
    </div>
  );
}
