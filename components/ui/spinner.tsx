'use client';

import type React from 'react';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary' | 'muted';
}

const Spinner = ({
  className,
  size = 'md',
  variant = 'primary',
  ...props
}: SpinnerProps) => {
  const { theme = 'system' } = useTheme();

  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };

  const variantClasses = {
    default: 'border-foreground/20 border-t-foreground',
    primary: 'border-primary/20 border-t-primary',
    secondary: 'border-secondary/20 border-t-secondary',
    muted: 'border-muted/20 border-t-muted-foreground'
  };

  return (
    <div
      className={cn(
        'spinner animate-spin rounded-full border-solid',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      data-theme={theme}
      {...props}
    />
  );
};

export { Spinner };
