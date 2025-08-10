import { Controller, Post, Body, Res, HttpStatus, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckoutDto } from './dto/checkout-user.dto';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const result = await this.usersService.login(createUserDto);
    if (result.success) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }

  @Post('checkout')
  async checkout(@Body() checkoutDto: CheckoutDto, @Res() res: Response) {
    const result = await this.usersService.checkout(checkoutDto);
    if (result.success) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }

  @Get('myEvents')
  async myEvents(@Query('email') email: string, @Res() res: Response) {
    const result = await this.usersService.myEvents(email);
    if (result.success) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
  }
}
