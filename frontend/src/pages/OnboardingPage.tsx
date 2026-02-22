import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Clock } from 'lucide-react';
import { useGuestStore } from '@/stores/guestStore';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { level } = useGuestStore();

  // Already has level, go to home
  if (level) {
    navigate('/', { replace: true });
    return null;
  }

  return (
    <div className="min-h-dvh flex flex-col px-6 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">OneSentence</h1>
          <p className="text-lg text-muted-foreground">
            매일 영어 한 문장,<br />
            가볍게 시작하세요
          </p>
        </div>

        {/* Features */}
        <div className="w-full max-w-xs space-y-3 pt-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium">내 수준에 맞는 문장</p>
              <p className="text-xs text-muted-foreground">매일 딱 1문장, 부담 없이</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium">출석 스트릭</p>
              <p className="text-xs text-muted-foreground">매일 접속하면 연속 기록이 쌓여요</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">30초면 충분</p>
              <p className="text-xs text-muted-foreground">읽고, 듣고, 저장하고 끝!</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="pt-6"
      >
        <button
          onClick={() => navigate('/select-level')}
          className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg hover:bg-primary/90 transition-colors"
        >
          시작하기
        </button>
      </motion.div>
    </div>
  );
}
