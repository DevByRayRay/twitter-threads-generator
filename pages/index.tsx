import { useUser } from '@auth0/nextjs-auth0'
import Layout from '@components/layout'
import PageHeader from '@components/layout/header'
import { BackgroundImage, Columns, Content, FeatureItem, FeaturesList, Row } from '@components/pages/home/styles'
import TwitterApp from '@components/twitter/twitter'
import { Container } from '@styles/components/layout'
import { LinkButton } from '@styles/styled'
import React, { useEffect } from 'react'

const Index = ({ FUNCTIONS_BASE_URL, content }) => {
	return (
		<Layout>
			<Container>
				<PageHeader margin={true} padding={true}></PageHeader>
				<Row fullWith={true}>
					<Content contentWidth={'800px'} textAlign={'center'}>
						<h2 dangerouslySetInnerHTML={{ __html: content.title }} />
						<p dangerouslySetInnerHTML={{ __html: content.firstLine }} />
						<p dangerouslySetInnerHTML={{ __html: content.secondLine }} />

						<p>
							<LinkButton color={'action'} href='/api/auth/login'>
								Login with Twitter
							</LinkButton>

							<br />
							<em>Try it out, It's free 🚀</em>
						</p>
					</Content>
				</Row>
				<Row fullWith={true}>
					<Content textAlign={'center'}>
						<FeaturesList>
							<FeatureItem>
								<img src='/time-illustration.svg' width='300' />
								<strong>Create threads in seconds</strong>
							</FeatureItem>
							<FeatureItem>
								<img src='/factory-illustration.svg' width='300' />
								<strong>You type, we generate the thread</strong>
							</FeatureItem>
							<FeatureItem>
								<img src='/copy-illustration.svg' width='300' />
								<strong>Copy and paste from anywhere</strong>
							</FeatureItem>
							<FeatureItem>
								<img src='/engagement-illustation.svg' width='300' />
								<strong>Get more engagement with Twitter Threads</strong>
							</FeatureItem>
							<FeatureItem>
								<img src='/gift-illustration.svg' width='300' />
								<strong>Free to use! (we don't add anything to your tweets 🤗)</strong>
							</FeatureItem>
						</FeaturesList>
					</Content>
				</Row>
				<Row fullWith={true} columns={2}>
					<Content>
						<TwitterApp FUNCTIONS_BASE_URL={FUNCTIONS_BASE_URL} user={null}></TwitterApp>
					</Content>
				</Row>
			</Container>
		</Layout>
	)
}

export async function getStaticProps() {
	const { FUNCTIONS_BASE_URL } = process.env

	const content = {
		title: `Save time creating Twitter Threads`,
		firstLine: `Spend your time on creating valuable content! Save hours!`,
		secondLine: `Copy-paste your content, and send a Twitter Thread automatically`,
	}

	return {
		props: {
			FUNCTIONS_BASE_URL,
			content,
		},
	}
}

export default Index
