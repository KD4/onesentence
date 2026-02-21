import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import LevelResultComponent from '@/components/level/LevelResult';
import { useGuestStore } from '@/stores/guestStore';
import type { Level } from '@/types';

export default function LevelResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLevel } = useGuestStore();

  const state = location.state as { level: Level; score: number } | undefined;

  if (!state) {
    return <Navigate to="/level-quiz" replace />;
  }

  const handleConfirm = () => {
    setLevel(state.level, state.score);
    navigate('/', { replace: true });
  };

  return (
    <div className="px-4 py-6">
      <LevelResultComponent
        level={state.level}
        score={state.score}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
