import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: { content: string }, @Req() req: Request) {
        const userId = req.user['userId'];
        return this.commentsService.create({ content: body.content, author: userId });
    }

    @Get()
    async findAll() {
        return this.commentsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: { content: string }, @Req() req: Request) {
        const userId = req.user['userId'];
        const comment = await this.commentsService.findOne(id);
        if (comment.author._id.toString() !== userId) {
            throw new UnauthorizedException();
        }
        return this.commentsService.update(id, { content: body.content });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: Request) {
        const userId = req.user['userId'];
        const comment = await this.commentsService.findOne(id);
        if (comment.author._id.toString() !== userId) {
            throw new UnauthorizedException();
        }
        return this.commentsService.remove(id);
    }
}
