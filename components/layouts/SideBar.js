import React, { useState } from 'react'
import {
  Flex,
  Button,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading
} from '@chakra-ui/react'
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

export default function Sidebar() {
  const [navSize, changeNavSize] = useState('large')
  const { logout } = useMoralis()

  async function logOut() {
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
          as="a"
          navSize={navSize}
          icon={FiHome}
          title="Dashboard"
          href="/Dashboard"
          description="This is the description for the dashboard."
          onClick={() => router.push('/Dashboard')}
        />
        <NavItem
          navSize={navSize}
          icon={FiDollarSign}
          title="Mint"
          onClick={() => router.push('/Mint')}
        />
        <NavItem
          navSize={navSize}
          icon={FiBriefcase}
          title="Balance"
          onClick={() => router.push('/Balance')}
        />
        <NavItem
          navSize={navSize}
          icon={FiCalendar}
          title="Reward"
          onClick={() => router.push('/Reward')}
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
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == 'small' ? 'none' : 'flex'}
          >
            <Heading as="h3" size="sm">
              Sumo Duduk
            </Heading>
            <Text color="gray">Admin</Text>
            <Button onClick={() => logOut()}>Log Out</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}