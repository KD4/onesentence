import { useState, useEffect } from 'react';
import { useGuestStore } from '@/stores/guestStore';
import SentenceCard from '@/components/sentence/SentenceCard';
import type { Sentence } from '@/types';
import apiClient from '@/api/client';

export default function ArchivePage() {
  const { level } = useGuestStore();
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!level) return;
    setLoading(true);
    apiClient
      .get<Sentence[]>('/sentences/archive', {
        params: { level, page, size: 10 },
      })
      .then((res) => {
        if (page === 1) {
          setSentences(res.data);
        } else {
          setSentences((prev) => [...prev, ...res.data]);
        }
        setHasMore(res.data.length === 10);
      })
      .catch(() => setSentences([]))
      .finally(() => setLoading(false));
  }, [level, page]);

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">지난 문장</h1>
        <p className="text-sm text-muted-foreground">그동안 배운 문장들이에요</p>
      </div>

      {loading && sentences.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-48 bg-muted rounded-2xl" />
          ))}
        </div>
      ) : sentences.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>아직 문장이 없습니다</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sentences.map((s) => (
            <SentenceCard key={s.id} sentence={s} />
          ))}
          {hasMore && (
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={loading}
              className="w-full py-3 text-sm text-muted-foreground hover:text-foreground border border-border rounded-xl transition-colors"
            >
              {loading ? '불러오는 중...' : '더 보기'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
