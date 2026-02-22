import { useState, useCallback, useRef, useMemo } from 'react';

type TtsSpeed = 0.5 | 0.75 | 1.0;

export function useTts() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<TtsSpeed>(1.0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isSupported = useMemo(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window,
    [],
  );

  const speak = useCallback(
    (text: string) => {
      if (!isSupported) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = speed;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      utteranceRef.current = utterance;

      // Workaround: some mobile browsers need a small delay
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 50);
    },
    [speed, isSupported],
  );

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, [isSupported]);

  const cycleSpeed = useCallback(() => {
    setSpeed((prev) => {
      if (prev === 1.0) return 0.75;
      if (prev === 0.75) return 0.5;
      return 1.0;
    });
  }, []);

  return { isPlaying, isSupported, speed, speak, stop, cycleSpeed };
}
