import { render, screen, fireEvent } from '@testing-library/react';
import { UserDropdown } from './UserDropdown';
import type { UserDropdownUser, UserDropdownMenuItem } from './UserDropdown';

const defaultUser: UserDropdownUser = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  avatar: 'https://example.com/avatar.jpg',
  role: 'Admin',
  status: 'online',
};

const menuItems: UserDropdownMenuItem[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' },
  { id: 'delete', label: 'Delete Account', danger: true },
];

describe('UserDropdown', () => {
  it('renders the avatar image', () => {
    render(<UserDropdown user={defaultUser} />);
    const img = screen.getByAltText('Jane Doe');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', defaultUser.avatar);
  });

  it('renders initials when no avatar is provided', () => {
    const user = { name: 'John Smith', email: 'john@example.com' };
    render(<UserDropdown user={user} />);
    expect(screen.getByText('JS')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    render(<UserDropdown user={defaultUser} />);
    fireEvent.click(screen.getByLabelText('User menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('shows user name and email in dropdown', () => {
    render(<UserDropdown user={defaultUser} />);
    fireEvent.click(screen.getByLabelText('User menu'));
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('shows role badge when role is provided', () => {
    render(<UserDropdown user={defaultUser} />);
    fireEvent.click(screen.getByLabelText('User menu'));
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('renders status dot with correct class', () => {
    const { container } = render(<UserDropdown user={defaultUser} />);
    const dot = container.querySelector('.user-dropdown-status');
    expect(dot).toHaveClass('user-dropdown-status--online');
  });

  it('renders offline status dot', () => {
    const user = { ...defaultUser, status: 'offline' as const };
    const { container } = render(<UserDropdown user={user} />);
    const dot = container.querySelector('.user-dropdown-status');
    expect(dot).toHaveClass('user-dropdown-status--offline');
  });

  it('renders away status dot', () => {
    const user = { ...defaultUser, status: 'away' as const };
    const { container } = render(<UserDropdown user={user} />);
    const dot = container.querySelector('.user-dropdown-status');
    expect(dot).toHaveClass('user-dropdown-status--away');
  });

  it('calls onMenuAction when menu item is clicked', () => {
    const onMenuAction = vi.fn();
    render(
      <UserDropdown user={defaultUser} menuItems={menuItems} onMenuAction={onMenuAction} />
    );
    fireEvent.click(screen.getByLabelText('User menu'));
    fireEvent.click(screen.getByText('Settings'));
    expect(onMenuAction).toHaveBeenCalledWith('settings');
  });

  it('calls onSignOut when Sign Out is clicked', () => {
    const onSignOut = vi.fn();
    render(<UserDropdown user={defaultUser} onSignOut={onSignOut} />);
    fireEvent.click(screen.getByLabelText('User menu'));
    fireEvent.click(screen.getByText('Sign Out'));
    expect(onSignOut).toHaveBeenCalledTimes(1);
  });

  it('closes dropdown on Escape key', () => {
    render(<UserDropdown user={defaultUser} />);
    fireEvent.click(screen.getByLabelText('User menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes dropdown on click outside', () => {
    render(
      <div>
        <span data-testid="outside">outside</span>
        <UserDropdown user={defaultUser} />
      </div>
    );
    fireEvent.click(screen.getByLabelText('User menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('sets aria-expanded correctly', () => {
    render(<UserDropdown user={defaultUser} />);
    const trigger = screen.getByLabelText('User menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});
