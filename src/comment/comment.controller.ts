import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { ERole } from 'src/common/constants';
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment } from './entity/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  @HttpCode(200)
  getAllComment(@Param('id') id: number): Promise<Comment[]> {
    return this.commentService.getAllComment(id);
  }

  @Post()
  @UseGuards(RoleGuard)
  @UseGuards(JWTGuard)
  @Roles(ERole.USER)
  @HttpCode(200)
  addComment(@Request() request, @Body() body: AddCommentDto) {
    return this.commentService.addComment(request.user.id, body);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @UseGuards(JWTGuard)
  @Roles(ERole.USER)
  @HttpCode(200)
  deleteComment(@Param('id') id: number) {
    return this.commentService.deleteComment(id);
  }
}
