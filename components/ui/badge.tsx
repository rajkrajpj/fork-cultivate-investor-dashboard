import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-blue-600 text-primary-foreground hover:bg-blue-600/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        // Investment status variants
        'funds-received':
          'border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
        invested:
          'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200',
        voided:
          'border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200',
        pending:
          'border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200',
        withdrawn:
          'border-transparent bg-red-100 text-red-800 hover:bg-red-200',
        distributed:
          'border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
