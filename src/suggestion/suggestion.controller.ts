import { Controller, Get, HttpCode, Post, Body } from '@nestjs/common';
import { SuggestionDto } from './dto/suggestion.dto';
import { SuggestionService } from './suggestion.service';

@Controller('suggestion')
export class SuggestionController {
  constructor(private readonly suggestService: SuggestionService) {}

  @Get()
  @HttpCode(200)
  getSuggestionForm() {
    return this.suggestService.getSuggestionForm();
  }

  @Post()
  @HttpCode(200)
  postSuggestionForm(@Body() body: SuggestionDto) {
    return this.suggestService.postSuggestionForm(body);
  }
}
