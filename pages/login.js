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

    const connection = await init.connect()

    const provider = new ethers.providers.Web3Provider(connection)
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
              className="shadow-xl shadow-cyan-500/50 font-mono font-semibold"
              bg={useColorModeValue('#088B97', '#C9DFE1')}
              mb={8}
              color={useColorModeValue('#C9DADC', '#005B97')}
              rounded="md"
              _hover={{
                bgGradient: 'linear(to-r, teal.500, green.500)'
              }}
              fontSize={26}
              size="lg"
              onClick={() => login()}
            >
              SIGN IN
            </Button>
          </Box>
        </Container>
      </Section>
    </Layout>
  )
}

export default Login
export { getServerSideProps } from '../components/chakra'
