import { Button as ButtonPrimitive, ButtonRootProps } from '@kobalte/core/button'
import { PolymorphicProps } from '@kobalte/core/polymorphic'
import { Component, splitProps, ValidComponent } from 'solid-js'
import { tv } from 'tailwind-variants'

const buttonVariants = tv({
  base:
    'inline-flex cursor-pointer items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-80 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'rounded-lg px-4 py-2 text-lg',
    },
    active: {
      true: 'opacity-80',
      false: 'opacity-100',
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'rounded-md px-[12px] py-[6px]',
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
})

export type ButtonProps<T extends ValidComponent = 'button'> = PolymorphicProps<T, ButtonRootProps> & {
  variant?: 'primary' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  active?: boolean
  class?: string
}

const Button: Component<ButtonProps> = (props) => {
  const [, rest] = splitProps(props, ['variant', 'size', 'class'])
  return (
    <ButtonPrimitive
      class={buttonVariants({
        variant: props.variant,
        size: props.size,
        active: props.active,
        class: props.class,
      })}
      {...rest}
    />
  )
}

export { Button, buttonVariants }
