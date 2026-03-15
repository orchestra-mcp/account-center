import type { ReactNode } from 'react';
import './AccountIntegration.css';

export interface Integration {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Optional icon element */
  icon?: ReactNode;
  /** Short description of the integration */
  description: string;
  /** Whether the account is connected */
  connected: boolean;
  /** Connected user's display name */
  userName?: string;
  /** Last sync timestamp string */
  lastSync?: string;
}

export interface AccountIntegrationProps {
  /** List of integrations to display */
  integrations: Integration[];
  /** Called when user clicks connect */
  onConnect: (id: string) => void;
  /** Called when user clicks disconnect */
  onDisconnect: (id: string) => void;
  /** Optional configure callback; shows button when provided */
  onConfigure?: (id: string) => void;
}

export const AccountIntegration = ({
  integrations,
  onConnect,
  onDisconnect,
  onConfigure,
}: AccountIntegrationProps) => {
  return (
    <div className="account-integration">
      {integrations.map((item) => (
        <div key={item.id} className="account-integration__item">
          {item.icon && (
            <div className="account-integration__icon">{item.icon}</div>
          )}
          <div className="account-integration__info">
            <div className="account-integration__name">
              {item.name}
              {item.connected && (
                <span
                  className="account-integration__status"
                  data-testid={`status-${item.id}`}
                />
              )}
            </div>
            <div className="account-integration__description">
              {item.description}
            </div>
            {item.connected && item.userName && (
              <div className="account-integration__meta">
                {item.userName}
              </div>
            )}
            {item.connected && item.lastSync && (
              <div className="account-integration__meta">
                Last sync: {item.lastSync}
              </div>
            )}
          </div>
          <div className="account-integration__actions">
            {item.connected ? (
              <>
                {onConfigure && (
                  <button
                    type="button"
                    className="account-integration__btn account-integration__btn--configure"
                    onClick={() => onConfigure(item.id)}
                  >
                    Configure
                  </button>
                )}
                <button
                  type="button"
                  className="account-integration__btn account-integration__btn--disconnect"
                  onClick={() => onDisconnect(item.id)}
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                type="button"
                className="account-integration__btn account-integration__btn--connect"
                onClick={() => onConnect(item.id)}
              >
                Connect
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
