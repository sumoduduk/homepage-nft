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
import { useMoralis } from 'react-moralis'

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

  async function getConnected(web3Modal) {
    try {
      const connection = await web3Modal.connect()
    } catch (error) {
      console.log(error)
      const goBack = router.push('/login')
      return goBack
    }
  }
  async function getAddr(signer) {
    try {
      const userAddr = await signer.getAddress()
      console.log(userAddr)

      setAddress(userAddr)
    } catch (error) {
      console.log(error)
      router.push('/login')
      return
    }
  }

  async function getChain(signer) {
    try {
      const chains = await signer.getChainId()
      console.log(chains)
      setChain(chains)
    } catch (error) {
      console.log(error)
      router.push('/login')
      return
    }
  }

  const userChain = async () => {
    try {
      const web3Modal = new Web3Modal()
      const isConnect = await getConnected(web3Modal)
      const provider = new ethers.providers.Web3Provider(isConnect)
      const signer = provider.getSigner()
      await getAddr(signer)
      await getChain(signer)
      await subscribeProvider(isConnect)
    } catch (error) {
      console.log(error)
      return
    }
  }

  useEffect(() => {
    userChain()
    addr ?? router.push('/login')
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
          href="/login"
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
