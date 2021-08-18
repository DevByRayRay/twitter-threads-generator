import { getUserToken, sendTweetRequest, textToTweets, setUserToken, TToken } from 'lib/twitter.service'
import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import PageHeader from '../layout/header'
import { Container } from 'styles/styled'
import TwitterApp from './twitter'

const TwitterContainer = () => {
	return (
    <Layout>
      <Container>
        <PageHeader padding={true}></PageHeader>
        <TwitterApp></TwitterApp>
      </Container>
    </Layout>
  )
}

export default TwitterContainer
