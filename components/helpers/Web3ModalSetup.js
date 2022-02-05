import React from 'react'
import Web3Modal from 'web3modal'

const Web3ModalSetup = () => {
  new Web3Modal({
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          // Mikko's test key - don't copy as your mileage may vary
          infuraId: 'BN388DeoLmMyPKnixJ1qNx7OTcYlEqIUf0O3r510'
        }
      },

      walletlink: {
        package: WalletLink, // Required
        options: {
          appName: 'My Awesome App', // Required
          rpc: 'https://speedy-nodes-nyc.moralis.io/6392f177bd4334ce5a07629e/eth/goerli',
          chainId: 5 // Optional. It defaults to 1 if not provided
        }
      },

      binancechainwallet: {
        package: true
      }
    }
  })
}

export default Web3ModalSetup
