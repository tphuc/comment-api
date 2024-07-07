import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(data: Partial<Comment>): Promise<Comment> {
    const createdComment = new this.commentModel(data);
    return createdComment.save();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().populate('author').exec();
  }

  async findOne(id: string): Promise<Comment | null> {
    return this.commentModel.findById(id).populate('author').exec();
  }

  async update(id: string, data: Partial<Comment>): Promise<Comment> {
    return this.commentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<Comment> {
    return this.commentModel.findByIdAndDelete(id).exec();
  }
}
