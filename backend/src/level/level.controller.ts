import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LevelService } from './level.service';

class SubmitAnswerDto {
  questionId: number;
  optionId: number;
}

class SubmitLevelDto {
  answers: SubmitAnswerDto[];
}

@ApiTags('level')
@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get('questions')
  getQuestions() {
    return this.levelService.getQuestions();
  }

  @Post('submit')
  submit(@Body() dto: SubmitLevelDto) {
    return this.levelService.submit(dto.answers);
  }
}
