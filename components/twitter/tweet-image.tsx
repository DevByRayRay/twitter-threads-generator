import { Button } from '@styles/styled'
import html2canvas from 'html2canvas'
import React, { useEffect, useRef, useState } from 'react'
import { TweetImage, TweetImageCanvas, TweetImageContainer } from './styles'
import { TiRefresh, TiDownload } from 'react-icons/ti';

export interface iTweetImageComp {
	tweetContent: string
}

const TweetImageComponent = (props: iTweetImageComp) => {
	const [download, setDownload] = useState<string>('')

	const imageCanvas = useRef()
	const imageContent = useRef()

	useEffect(() => {
		const canvasPlaceholder: HTMLElement = imageCanvas.current
		const tweetImageContent: HTMLElement = imageContent.current

		html2canvas(tweetImageContent).then(canvas => {
			canvasPlaceholder.innerHTML = null
			canvasPlaceholder.appendChild(canvas)
		})
	}, [])

	return (
		<div className='tweet-image'>
			{props?.tweetContent && (
				<>
					<TweetImageContainer>
						<TweetImage ref={imageContent}>
							<div>{props?.tweetContent}</div>
						</TweetImage>
						<TweetImageCanvas className='tweet-image__canvas' ref={imageCanvas}></TweetImageCanvas>
					</TweetImageContainer>
				</>
			)}
		</div>
	)
}

export default TweetImageComponent
