import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getAllComment(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  //   async updateBrand(body: UpdateBrandDto) {
  //     const brand = new Brand();
  //     if (body.id) {
  //       brand.id = body.id;
  //     }
  //     brand.name = body.name;
  //     return await this.commentRepository.save(brand);
  //   }
}
