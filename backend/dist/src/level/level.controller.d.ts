import { LevelService } from './level.service';
declare class SubmitAnswerDto {
    questionId: number;
    optionId: number;
}
declare class SubmitLevelDto {
    answers: SubmitAnswerDto[];
}
export declare class LevelController {
    private readonly levelService;
    constructor(levelService: LevelService);
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
    submit(dto: SubmitLevelDto): Promise<{
        totalScore: number;
        level: import(".prisma/client").$Enums.Level;
    }>;
}
export {};
