import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LevelService {
  constructor(private prisma: PrismaService) {}

  async getQuestions() {
    return this.prisma.levelQuestion.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: 'asc' },
      include: {
        options: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });
  }

  async submit(answers: { questionId: number; optionId: number }[]) {
    // Get selected options to calculate scores
    const optionIds = answers.map((a) => a.optionId);
    const options = await this.prisma.levelOption.findMany({
      where: { id: { in: optionIds } },
    });

    const totalScore = options.reduce((sum, opt) => sum + opt.score, 0);

    // Find matching level range
    const range = await this.prisma.levelRange.findFirst({
      where: {
        minScore: { lte: totalScore },
        maxScore: { gte: totalScore },
      },
    });

    return {
      totalScore,
      level: range?.level ?? 'BEGINNER',
    };
  }
}
