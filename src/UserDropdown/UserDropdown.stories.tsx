import type { Meta, StoryObj } from '@storybook/react';
import { UserDropdown } from './UserDropdown';

const sampleUser = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  avatar: 'https://i.pravatar.cc/150?u=jane',
  role: 'Admin',
  status: 'online' as const,
};

const sampleMenuItems = [
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' },
  { id: 'billing', label: 'Billing' },
];

const meta = {
  title: 'Account/UserDropdown',
  component: UserDropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onMenuAction: { action: 'menuAction' },
    onSignOut: { action: 'signOut' },
  },
} satisfies Meta<typeof UserDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAvatar: Story = {
  args: {
    user: sampleUser,
    menuItems: sampleMenuItems,
  },
};

export const WithInitials: Story = {
  args: {
    user: { name: 'John Smith', email: 'john@example.com' },
    menuItems: sampleMenuItems,
  },
};

export const Online: Story = {
  args: {
    user: { ...sampleUser, status: 'online' },
    menuItems: sampleMenuItems,
  },
};

export const Offline: Story = {
  args: {
    user: { ...sampleUser, status: 'offline' },
    menuItems: sampleMenuItems,
  },
};

export const Away: Story = {
  args: {
    user: { ...sampleUser, status: 'away' },
    menuItems: sampleMenuItems,
  },
};

export const WithRole: Story = {
  args: {
    user: { ...sampleUser, role: 'Super Admin' },
    menuItems: sampleMenuItems,
  },
};

export const Open: Story = {
  args: {
    user: sampleUser,
    menuItems: [
      ...sampleMenuItems,
      { id: 'danger', label: 'Delete Account', danger: true },
    ],
  },
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector('[aria-label="User menu"]') as HTMLElement;
    trigger?.click();
  },
};
