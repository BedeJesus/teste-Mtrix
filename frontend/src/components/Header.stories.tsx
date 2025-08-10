import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'], // <-- Inserido desde o início
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  loaders: [
    async () => {
      localStorage.removeItem('userEmail');
      return {};
    },
  ],
};

export const LoggedIn: Story = {
  loaders: [
    async () => {
      localStorage.setItem('userEmail', 'user@example.com');
      return {};
    },
  ],
};