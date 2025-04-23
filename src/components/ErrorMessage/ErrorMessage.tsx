import React from 'react';

interface ErrorMessageProps {
  error: string | Error;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  className = '',
}) => {
  const errorText = error instanceof Error ? error.message : error;

  return (
    <div className={`error-message ${className}`} role="alert">
      <div className="error-message__content">
        <svg
          className="error-message__icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="error-message__text">{errorText}</p>
      </div>
    </div>
  );
};
