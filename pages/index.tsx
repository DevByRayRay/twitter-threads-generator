import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { useState, useEffect } from 'react';
import styled from 'styled-components'

import { sendTweetRequest, setUserToken, getUserToken, textToTweets } from '../lib/twitter.service'

const PageHeader = styled.header`
	display: grid;
	width: 100%;
	height: 80px;
	grid-template-columns: 300px 1fr 300px;
	align-items: center;
	padding: 1rem;
	box-sizing: border-box;
	color: #fff;
	margin-bottom: 1rem;
	border-bottom: 1px solid #fff;
`

const H1 = styled.h1`
	margin: 0;
`

const HeaderRight = styled.div`
	display: flex;
	justify-content: flex-end;
`

const Avatar = styled.img`
	width: 48px;
	height: 48px;
	overflow: hidden;
	border-radius: 50%;
	margin-right: 1rem;
`

const HeaderUser = styled.div`
	width: 300px;
	display: flex;
	align-items: center;
`
const HeaderUsername = styled.div``
const HeaderName = styled.div``

const DEFAULT_TWEET = `# 5 Development Retrospective Questions to Have Great Discussions
1️⃣What Were Our Strengths?
I’ve seen it a lot! Doing a proper retrospective is not all about discovering the negative things — or rather what can be improved.

Let’s focus a part of the retrospective on the things we did well!
That will make sure everyone feels empowered right away.
If you throw this question to your team, you will find that everyone has a different view of what went well.

2️⃣ What Were Our Biggest Obstacles?
It’s also good to talk about the sprint’s obstacles.
In this case, I don’t mean what we did wrong as a team! I mean, what happened that the team didn’t know before? You know, unexpected things.

Sometimes, production issues pop up out of nowhere.
My team and I experienced that last week! It was a disaster, but it was only because the users started using new features we just introduced.

So the lesson was to prepare some time to stay on standby if new features go into production.
But sometimes, the obstacles come from outside the team. It’s important to talk about that with each other.

3️⃣How Can We Improve Our Code Quality?
For most developers, code quality is a serious thing.
But instead of checking what kind of ugly code we have in our applications, we should think about how we can improve the code.

Yes, you probably have tools and systems in place.
But I know for sure you and your team can come up with some very simple improvements — things that don’t cost a lot of time.

That’s why I think it’s a good idea to spend some time during one of your retrospective meetings on code quality. We all want to write readable code in our applications.

4️⃣Who Helped You During This Sprint?
Let’s spend some time on the human part of the development team. We are developers (sorry if you’re not, but you’re probably working with some) who focus on the technical aspect of our job.

Being a developer in a team is so much more than only the technical part. We have to collaborate and communicate with each other.

Spending time to offer some appreciation to one of your team members can be useful for team bonding. Just say that it felt incredible when a teammate helped you out with a difficult task.

Everyone needs a compliment — no matter how good you are as a developer. It will brighten someone’s day!

5️⃣How Can We Improve Our Retrospectives?
I think retrospectives are vital for a development team. And it is just as important for a team to determine how they can improve their retrospectives.

There are many approaches available on the web:
- The Good, Bad & Ugly
- Liked — Learned — Lacked — Longed For
- One-Word Exercise
- KALM

I like one where the Scrum leader selects a few questions to bring to the team to discuss. Document this. It’s always good to look back at what you have discussed with the team.

6️⃣Conclusion
I hope this article will help you and your team have better retrospectives. When a retrospective has the right ingredients and the proper discussions, we grow as a team.

👉Read my post here: https://betterprogramming.pub/5-development-retrospective-questions-to-have-great-discussions-aa77f96cf793
`

const Index = ({ FUNCTIONS_BASE_URL }) => {
	const { user, error, isLoading } = useUser()

	const [send, setSend] = useState<boolean | null>()
	const [renderedTweets, setRenderedTweets] = useState([])
	const [postedTweets, setPostedTweets] = useState<any[]>([])
	const [tweet, setTweet] = useState(DEFAULT_TWEET)

  useEffect(() => {
    generateTweets()
  }, [])

	// Event for updating the tweet state
	const onChangeTweet = (event) => {
		console.log('ev: ', event.target.value)
		setTweet(event.target.value)
	}

	// Event for sending tweets
	function sendTweet() {
		console.log('tweet: ', tweet)

		const tokens = getUserToken()

		sendTweetRequest(FUNCTIONS_BASE_URL, tokens, tweet)
			.then((tweetsArr) => {
				setSend(true)
				setPostedTweets(tweetsArr)
			})
			.catch((error) => {
				console.error('Didnt send!')
				setSend(false)
			})
	}

	function generateTweets() {
		const tweets = textToTweets(tweet)
    setRenderedTweets(tweets)
		console.log('tweets: ', tweets)
	}

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>

	if (user) {
		const { sub, name, nickname, picture, updated_at } = user

		if (localStorage) {
			setUserToken(FUNCTIONS_BASE_URL, sub)
				.then((data) => {
					console.log('user: ', data)
					localStorage.setItem('twitterThreadsToken', JSON.stringify(data))
				})
				.catch((err) => console.log('error getUser: ', err))
		}

		return (
			<div className="page">
				<Head>
					<title>Social Uniqorn</title>
					<meta property='og:title' content='Social Uniqorn' key='title' />
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				</Head>
					<PageHeader>
						<HeaderUser>
							<Avatar src={picture} loading='lazy' />
							<HeaderUsername>Welcome {name.substr(0, 13)}</HeaderUsername>
						</HeaderUser>

						<HeaderName className='header'>
							<H1>Social Uniqorn</H1>
						</HeaderName>
						<HeaderRight>
							<a href='/api/auth/logout'>Logout</a>
						</HeaderRight>
					</PageHeader>

					<div className='container'>
						<div className='column column--input'>
							{/* <textarea name="inputText" id="inputText" cols="" rows="" className="input"></textarea> */}
							<textarea onChange={onChangeTweet} value={tweet} className='text input'></textarea>
							<footer className='footer'>
								<button id='generate' onClick={generateTweets}>
									Generate Thread
								</button>
							</footer>
						</div>
						<div className='column column--output'>
							<div id='output'>
                {renderedTweets && renderedTweets.map((item, index) => {
                  return (
                    <div key={index} className="tweet">
                      <Avatar src={picture} loading='lazy' />
                      <div className="tweet__content">{item}</div>
                    </div>
                  )
                })}
              </div>
							<footer className="footer">
                <button id='generate' onClick={sendTweet}>
                  Send Thread
                </button>
              </footer>
							
						</div>

            <footer className='footer'>
								Build by{' '}
								<a href='https://byrayray.dev' target='_blank' title='DevByRayRay'>
									DevByRayRay
								</a>{' '}
								| <span id='date'></span>
							</footer>
					</div>

					<p>{send === true && <strong>Posted tweets!</strong>}</p>
					<p>{send === false && <em>Didn;t send</em>}</p>
			</div>
		)
	}

	return <a href='/api/auth/login'>Login</a>
}

export async function getStaticProps() {
	const { FUNCTIONS_BASE_URL } = process.env
	return {
		props: {
			FUNCTIONS_BASE_URL,
		},
	}
}

export default Index
