import { useState, useEffect } from 'react';
import { useGuestStore } from '@/stores/guestStore';
import SentenceCard from '@/components/sentence/SentenceCard';
import type { Sentence } from '@/types';
import apiClient from '@/api/client';

export default function BookmarkPage() {
  const { bookmarkedSentenceIds } = useGuestStore();
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookmarkedSentenceIds.length === 0) {
      setSentences([]);
      setLoading(false);
      return;
    }

    apiClient
      .get<Sentence[]>('/sentences/by-ids', {
        params: { ids: bookmarkedSentenceIds.join(',') },
      })
      .then((res) => setSentences(res.data))
      .catch(() => setSentences([]))
      .finally(() => setLoading(false));
  }, [bookmarkedSentenceIds]);

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">북마크</h1>
        <p className="text-sm text-muted-foreground">저장한 문장들이에요</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse h-48 bg-muted rounded-2xl" />
          ))}
        </div>
      ) : sentences.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>저장한 문장이 없습니다</p>
          <p className="text-sm mt-1">마음에 드는 문장을 저장해 보세요</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sentences.map((s) => (
            <SentenceCard key={s.id} sentence={s} />
          ))}
        </div>
      )}
    </div>
  );
}
