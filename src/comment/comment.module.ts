import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/auth/entity/customer.entity';
import { Eyewear } from 'src/eyewear/entity/eyewear.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Customer, Eyewear])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
