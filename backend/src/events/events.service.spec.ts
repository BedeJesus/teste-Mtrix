import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { PrismaClient } from '@prisma/client';

const prismaMock = {
  event: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: PrismaClient,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return the events', async () => {

      const mockEvents = [
        { id: '1', name: 'Show de Pop', startDate: "2026-03-01T10:00:00Z", endDate: "2026-03-05T18:00:00Z" },
        { id: '2', name: 'Exposição de Arte moderna', startDate: "2026-03-10T10:00:00Z", endDate: "2026-03-15T18:00:00Z" },
        { id: '3', name: 'Show de Música Eletrônica', startDate: "2026-03-20T10:00:00Z", endDate: "2026-03-25T18:00:00Z" },
      ];
      prismaMock.event.findMany.mockResolvedValue(mockEvents);

      const result = await service.findAll();

      expect(result).toEqual(mockEvents);
      expect(prismaMock.event.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
