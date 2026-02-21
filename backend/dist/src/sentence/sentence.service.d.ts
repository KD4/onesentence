import { PrismaService } from '../prisma/prisma.service';
import { Level } from '@prisma/client';
export declare class SentenceService {
    private prisma;
    constructor(prisma: PrismaService);
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
    getArchive(level: Level, page: number, size: number): Promise<{
        id: number;
        level: import(".prisma/client").$Enums.Level;
        createdAt: Date;
        englishText: string;
        koreanTranslation: string;
        keyExpression: string;
        explanation: string;
        scheduledDate: Date;
    }[]>;
    getByIds(ids: number[]): Promise<{
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
