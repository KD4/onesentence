import { PrismaService } from '../prisma/prisma.service';
export declare class LevelService {
    private prisma;
    constructor(prisma: PrismaService);
    getQuestions(): Promise<({
        options: {
            id: number;
            orderIndex: number;
            createdAt: Date;
            optionText: string;
            score: number;
            questionId: number;
        }[];
    } & {
        id: number;
        orderIndex: number;
        questionText: string;
        isActive: boolean;
        createdAt: Date;
    })[]>;
    submit(answers: {
        questionId: number;
        optionId: number;
    }[]): Promise<{
        totalScore: number;
        level: import(".prisma/client").$Enums.Level;
    }>;
}
