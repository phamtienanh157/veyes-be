import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/auth/entity/customer.entity';
import { Eyewear } from 'src/eyewear/entity/eyewear.entity';
import { Repository } from 'typeorm';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Eyewear)
    private readonly eyewearRepository: Repository<Eyewear>,
  ) {}

  async getAllComment(id: number): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: {
        eyewear: {
          id,
        },
      },
      relations: {
        customer: true,
      },
    });
  }

  async addComment(userId: number, body: AddCommentDto) {
    const customer = await this.customerRepository.findOneBy({
      user: { id: userId },
    });
    const eyewear = await this.eyewearRepository.findOneBy({
      id: body.eyewearId,
    });
    const comment = new Comment();
    comment.comment = body.comment;
    comment.customer = customer;
    comment.eyewear = eyewear;
    return await this.commentRepository.save(comment);
  }

  async deleteComment(id: number) {
    return await this.commentRepository.delete({ id });
  }
}
