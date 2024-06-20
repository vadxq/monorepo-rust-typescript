import type { Component, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { cnBase, tv } from 'tailwind-variants'

const cardVariants = tv({
  base: 'rounded-lg border bg-card text-card-foreground shadow-sm',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'rounded-lg px-4 py-2 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

interface CardProps extends ComponentProps<'div'> {
  size?: 'sm' | 'md' | 'lg'
}

const Card: Component<CardProps> = (props) => {
  const [, rest] = splitProps(props, ['size', 'class'])
  return (
    <div
      class={cardVariants({
        size: props.size,
        class: props.class,
      })}
      {...rest}
    />
  )
}

const CardHeader: Component<ComponentProps<'div'>> = (props) => {
  const [local, rest] = splitProps(props, ['class'])
  return <div class={cnBase('flex flex-col space-y-1.5 p-6', local.class)} {...rest} />
}

const CardTitle: Component<ComponentProps<'h3'>> = (props) => {
  const [local, rest] = splitProps(props, ['class'])
  return <h3 class={cnBase('text-lg font-semibold leading-none tracking-tight', local.class)} {...rest} />
}

const CardDescription: Component<ComponentProps<'p'>> = (props) => {
  const [local, rest] = splitProps(props, ['class'])
  return <p class={cnBase('text-sm text-muted-foreground', local.class)} {...rest} />
}

const CardContent: Component<ComponentProps<'div'>> = (props) => {
  const [local, rest] = splitProps(props, ['class'])
  return <div class={cnBase('p-6 pt-0', local.class)} {...rest} />
}

const CardFooter: Component<ComponentProps<'div'>> = (props) => {
  const [local, rest] = splitProps(props, ['class'])
  return <div class={cnBase('flex items-center p-6 pt-0', local.class)} {...rest} />
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
