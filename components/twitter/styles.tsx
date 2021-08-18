import styled from 'styled-components'
import { mediaQueries } from 'styles/components/breakpoints'
import { iSendingState, sendState } from './types'

export const StatusMessage = styled.div<iSendingState>`
	display: inline-block;
	color: #fff;
	${(props) => {
		if (props.state === sendState.sending) {
			return 'background-color: orange;'
		}
		if (props.state === sendState.recieved) {
			return 'background-color: green;'
		}
		if (props.state === sendState.error) {
			return 'background-color: red;'
		}
	}};
`

export const SendStatus = (props: iSendingState) => {
	switch (props.state) {
		case 'sending':
			return <StatusMessage>Sending</StatusMessage>
			break
		case 'recieved':
			return <StatusMessage>Recieved</StatusMessage>
			break
		case 'error':
			return <StatusMessage>Error</StatusMessage>
			break

		default:
			return <span></span>
			break
	}
}

export const AppContainer = styled.div`
	display: flex;
	max-width: var(--max-width);
	flex-direction: column;
	padding-top: 1rem;
	margin: 0 auto;
`

export const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;
	padding: 0 2rem;

	${() => mediaQueries('lg')(`padding: 0;`)}

	&.column--input {
		textarea {
			height: 500px;
		}
	}
`
export const UserWarning = styled.div`
	color: var(--redDark);
	display: flex;
	justify-content: center;
`
export const UserWarningContent = styled.div`
	max-width: 768px;
	text-align: center;
`

export const TweetImageContainer = styled.div`
	margin: 0 auto;
	display: grid;
	grid-template-columns: 500px 500px;
	gap: 1rem;

	> canvas {
		width: 500px;
		height: 500px;
		background-color: grey;
	}
`

export const TweetImage = styled.div`
	margin: 0 auto;
	height: 500px;
	max-width: 500px;
	padding: 1rem 2rem;
	background: blue;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;

	> div {
		text-align: center;
		font-size: 2rem
	}


`