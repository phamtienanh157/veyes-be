import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eyewear } from 'src/eyewear/entity/eyewear.entity';
import { Suggestion } from './entity/suggestion.entity';
import { SuggestionForm } from './entity/suggestionForm.entity';
import { SuggestionController } from './suggestion.controller';
import { SuggestionService } from './suggestion.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuggestionForm, Suggestion, Eyewear])],
  controllers: [SuggestionController],
  providers: [SuggestionService],
})
export class SuggestionModule {}
