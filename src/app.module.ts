import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),  // Load environment variables
    MongooseModule.forRoot(process.env.MONGODB_URI), 
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET, // Replace with a secure secret key for signing the JWT
    //   signOptions: { expiresIn: '24h' }, // Adjust token expiration as needed
    // }),
    UsersModule,
    AuthModule,
    CommentsModule,
  ],
})
export class AppModule {}
