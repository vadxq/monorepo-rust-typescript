import { Component, JSX, splitProps } from 'solid-js'

interface Props extends JSX.HTMLAttributes<HTMLButtonElement> { }

export const Button: Component<Props> = (props) => {
	const [local, other] = splitProps(props, ['children'])
	return (
		<button
			style={{
				padding: '.5rem 1rem',
			}}
			{...other}
		>
			{local.children}
		</button>
	)
}
