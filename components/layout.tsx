import styled from 'styled-components'
import Head from 'next/head'
import { Footer } from 'styles/styled'
const LayoutEl = styled.div`
	background: #fff;
	min-height: calc(100vh - 1rem);
	height: 100%;
	box-sizing: border-box;
	padding-bottom: 82px;
	position: relative;
`

const Layout = (props) => {
	return (
		<LayoutEl>
			<Head>
				<title>Social Uniqorn</title>
				<meta property='og:title' content='Social Uniqorn' key='title' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest' />
				<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
				<meta name='msapplication-TileColor' content='#ffffff'></meta>
				<meta name='theme-color' content='#ffffff'></meta>
			</Head>
				{props.children}
				<Footer />
		</LayoutEl>
	)
}

export default Layout
