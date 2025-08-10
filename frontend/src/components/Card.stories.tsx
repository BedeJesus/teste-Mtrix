import type { Meta, StoryObj } from '@storybook/react';
import EventCard from './Card';
import type { Event } from '../types/event';

const meta: Meta<typeof EventCard> = {
  title: 'Components/EventCard',
  component: EventCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockEvent: Event = {
  id: '1',
  name: 'Evento Exemplo',
  startDate: new Date('2025-10-26T20:00:00'),
  endDate: new Date('2025-10-26T23:30:00'),
};

export const Default: Story = {
  args: {
    ...mockEvent,
  },
};