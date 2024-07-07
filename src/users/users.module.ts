import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), CommentsModule],
  providers: [UsersService,],
  exports: [UsersService,],
  controllers: [UsersController],
})
export class UsersModule {}
