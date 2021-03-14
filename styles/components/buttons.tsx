import styled from 'styled-components'

interface IButton {
	color: 'default' | 'action'
}

export const Button = styled.button<IButton>`
	padding: 0.8rem 1rem;
	display: inline-block;
	border-radius: 5px;
	height: 50px;
	text-decoration: none;
	transition: 0.5s ease-in-out;

	${(props) => (!props.color || props.color === 'default' ? `color:var(--white);background: var(--grey);` : '')}
	${(props) => (props.color === 'action' ? `color:var(--white);background: var(--main-color);` : '')}

	&:hover {
		background: var(--greyLight);
		color: #000;

		${(props) =>
			!props.color || props.color === 'default' ? `background: var(--greyLight); color:var(--black);` : ''}
		${(props) => (props.color === 'action' ? `background: var(--grey); color:var(--black);` : '')}
	}
`
export const LinkButton = styled.a<IButton>`
	background: var(--grey);
	padding: 0.8rem 1rem;
	display: inline-block;
	color: #fff;
	border-radius: 5px;
	height: 50px;
	text-decoration: none;
	transition: 0.5s ease-in-out;

	${(props) => (!props.color || props.color === 'default' ? `color:var(--white);background: var(--grey);` : '')}
	${(props) => (props.color === 'action' ? `color:var(--white);background: var(--sec-color);` : '')}

	&:hover {
		background: var(--greyLight);
		color: #000;
	}
`
