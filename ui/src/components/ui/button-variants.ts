import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold tracking-wide uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background border-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border-foreground/20 bg-primary text-primary-foreground shadow-[2px_2px_0_hsl(var(--foreground)/0.2)] hover:shadow-[1px_1px_0_hsl(var(--foreground)/0.2)] hover:translate-x-[0.5px] hover:translate-y-[0.5px]',
        secondary:
          'border-foreground/15 bg-secondary text-secondary-foreground shadow-[2px_2px_0_hsl(var(--foreground)/0.1)] hover:shadow-[1px_1px_0_hsl(var(--foreground)/0.1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px]',
        outline:
          'border-border bg-background text-foreground shadow-[2px_2px_0_hsl(var(--border))] hover:bg-muted hover:shadow-[1px_1px_0_hsl(var(--border))] hover:translate-x-[0.5px] hover:translate-y-[0.5px]',
        ghost:
          'border-transparent shadow-none hover:bg-muted hover:text-foreground',
        link: 'border-transparent shadow-none text-primary underline-offset-4 hover:underline',
        destructive:
          'border-foreground/20 bg-destructive text-destructive-foreground shadow-[2px_2px_0_hsl(var(--foreground)/0.2)] hover:shadow-[1px_1px_0_hsl(var(--foreground)/0.2)] hover:translate-x-[0.5px] hover:translate-y-[0.5px]',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
