import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
}) => (
  <div className="empty-state">
    <div className="empty-state__content">
      <h3 className="empty-state__title title">{title}</h3>
      {description && <p className="empty-state__description">{description}</p>}
    </div>
    {action && <div className="empty-state__action">{action}</div>}
  </div>
);
