import styled from 'styled-components'
const Input = styled.input<HTMLInputElement>`
	padding: 0.8rem 0.8rem;
	min-width: 300px;
	outline: 0;
	border: 1px solid var(--greyLight);
	border-radius: 8px;

	&:focus {
		border: 1px solid var(--sec-color);
	}
`

export default Input
