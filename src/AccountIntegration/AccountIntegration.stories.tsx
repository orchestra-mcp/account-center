import type { Meta, StoryObj } from '@storybook/react';
import { AccountIntegration } from './AccountIntegration';
import type { Integration } from './AccountIntegration';

const github: Integration = {
  id: 'github',
  name: 'GitHub',
  icon: <span>GH</span>,
  description: 'Source control and repositories',
  connected: true,
  userName: 'octocat',
  lastSync: '2 minutes ago',
};

const slack: Integration = {
  id: 'slack',
  name: 'Slack',
  icon: <span>SL</span>,
  description: 'Team messaging and notifications',
  connected: false,
};

const jira: Integration = {
  id: 'jira',
  name: 'Jira',
  icon: <span>JR</span>,
  description: 'Issue tracking and project management',
  connected: true,
  userName: 'admin@company.com',
  lastSync: '1 hour ago',
};

const figma: Integration = {
  id: 'figma',
  name: 'Figma',
  icon: <span>FG</span>,
  description: 'Design collaboration platform',
  connected: false,
};

const mixed = [github, slack, jira, figma];

/**
 * AccountIntegration displays a list of connected account integrations.
 * - Connected integrations show a green status dot, username, and disconnect button
 * - Disconnected integrations show a connect button
 * - Optional configure button per integration
 */
const meta = {
  title: 'Account/AccountIntegration',
  component: AccountIntegration,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onConnect: { action: 'connect' },
    onDisconnect: { action: 'disconnect' },
    onConfigure: { action: 'configure' },
  },
} satisfies Meta<typeof AccountIntegration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    integrations: mixed,
    onConnect: () => {},
    onDisconnect: () => {},
  },
};

export const AllConnected: Story = {
  args: {
    integrations: mixed.map((i) => ({
      ...i,
      connected: true,
      userName: i.userName || 'user@example.com',
      lastSync: i.lastSync || 'just now',
    })),
    onConnect: () => {},
    onDisconnect: () => {},
  },
};

export const AllDisconnected: Story = {
  args: {
    integrations: mixed.map((i) => ({
      ...i,
      connected: false,
      userName: undefined,
      lastSync: undefined,
    })),
    onConnect: () => {},
    onDisconnect: () => {},
  },
};

export const Mixed: Story = {
  args: {
    integrations: [github, slack],
    onConnect: () => {},
    onDisconnect: () => {},
  },
};

export const WithConfigure: Story = {
  args: {
    integrations: [github, jira],
    onConnect: () => {},
    onDisconnect: () => {},
    onConfigure: () => {},
  },
};
