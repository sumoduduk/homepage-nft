import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'

import { MotionFlex } from '../motion'

import Menu from './Menu'
import Footer from './Footer'
import Header from './Header'
import useWindowSize from '../../hooks/useWindowSize'

export default function Sidebar() {
  const menus = [
    ['Dashboard', '/Dashboard', '#F6AD55'],
    ['Mint', '/Mint', '#68D391'],
    ['Collection', '/Balancee', '#63B3ED'],
    ['Reward', '/Reward', '#6A42AC']
  ]
  const [collapse, setCollapse] = useState(false)
  const [selected, setSelected] = useState(menus[0])
  // const height = useWindowSize()

  return (
    <MotionFlex
      width="254px"
      bg="#17181C"
      height="90vh"
      top="0"
      left="0"
      p="4"
      flexDirection="column"
      overflow="hidden"
      animate={{ width: collapse ? '80px' : '254px' }}
      rounded="lg"
    >
      <Box mb="4">
        <Header
          selected={selected}
          collapse={collapse}
          setCollapse={setCollapse}
        />
      </Box>
      <Box flex="1" overflow="hidden">
        <Menu
          collapse={collapse}
          setSelected={setSelected}
          selected={selected}
          menus={menus}
        />
      </Box>
      <Footer collapse={collapse} />
    </MotionFlex>
  )
}
