import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import type { Sentence } from '@/types';

interface ShareModalProps {
  sentence: Sentence;
  onClose: () => void;
}

export default function ShareModal({ sentence, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `${sentence.englishText}\n${sentence.koreanTranslation}\n\n- OneSentence`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full max-w-[430px] bg-white rounded-t-2xl p-6 space-y-4 animate-in slide-in-from-bottom">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">공유하기</h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-muted rounded-xl text-sm">
          <p className="font-medium">{sentence.englishText}</p>
          <p className="text-muted-foreground mt-1">{sentence.koreanTranslation}</p>
        </div>

        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> 복사 완료!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> 텍스트 복사
            </>
          )}
        </button>
      </div>
    </div>
  );
}
