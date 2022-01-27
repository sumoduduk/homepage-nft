import { Container, Box, Button, Heading } from '@chakra-ui/react'
import router from 'next/router'
import { useMoralis } from 'react-moralis'
import VoxelDog from '../components/voxel-dog'

const Login = () => {
  //   const [isMetamask, setMetamask] = useBoolean(false)
  const { authenticate, authError } = useMoralis()

  async function loggin() {
    await authenticate()
    router.push('/auth')
  }

  return (
    <Container justifyContent="center" alignContent="center">
      <Box>
        <VoxelDog />
      </Box>
      <Box>
        {authError && (
          <p>
            {authError.name}
            {authError.message}
          </p>
        )}
        <Heading>Please Install Wallet</Heading>
        <Button onClick={() => loggin()}>Login</Button>
      </Box>
    </Container>
  )
}

export default Login

//check if metamask true
//process login
