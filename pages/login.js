import { useMoralis } from 'react-moralis'
import {
  Box,
  Button,
  Container,
  useColorModeValue,
  Flex,
  Heading
} from '@chakra-ui/react'
import Sidebar from '../components/layouts/SideBar'
// import router from 'next/router'
import Layout from '../components/layouts/article'
import VoxelDogLoader from '../components/voxel-dog'
import dynamic from 'next/dynamic'
import Section from '../components/section'

const LazyVoxelDog = dynamic(() => import('../components/voxel-dog'), {
  ssr: false,
  loading: () => <VoxelDogLoader />
})

const Login = () => {
  const { authenticate, isAuthenticated, account, chainId } = useMoralis()

  if (!isAuthenticated) {
    return (
      <Section>
        <Container maxW="full" align="center" justify="center">
          <Box>
            <Box m={12}>
              <LazyVoxelDog />
            </Box>
            <Button
              className="shadow-lg shadow-cyan-500/50 "
              bg={useColorModeValue('#088B97', '#C9DFE1')}
              fontSize={20}
              fontWeight="bold"
              mb={8}
              color={useColorModeValue('#C9DADC', '#1B383B')}
              rounded="md"
              onClick={() => authenticate()}
            >
              SIGN IN
            </Button>
          </Box>
        </Container>
      </Section>
    )
  }
  return (
    <Layout title="Dashboard">
      <Flex>
        <Sidebar _account={account} _chain={chainId} />
        <Heading>Hello</Heading>
      </Flex>
    </Layout>
  )
}

export default Login
export { getServerSideProps } from '../components/chakra'
