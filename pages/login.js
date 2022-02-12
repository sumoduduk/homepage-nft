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
  const {
    authenticate,
    isAuthenticated,
    hasAuthError,
    authError,
    isAuthUndefined
  } = useMoralis()

  if (!isAuthenticated || hasAuthError || authError || isAuthUndefined) {
    return (
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
    )
  }
  return (
    <Layout title="Dashboard">
      <Flex>
        <Sidebar />
        <Heading>Hello</Heading>
      </Flex>
    </Layout>
  )
}

export default Login
export { getServerSideProps } from '../components/chakra'
