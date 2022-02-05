import { Flex, Heading } from '@chakra-ui/react'
import Sidebar from '../components/layouts/SideBar'
import Layout from '../components/layouts/article'
// import {Network} from '../components/helpers/Constant'
// import Sign from '../components/sign'

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <Flex>
        <Sidebar />
        <Heading>Hello</Heading>
      </Flex>
    </Layout>
  )
}

export default Dashboard
export { getServerSideProps } from '../components/chakra'
