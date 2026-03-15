"use client";

import { useState, useRef, useEffect, type ReactNode } from 'react';
import './UserDropdown.css';

export interface UserDropdownUser {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  status?: 'online' | 'offline' | 'away';
}

export interface UserDropdownMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  danger?: boolean;
}

export interface UserDropdownProps {
  /** User info to display */
  user: UserDropdownUser;
  /** Menu items between user info and sign out */
  menuItems?: UserDropdownMenuItem[];
  /** Called when a menu item is clicked */
  onMenuAction?: (id: string) => void;
  /** Called when sign out is clicked */
  onSignOut?: () => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1]![0] ?? '' : '';
  return (first + last).toUpperCase();
}

export const UserDropdown = ({
  user,
  menuItems = [],
  onMenuAction,
  onSignOut,
}: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const initials = getInitials(user.name);
  const status = user.status ?? 'offline';

  return (
    <div className="user-dropdown" ref={containerRef}>
      <button
        className="user-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        aria-expanded={isOpen}
        type="button"
      >
        {user.avatar ? (
          <img className="user-dropdown-avatar" src={user.avatar} alt={user.name} />
        ) : (
          <span className="user-dropdown-avatar user-dropdown-avatar--initials">
            {initials}
          </span>
        )}
        <span className={`user-dropdown-status user-dropdown-status--${status}`} />
      </button>

      {isOpen && (
        <div className="user-dropdown-menu" role="menu">
          <div className="user-dropdown-header">
            {user.avatar ? (
              <img className="user-dropdown-header-avatar" src={user.avatar} alt={user.name} />
            ) : (
              <span className="user-dropdown-header-avatar user-dropdown-avatar--initials">
                {initials}
              </span>
            )}
            <div className="user-dropdown-header-info">
              <span className="user-dropdown-name">{user.name}</span>
              <span className="user-dropdown-email">{user.email}</span>
              {user.role && <span className="user-dropdown-role">{user.role}</span>}
            </div>
          </div>

          {menuItems.length > 0 && (
            <>
              <div className="user-dropdown-separator" role="separator" />
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`user-dropdown-item${item.danger ? ' user-dropdown-item--danger' : ''}`}
                  onClick={() => { onMenuAction?.(item.id); setIsOpen(false); }}
                  role="menuitem"
                  type="button"
                >
                  {item.icon && <span className="user-dropdown-item-icon">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              ))}
            </>
          )}

          <div className="user-dropdown-separator" role="separator" />
          <button
            className="user-dropdown-item user-dropdown-item--danger"
            onClick={() => { onSignOut?.(); setIsOpen(false); }}
            role="menuitem"
            type="button"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
