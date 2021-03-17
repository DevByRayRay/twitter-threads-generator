import styled from 'styled-components'
import Layout from './layout'
import PageHeader from './page-header'
import { Container, Footer, LinkButton } from 'styles/styled'
import React from 'react'
import { Figure } from 'styles/components/media'
import { mediaQueries } from 'styles/components/breakpoints'


export const Row = styled.div`
	padding: 0 2rem;
	&.content {
		display: flex;
		align-items: center;
	}
`
export const Columns = styled.div`
	padding-top: 2rem;
	display: grid;
	/* grid-template-columns: 2fr 3fr; */
	gap: 2rem;

	/* ${() => mediaQueries('sm')(`grid-template-columns: 1fr;`)} */
	${() => mediaQueries('sm')(`grid-template-columns: 2fr 3fr;`)}
`

export const Content = styled.div`
	h2 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}
	h3 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	p {
		font-size: 1.5em;
		margin-bottom: 4rem;
	}
`

const HomePage = ({ user = null }) => {
	console.log('HomePage')
	return (
		<Layout>
			<Container>
				<PageHeader user={user} margin={true} padding={true}></PageHeader>
				<Columns>
					<Row className='content'>
						<Content>
							<h2>
								Express yourself with <br /> Twitter Threads
							</h2>
							<p>
								Turn your content into Twitter Threads automatically! Simply, copy-past and send the
								Twitter Thread via us.
							</p>
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
