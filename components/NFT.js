import React from 'react'
import { MoralisProvider } from 'react-moralis'

const APP_ID = 'BN388DeoLmMyPKnixJ1qNx7OTcYlEqIUf0O3r510'
const SERVER_URL = 'https://5pqard34udvk.usemoralis.com:2053/server'

const NFT = ({ children }) => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false

  if (!APP_ID || !SERVER_URL) throw new Error('Missing APP and SERVER')
  if (isServerInfo)
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        {children}
      </MoralisProvider>
    )
}

export default NFT
