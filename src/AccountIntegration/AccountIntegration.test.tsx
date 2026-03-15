import { render, screen } from '@testing-library/react';
import { AccountIntegration } from './AccountIntegration';
import type { Integration } from './AccountIntegration';

const connectedItem: Integration = {
  id: 'github',
  name: 'GitHub',
  description: 'Source control and repositories',
  connected: true,
  userName: 'octocat',
  lastSync: '2 minutes ago',
};

const disconnectedItem: Integration = {
  id: 'slack',
  name: 'Slack',
  description: 'Team messaging and notifications',
  connected: false,
};

const noop = () => {};

describe('AccountIntegration', () => {
  it('renders all integrations', () => {
    render(
      <AccountIntegration
        integrations={[connectedItem, disconnectedItem]}
        onConnect={noop}
        onDisconnect={noop}
      />,
    );
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Slack')).toBeInTheDocument();
  });

  it('shows username for connected integration', () => {
    render(
      <AccountIntegration
        integrations={[connectedItem]}
        onConnect={noop}
        onDisconnect={noop}
      />,
    );
    expect(screen.getByText('octocat')).toBeInTheDocument();
  });

  it('shows disconnect button for connected integration', () => {
    render(
      <AccountIntegration
        integrations={[connectedItem]}
        onConnect={noop}
        onDisconnect={noop}
      />,
    );
    expect(screen.getByRole('button', { name: /disconnect/i })).toBeInTheDocument();
  });

  it('shows connect button for disconnected integration', () => {
    render(
      <AccountIntegration
        integrations={[disconnectedItem]}
        onConnect={noop}
        onDisconnect={noop}
      />,
    );
    expect(screen.getByRole('button', { name: /connect/i })).toBeInTheDocument();
  });

  it('fires onConnect when connect is clicked', () => {
    const handleConnect = vi.fn();
    render(
      <AccountIntegration
        integrations={[disconnectedItem]}
        onConnect={handleConnect}
        onDisconnect={noop}
      />,
    );
    screen.getByRole('button', { name: /connect/i }).click();
    expect(handleConnect).toHaveBeenCalledWith('slack');
  });

  it('fires onDisconnect when disconnect is clicked', () => {
    const handleDisconnect = vi.fn();
    render(
      <AccountIntegration
        integrations={[connectedItem]}
        onConnect={noop}
        onDisconnect={handleDisconnect}
      />,
    );
    screen.getByRole('button', { name: /disconnect/i }).click();
    expect(handleDisconnect).toHaveBeenCalledWith('github');
  });

  it('shows configure button when onConfigure is provided', () => {
    const handleConfigure = vi.fn();
    render(
      <AccountIntegration
        integrations={[connectedItem]}
        onConnect={noop}
        onDisconnect={noop}
        onConfigure={handleConfigure}
      />,
    );
    const btn = screen.getByRole('button', { name: /configure/i });
    expect(btn).toBeInTheDocument();
    btn.click();
    expect(handleConfigure).toHaveBeenCalledWith('github');
  });

  it('does not show configure button when onConfigure is not provided', () => {
    render(
      <AccountIntegration
        integrations={[connectedItem]}
        onConnect={noop}
        onDisconnect={noop}
      />,
    );
    expect(screen.queryByRole('button', { name: /configure/i })).not.toBeInTheDocument();
  });

  it('displays last sync time for connected integration', () => {
    render(
      <AccountIntegration
        integrations={[connectedItem]}
        onConnect={noop}
        onDisconnect={noop}
      />,
    );
    expect(screen.getByText(/last sync: 2 minutes ago/i)).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    const withIcon: Integration = {
      ...disconnectedItem,
      icon: <span data-testid="slack-icon">S</span>,
    };
    render(
      <AccountIntegration
        integrations={[withIcon]}
        onConnect={noop}
        onDisconnect={noop}
      />,
    );
    expect(screen.getByTestId('slack-icon')).toBeInTheDocument();
  });

  it('displays description for each integration', () => {
    render(
      <AccountIntegration
        integrations={[connectedItem, disconnectedItem]}
        onConnect={noop}
        onDisconnect={noop}
      />,
    );
    expect(screen.getByText('Source control and repositories')).toBeInTheDocument();
    expect(screen.getByText('Team messaging and notifications')).toBeInTheDocument();
  });
});
