import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async findAllPopulated(): Promise<Comment[]> {
    return this.commentModel.find().populate('author').exec();
  }

  async findOne(id: string): Promise<Comment | null> {
    return this.commentModel.findById(id).exec();
  }

  async create(data: Partial<Comment>): Promise<Comment> {
    const createdComment = new this.commentModel(data);
    return createdComment.save();
  }

  async update(id: string, update: Partial<Comment>): Promise<Comment | null> {
    return this.commentModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async remove(id: string): Promise<Comment | null> {
    return this.commentModel.findByIdAndDelete(id).exec();
  }

  async findByUserId(userId: string): Promise<Comment[]> {
    console.log("---", userId.toString())
    return this.commentModel.find({ author: userId }).populate('author').exec();
  }
}