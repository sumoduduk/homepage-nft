import { Flex, Container } from '@chakra-ui/react'
import React from 'react'
import AnimateSideBar from './animateSidebar'
import Sidebar from './sidebar'

const NftLayout = ({ children }) => {
  return (
    <Flex maxW="full">
      <AnimateSideBar>
        <Sidebar />
      </AnimateSideBar>
      <Container>{children}</Container>
    </Flex>
  )
}
export default NftLayout
