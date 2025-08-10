import {
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckoutDto } from './dto/checkout-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaClient,
  ) { }

  async login(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    let message = '';

    if (!user) {
      message = 'Usuário não encontrado com esse e-mail.';
      return { success: false, message };
    }

    if (user.password !== password) {
      message = 'Senha incorreta';
      return { success: false, message };
    }

    return { success: true, user: { email: user.email } };
  }

  async checkout(checkoutDto: CheckoutDto) {
    const { email, password, eventId } = checkoutDto;

    let user = await this.prisma.user.findUnique({ where: { email } });

    let message = '';

    if (user) {
      if (user.password !== password) {
        message = 'Senha incorreta';
        return { success: false, message };
      }
    } else {
      user = await this.prisma.user.create({
        data: { email, password },
      });
    }

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      message = 'Evento não encontrado';
      return { success: false, message };
    }

    const userEvents = await this.prisma.event.findMany({
      where: { users: { some: { id: user.id } } },
    });

    const hasConflict = userEvents.some(
      (userEvent) =>
        userEvent.startDate.getTime() === event.startDate.getTime(),
    );

    if (hasConflict) {
      message = 'Você já possui um evento cadastrado neste mesmo horário';
      return { success: false, message };
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { events: { connect: { id: eventId } } },
    });

    await this.prisma.event.update({
      where: { id: eventId },
      data: { users: { connect: { id: user.id } } },
    });

    message = 'Evento agendado com sucesso';
    return { success: true, message };
  }

  async myEvents(email: string) {

    let message = '';

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      message = 'Usuário não encontrado com esse e-mail.';
      return { success: false, message };
    }

    const events = await this.prisma.event.findMany({
      where: { users: { some: { id: user.id } } },
    });

    return { success: true, events };
  }
}
