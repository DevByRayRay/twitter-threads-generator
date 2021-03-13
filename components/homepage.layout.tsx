import styled from 'styled-components'
import Layout from './layout'
import PageHeader from './page-header'
import { Footer } from 'styles/styled'
import React from 'react'
import { Figure } from 'styles/components/media'

export const Container = styled.div`
	margin: 0 auto;
	max-width: 960px;
	display: flex;
	flex-direction: column;
`
export const Row = styled.div`
	text-align: center;
`

export const Content = styled.div`
	h2 {
		font-size: 4.5rem;
		margin-bottom: 1rem;
	}
	h3 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	p {
		font-size: 2rem;
		margin-bottom: 4rem;
	}
`

const HomePage = () => {
    console.log('HomePage')
	return (
		<Layout>
			<Container>
				<PageHeader></PageHeader>
				<Row>
					<Content>
						<h2>
							Express yourself with <br /> Twitter Threads
						</h2>
						<p>
							Turn your content into Twitter Threads automatically! <br />
							Simply, copy-past and send the Twitter Thread via us.
						</p>
					</Content>
				</Row>
				<Row>
					<Figure>
						<img src={'/images/social-uniqorn-screenshot.png'} loading='lazy' />
					</Figure>
				</Row>
			</Container>
		</Layout>
	)
}

export default HomePage
