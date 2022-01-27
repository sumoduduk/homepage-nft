import { useMoralis } from 'react-moralis'
import { Box, Button } from '@chakra-ui/react'
import router, { useRouter } from 'next/router'

const Auth = () => {
  const { logout } = useMoralis()

  async function logged() {
    await logout()
    router.push('/')
  }

  return (
    <Box>
      logged
      <Button onClick={() => logged()}>Log Out</Button>
    </Box>
  )
}

export default Auth
