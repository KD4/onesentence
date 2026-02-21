import { useState, useCallback, useRef } from 'react';

type TtsSpeed = 0.5 | 0.75 | 1.0;

export function useTts() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<TtsSpeed>(1.0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(
    (text: string) => {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = speed;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      utteranceRef.current = utterance;

      window.speechSynthesis.speak(utterance);
    },
    [speed],
  );

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  const cycleSpeed = useCallback(() => {
    setSpeed((prev) => {
      if (prev === 1.0) return 0.75;
      if (prev === 0.75) return 0.5;
      return 1.0;
    });
  }, []);

  return { isPlaying, speed, speak, stop, cycleSpeed };
}
