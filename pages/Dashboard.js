import { Flex, Heading } from '@chakra-ui/react'
import AnimeSideBar from '../components/layouts/animateSidebar'

const Dashboard = () => {
  return (
    <Flex>
      <AnimeSideBar>
        <Heading>Hello</Heading>
      </AnimeSideBar>
    </Flex>
  )
}

export default Dashboard
