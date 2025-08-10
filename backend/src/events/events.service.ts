import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll() {
    const response = await this.prisma.event.findMany();
    return response;
  }

  async getEvent(id: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });

    return event;
  }
}
