import styled from 'styled-components'
import Head from 'next/head'
import { Footer } from 'styles/styled'
import { GlobalStyle } from '../../styles/styled'
import { useEffect, useState } from 'react'

const LayoutEl = styled.div`
	background: #fff;
	min-height: calc(100vh - 1rem);
	height: 100%;
	box-sizing: border-box;
	padding-bottom: 82px;
	position: relative;
`

const Layout = (props) => {
	const [domain, setDomain] = useState('')

	useEffect(() => {
		setDomain(location.hostname)
	}, [domain])

	const isRemote = () => domain === "socialuniqorn.com"

	return (
        <LayoutEl>
			<GlobalStyle />
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
				<meta name='theme-color' content={'#ffffff'}></meta>
			</Head>
			{props.children}
			<Footer />
			{isRemote() && (
			<script src='//code.tidio.co/x3xzikw37k2efopeyhcrw2tfspb9sff0.js' async></script>
			)}
		</LayoutEl>
    );
}

export default Layout
