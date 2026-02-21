import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import QuizQuestion from '@/components/level/QuizQuestion';
import QuizProgress from '@/components/level/QuizProgress';
import type { LevelQuestion, Level } from '@/types';
import apiClient from '@/api/client';

const LEVEL_RANGES: { min: number; max: number; level: Level }[] = [
  { min: 0, max: 20, level: 'BEGINNER' },
  { min: 21, max: 40, level: 'ELEMENTARY' },
  { min: 41, max: 60, level: 'INTERMEDIATE' },
  { min: 61, max: 80, level: 'UPPER_INTERMEDIATE' },
  { min: 81, max: 100, level: 'ADVANCED' },
];

function scoreToLevel(score: number): Level {
  for (const range of LEVEL_RANGES) {
    if (score >= range.min && score <= range.max) return range.level;
  }
  return 'BEGINNER';
}

export default function LevelQuizPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<LevelQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { optionId: number; score: number }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<LevelQuestion[]>('/level/questions')
      .then((res) => {
        const sorted = res.data.sort((a, b) => a.orderIndex - b.orderIndex);
        setQuestions(sorted);
      })
      .catch(() => {
        // Fallback sample questions for offline/guest mode
        setQuestions(FALLBACK_QUESTIONS);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (optionId: number, score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentIndex].id]: { optionId, score },
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Calculate total score and navigate to result
      const totalScore = Object.values(answers).reduce((sum, a) => sum + a.score, 0);
      const level = scoreToLevel(totalScore);
      navigate('/level-result', {
        state: { level, score: totalScore },
        replace: true,
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion.id];
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="space-y-1">
        <h1 className="text-xl font-bold">레벨 진단</h1>
        <p className="text-sm text-muted-foreground">
          질문에 답하면 맞춤 레벨을 배정해 드려요
        </p>
      </div>

      <QuizProgress current={currentIndex} total={questions.length} />

      <AnimatePresence mode="wait">
        <QuizQuestion
          question={currentQuestion}
          selectedOptionId={currentAnswer?.optionId ?? null}
          onSelect={handleSelect}
        />
      </AnimatePresence>

      <div className="flex gap-3">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="flex-1 py-3 rounded-xl border border-border font-medium hover:bg-muted transition-colors"
          >
            이전
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!currentAnswer}
          className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLast ? '결과 보기' : '다음'}
        </button>
      </div>
    </div>
  );
}

// Fallback questions when API is not available (guest offline mode)
const FALLBACK_QUESTIONS: LevelQuestion[] = [
  {
    id: 1,
    orderIndex: 1,
    questionText: '다음 인사말의 의미로 가장 적절한 것은?\n"How do you do?"',
    options: [
      { id: 1, optionText: '어떻게 하나요?', score: 5, orderIndex: 1 },
      { id: 2, optionText: '처음 뵙겠습니다', score: 20, orderIndex: 2 },
      { id: 3, optionText: '뭐 하세요?', score: 10, orderIndex: 3 },
      { id: 4, optionText: '잘 지내세요?', score: 15, orderIndex: 4 },
    ],
  },
  {
    id: 2,
    orderIndex: 2,
    questionText: '빈칸에 알맞은 것은?\n"She ___ to school every day."',
    options: [
      { id: 5, optionText: 'go', score: 5, orderIndex: 1 },
      { id: 6, optionText: 'goes', score: 20, orderIndex: 2 },
      { id: 7, optionText: 'going', score: 10, orderIndex: 3 },
      { id: 8, optionText: 'gone', score: 10, orderIndex: 4 },
    ],
  },
  {
    id: 3,
    orderIndex: 3,
    questionText: '다음 문장의 의미는?\n"I couldn\'t help laughing."',
    options: [
      { id: 9, optionText: '웃는 것을 도울 수 없었다', score: 5, orderIndex: 1 },
      { id: 10, optionText: '웃지 않을 수 없었다', score: 20, orderIndex: 2 },
      { id: 11, optionText: '웃으며 도왔다', score: 5, orderIndex: 3 },
      { id: 12, optionText: '웃음을 참았다', score: 10, orderIndex: 4 },
    ],
  },
  {
    id: 4,
    orderIndex: 4,
    questionText: '빈칸에 알맞은 것은?\n"If I ___ you, I would accept the offer."',
    options: [
      { id: 13, optionText: 'am', score: 5, orderIndex: 1 },
      { id: 14, optionText: 'was', score: 10, orderIndex: 2 },
      { id: 15, optionText: 'were', score: 20, orderIndex: 3 },
      { id: 16, optionText: 'be', score: 5, orderIndex: 4 },
    ],
  },
  {
    id: 5,
    orderIndex: 5,
    questionText: '다음 문장에서 밑줄 친 부분의 역할은?\n"What surprised me was his attitude."',
    options: [
      { id: 17, optionText: '목적어', score: 10, orderIndex: 1 },
      { id: 18, optionText: '주어 (명사절)', score: 20, orderIndex: 2 },
      { id: 19, optionText: '보어', score: 10, orderIndex: 3 },
      { id: 20, optionText: '부사절', score: 5, orderIndex: 4 },
    ],
  },
];
