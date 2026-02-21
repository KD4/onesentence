import { SentenceService } from './sentence.service';
import { Level } from '@prisma/client';
export declare class SentenceController {
    private readonly sentenceService;
    constructor(sentenceService: SentenceService);
    getToday(level: Level): Promise<{
        id: number;
        level: import(".prisma/client").$Enums.Level;
        createdAt: Date;
        englishText: string;
        koreanTranslation: string;
        keyExpression: string;
        explanation: string;
        scheduledDate: Date;
    } | null>;
    getArchive(level: Level, page?: string, size?: string): Promise<{
        id: number;
        level: import(".prisma/client").$Enums.Level;
        createdAt: Date;
        englishText: string;
        koreanTranslation: string;
        keyExpression: string;
        explanation: string;
        scheduledDate: Date;
    }[]>;
    getByIds(ids: string): Promise<{
        id: number;
        level: import(".prisma/client").$Enums.Level;
        createdAt: Date;
        englishText: string;
        koreanTranslation: string;
        keyExpression: string;
        explanation: string;
        scheduledDate: Date;
    }[]>;
}
