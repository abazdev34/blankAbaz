import React from 'react';

const Button = ({ children, variant = 'default', className = '', ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    default: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    outlined: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    contained: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Select = React.forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <select
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';
const Input = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

const List = ({ children, className = '', ...props }) => {
  return (
    <ul className={`space-y-1 ${className}`} {...props}>
      {children}
    </ul>
  );
};

const ListItem = ({ children, className = '', ...props }) => {
  return (
    <li className={`${className}`} {...props}>
      {children}
    </li>
  );
};

const Typography = ({ variant = 'body1', children, className = '', ...props }) => {
  const variantStyles = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'text-base font-bold',
    body1: 'text-base',
    body2: 'text-sm',
  };

  const Component = variant.startsWith('h') ? variant : 'p';

  return (
    <Component className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
};

// Export all components
export { Button, Input, List, ListItem, Typography, Select };