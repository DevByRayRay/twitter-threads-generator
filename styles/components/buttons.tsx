import styled from 'styled-components'

enum eButtonSize {
	normal = 'normal',
	small = 'small',
	big = 'big',
}
interface IButton {
	color: 'default' | 'action'
	size: eButtonSize
}

function buttonSize (size: eButtonSize) : string {
	let btnSize = ''

	switch (size) {
		case eButtonSize.small:
			btnSize = 'padding: 0.3rem 0.5rem;'
			break;
	
		case eButtonSize.big:
			btnSize = 'padding: 1rem 1.2rem;'
			break;
	
		default:
			btnSize = 'padding: 0.8rem 1rem;'
			break;
	}

	return btnSize
}

export const Button = styled.button<IButton>`
	display: inline-block;
	border-radius: 5px;
	text-decoration: none;
	transition: 0.5s ease-in-out;
	width: auto;

	${(props) => (!props.color || props.color === 'default' ? `color:var(--white);background: var(--grey);` : '')}
	${(props) => (props.color === 'action' ? `color:var(--white);background: var(--main-color);` : '')}
	
	${(props) => buttonSize(props?.size)}

	&:hover {
		background: var(--greyLight);
		color: #000;

		${(props) => (!props.color || props.color === 'default' ? `background: var(--greyLight); color:var(--black);` : '')}
		${(props) => (props.color === 'action' ? `background: var(--grey); color:var(--black);` : '')}
	}
`
export const LinkButton = styled.a<IButton>`
	background: var(--grey);
	display: inline-block;
	color: #fff;
	border-radius: 5px;
	text-decoration: none;
	transition: 0.5s ease-in-out;
	cursor: pointer;

	${(props) => (buttonSize(props?.size))}


	${(props) => (!props.color || props.color === 'default' ? `color:var(--white);background: var(--grey);` : '')}
	${(props) => (props.color === 'action' ? `color:var(--white);background: var(--sec-color);` : '')}

	&:hover {
		background: var(--greyLight);
		color: #000;
	}
`
export const LinkText = styled.a`
	padding: 0.3rem 0.5rem;
	display: inline-block;
	color: var(--sec-color);
	text-decoration: underline;
	transition: 0.5s ease-in-out;
	cursor: pointer;

	&:hover {
		text-decoration: none;
	}
`

export const ButtonWrapper = styled.div`
	padding-top: 2rem;
	display: flex;
	justify-content: space-between;
`
