import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaClient],
})
export class UsersModule {}