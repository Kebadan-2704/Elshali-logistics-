import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export default function FormField({
  id,
  label,
  icon,
  required = false,
  error,
  className = '',
  children,
}: FormFieldProps) {
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id} className="form-label">
        {label} {required && '*'}
      </label>
      <div className="form-input-wrap">
        {icon && <span className="form-input-icon">{icon}</span>}
        {children}
      </div>
      {error && (
        <span style={{ color: '#f87171', fontSize: '12px', marginTop: '4px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
}

