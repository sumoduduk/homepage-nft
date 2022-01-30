import React, { useState } from 'react'
import { Flex, Button, Text, IconButton, Divider, Link } from '@chakra-ui/react'
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiDollarSign,
  FiBriefcase
} from 'react-icons/fi'
import NavItem from './NavItem'
import router from 'next/router'
import { useMoralis } from 'react-moralis'
import Web3Modal from 'web3modal'

export default function Sidebar({ title }) {
  const [navSize, changeNavSize] = useState('large')
  const { logout } = useMoralis()

  async function logOut() {
    const web3Modal = new Web3Modal()
    web3Modal.clearCachedProvider()
    await logout()
    router.push('/')
  }

  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == 'small' ? '15px' : '30px'}
      w={navSize == 'small' ? '75px' : '200px'}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == 'small') changeNavSize('large')
            else changeNavSize('small')
          }}
        />
        <NavItem
          as={Link}
          navSize={navSize}
          icon={FiHome}
          title="Dashboard"
          href="/Dashboard"
          description="This is the description for the dashboard."
        />
        <NavItem
          as={Link}
          navSize={navSize}
          icon={FiDollarSign}
          title="Mint"
          href="/Mint"
        />
        <NavItem
          as={Link}
          navSize={navSize}
          icon={FiBriefcase}
          title="Collection"
          href="/Balance"
        />
        <NavItem
          as={Link}
          navSize={navSize}
          icon={FiCalendar}
          title="Reward"
          href="/Reward"
        />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider display={navSize == 'small' ? 'none' : 'flex'} />
        <Flex mt={4} align="center">
          <Text color="gray">Admin</Text>
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == 'small' ? 'none' : 'flex'}
          >
            <Button onClick={() => logOut()}>Log Out</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
