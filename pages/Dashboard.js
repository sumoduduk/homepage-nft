import { Flex, Heading } from '@chakra-ui/react'
import SideBar from '../components/layouts/SideBar'
import Layout from '../components/layouts/article'

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <Flex>
        <SideBar />
        <Heading>Hello</Heading>
      </Flex>
    </Layout>
  )
}

export default Dashboard
export { getServerSideProps } from '../components/chakra'
