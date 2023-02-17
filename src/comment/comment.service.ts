import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  async findAll() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `This action returns all comment`;
  }
}
