import { Box, Flex, Heading } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Sidebar from '../components/layouts/SideBar'

const Mint = () => {
  return (
  <Layout title="Mint">
    <Flex>
    <Sidebar/>
    <Box>
        <Heading>Hello</Heading>
      </Box>
      </Flex>
  </Layout>

  )
}

export default Mint
