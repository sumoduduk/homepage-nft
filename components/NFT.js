import React from 'react'
import { MoralisProvider } from 'react-moralis'
import { RecoilRoot } from 'recoil'

// const APP_ID = process.env.NEXT_PUBLIC_APPID
// const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

const NFT = ({ children }) => {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APPID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    >
      <RecoilRoot>{children}</RecoilRoot>
    </MoralisProvider>
  )
}

export default NFT
