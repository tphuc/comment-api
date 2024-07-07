// comments.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/types';
import { User } from '../users/schemas/user.schema'; // Import User schema
import { UsersService } from '../users/users.service'; // Import UsersService

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: { content: string }, @Req() req: AuthenticatedRequest) {
    const _user = req.user as unknown as User; // Assuming req.user is correctly typed as User
    const userId = _user._id as string; // Fetch the userId directly
    const user = await this.usersService.findOneById(userId); // Fetch the user object
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const createdComment = await this.commentsService.create({ content: body.content, author: user });
    return createdComment;
  }

  @Get()
  async findAll() {
    return this.commentsService.findAllPopulated();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { content: string }, @Req() req: AuthenticatedRequest) {
    const _user = req.user as unknown as User;
    const userId = _user._id as string;
    const comment = await this.commentsService.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    if (comment.author.toString() !== userId.toString()) {
      throw new UnauthorizedException(`You are not authorized to update this comment`);
    }
    return this.commentsService.update(id, { content: body.content });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user._id 

    const comment = await this.commentsService.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    if (comment.author.toString() !== userId.toString()) {
      throw new UnauthorizedException(`You are not authorized to delete this comment`);
    }
    return this.commentsService.remove(id);
  }
}
