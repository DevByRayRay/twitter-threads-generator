import styled from 'styled-components'
const LayoutEl = styled.div`
	background: #fff;
	min-height: calc(100vh - 1rem);
`

const Layout = (props) => {
	return (
		<LayoutEl>
			<LayoutEl>{props.children}</LayoutEl>
		</LayoutEl>
	)
}

export default Layout
