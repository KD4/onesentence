import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Level } from '@prisma/client';

@Injectable()
export class SentenceService {
  constructor(private prisma: PrismaService) {}

  async getToday(level: Level) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sentence = await this.prisma.sentence.findFirst({
      where: {
        level,
        scheduledDate: today,
      },
    });

    // Fallback: get latest sentence for this level if no scheduled one for today
    if (!sentence) {
      return this.prisma.sentence.findFirst({
        where: { level },
        orderBy: { scheduledDate: 'desc' },
      });
    }

    return sentence;
  }

  async getArchive(level: Level, page: number, size: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.sentence.findMany({
      where: {
        level,
        scheduledDate: { lt: today },
      },
      orderBy: { scheduledDate: 'desc' },
      skip: (page - 1) * size,
      take: size,
    });
  }

  async getByIds(ids: number[]) {
    return this.prisma.sentence.findMany({
      where: { id: { in: ids } },
      orderBy: { scheduledDate: 'desc' },
    });
  }
}
