import { Avatar } from '@components/user/styles'
import { Button } from '@styles/styled'
import { TiRefresh } from "react-icons/ti";
import React, { useEffect, useState } from 'react'
import { Tweet } from './styles'
import TweetImageComponent from './tweet-image'
import styled from 'styled-components';

export interface iTweet {
	user: any
	item: string
}

const TweetLastCol = styled.div`
    display: grid;
    grid-template-columns: 300px;
    gap: 0.5rem;
    grid-template-rows: 1fr auto;
`



const TweetComponent = (props: iTweet) => {
	const { user, item } = props

	const [tweetText, setTweetText] = useState<string>('')
	const [toggleImage, setToggleImage] = useState<boolean>(true)

	const toggle = () => {
		setToggleImage(!toggleImage)
	}
	
	useEffect(() => {
		if (tweetText.toString() !== item.toString()) {
			setTweetText(item)
		}
	})


	useEffect(() => {
		if (tweetText) {
			setTimeout(() => {
				setToggleImage(!toggleImage)
			}, 1000)
		}
	}, [tweetText])

	useEffect(() => {
		if (!toggleImage) {
			setTimeout(() => {
				setToggleImage(!toggleImage)
			}, 1)
		}
	}, [toggleImage])

	return (
		<Tweet>
			<Avatar src={user?.picture ?? null} loading='lazy' />
			<div className='tweet__content'>{item}</div>
			<TweetLastCol>
				{toggleImage && <TweetImageComponent tweetContent={item} />}
			</TweetLastCol>
		</Tweet>
	)
}

export default TweetComponent
