import Layout from '../../layout'
import PageHeader from '../../layout/header'
import { Container, LinkButton } from 'styles/styled'
import React from 'react'
import { Figure } from 'styles/components/media'
import { clearUserToken } from 'lib/twitter.service'
import { Columns, Content, Row } from './styles'
import { useEffect } from 'react'

const content = {
	title: `Save time while turning your content into Twitter Threads`,
	firstLine: `Spend your time on creating valuable content! Save hours!`,
	secondLine: `Copy-paste your content, and send a Twitter Thread automatically`,
}

const HomePage = ({ user = null }) => {
	console.log('HomePage')

	useEffect(() => {
		if (!user) {
			clearUserToken()
		}
	}, [])

	return (
		<Layout>
			<Container>
				<PageHeader margin={true} padding={true}></PageHeader>
				<Columns>
					<Row className='content'>
						<Content>
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
					<Row>
						<Figure>
							<img
								src={
									'https://res.cloudinary.com/raymons/image/upload/c_scale,f_auto,q_100,w_700/v1615747541/socialuniqorn/social-uniqorn-screenshot-2.png'
								}
								loading='lazy'
							/>
						</Figure>
					</Row>
				</Columns>
			</Container>
		</Layout>
	)
}

export default HomePage
