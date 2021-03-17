import styled from 'styled-components'

const Input = styled.input<HTMLInputElement>`
	padding: 0.8rem 0.8rem;
	min-width: 300px;
	outline: 0;
	border: 1px solid var(--greyDarken);
	border-radius: 8px;
	background: var(--greyLighter);

	&:focus {
		border: 1px solid var(--sec-color);
	}

	&:disabled,
	&:read-only {
		background: var(--grey);
		color: var(--white);
		border-color: var(--greyDarken);
	}


`

export default Input
