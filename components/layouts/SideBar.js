import React, { useEffect, useState } from 'react'
import {
  Flex,
  Button,
  Text,
  IconButton,
  Divider,
  Link,
  Box
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
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'

export default function Sidebar() {
  const [navSize, changeNavSize] = useState('large')

  const [addr, setAddress] = useState('')
  const [chain, setChain] = useState('')

  const subscribeProvider = async connection => {
    if (!connection.on) {
      return
    }
    connection.on('accountsChanged', async accounts => {
      setAddress(accounts)
      router.reload()
    })
    connection.on('chainChanged', async chainId => {
      setChain(chainId)
      router.reload()
    })
    connection.on('disconnect', async () => {
      setAddress(null)
    })
  }

  const userChain = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const userAddr = await signer.getAddress()
    console.log(userAddr)
    setAddress(userAddr)
    const chains = await signer.getChainId()
    setChain(chains)
    await subscribeProvider(connection)
    return connection
  }

  useEffect(() => {
    userChain()
    !addr ?? router.push('/login')
  }, [])

  function logOut() {
    const web3Modal = new Web3Modal()
    web3Modal.clearCachedProvider()
    setAddress(null || undefined)
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
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == 'small' ? 'none' : 'flex'}
          >
            <Box w={navSize == 'small' ? '75px' : '170px'}>
              <Text isTruncated>{addr}</Text>
            </Box>
            <Box>
              <Text isTruncated>{chain}</Text>
            </Box>

            <Button onClick={() => logOut()}>Log Out</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
