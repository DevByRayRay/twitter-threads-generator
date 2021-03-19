import styled from 'styled-components'
const FormRow = styled.div`
	display: grid;
	grid-template-columns: 150px 1fr;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid var(--greyLight);
	padding: 0.8rem 0;

	*:not(img) {
		display: block;
		height: 100%;
	}
`

export default FormRow
