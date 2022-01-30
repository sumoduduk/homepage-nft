import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { Box, Button, Container, useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
import router from 'next/router'
import Layout from '../components/layouts/article'
import VoxelDogLoader from '../components/voxel-dog'
import dynamic from 'next/dynamic'
import Section from '../components/section'

const LazyVoxelDog = dynamic(() => import('../components/voxel-dog'), {
  ssr: false,
  loading: () => <VoxelDogLoader />
})

const providerOptions = {
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

const Login = () => {
  const login = async () => {
    const init = new Web3Modal({ cacheProvider: false, providerOptions })

    const connection = await init.connect(
      ress => {
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const user = signer.getAddress(
          ress => {
            console.log(user)
          },
          err => {
            console.log('error', err)
          }
        )
      },
      err => {
        console.log('error', err)
      }
    )
    router.push('/Dashboard')
  }

  return (
    <Layout title="login">
      <Section>
        <Container maxW="full" align="center" justify="center">
          <Box>
            <Box m={12}>
              <LazyVoxelDog />
            </Box>
            <Button
              bg={useColorModeValue('#088B97', '#C9DFE1')}
              fontSize={20}
              fontWeight="bold"
              mb={8}
              color={useColorModeValue('#C9DADC', '#1B383B')}
              boxShadow="dark-lg"
              rounded="md"
              onClick={() => login()}
            >
              LOG IN
            </Button>
          </Box>
        </Container>
      </Section>
    </Layout>
  )
}

export default Login
export { getServerSideProps } from '../components/chakra'
