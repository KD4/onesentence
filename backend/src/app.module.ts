import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SentenceModule } from './sentence/sentence.module';
import { LevelModule } from './level/level.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SentenceModule,
    LevelModule,
  ],
})
export class AppModule {}
