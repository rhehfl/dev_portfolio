import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: '메인 버튼',
    variant: 'primary',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    label: '외곽선 버튼',
    variant: 'outline',
    size: 'md',
  },
};
