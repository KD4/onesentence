import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { SentenceService } from './sentence.service';
import { Level } from '@prisma/client';

@ApiTags('sentences')
@Controller('sentences')
export class SentenceController {
  constructor(private readonly sentenceService: SentenceService) {}

  @Get('today')
  @ApiQuery({ name: 'level', enum: Level })
  getToday(@Query('level') level: Level) {
    return this.sentenceService.getToday(level);
  }

  @Get('archive')
  @ApiQuery({ name: 'level', enum: Level })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'size', required: false })
  getArchive(
    @Query('level') level: Level,
    @Query('page') page = '1',
    @Query('size') size = '10',
  ) {
    return this.sentenceService.getArchive(level, +page, +size);
  }

  @Get('by-ids')
  @ApiQuery({ name: 'ids', description: 'Comma-separated sentence IDs' })
  getByIds(@Query('ids') ids: string) {
    const idArray = ids.split(',').map(Number).filter(Boolean);
    return this.sentenceService.getByIds(idArray);
  }
}
