import React from 'react'
import Web3ModalSetup from './helpers/Web3ModalSetup'
import VoxelDogLoader from '../components/voxel-dog'
import dynamic from 'next/dynamic'
import Section from '../components/section'
import ethers from 'ethers'


const LazyVoxelDog = dynamic(() => import('../components/voxel-dog'), {
  ssr: false,
  loading: () => <VoxelDogLoader />
})

const Sign = () => {
  const web3modal = Web3ModalSetup()
  const login = async () => {
    const connection = await web3modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
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

export default Sign
