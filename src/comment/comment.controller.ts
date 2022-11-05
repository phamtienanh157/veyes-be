import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entity/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  @HttpCode(200)
  getAllComment(): Promise<Comment[]> {
    return this.commentService.getAllComment();
  }

  //   @Post()
  //   @HttpCode(200)
  //   addComment(@Body() body: UpdateBrandDto) {
  //     return this.commentService.updateBrand(body);
  //   }
}
