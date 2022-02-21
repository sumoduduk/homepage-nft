import React, { useEffect, useState, useCallback } from 'react'
import {
  Flex,
  Button,
  Text,
  IconButton,
  Divider,
  Link,
  Box,
  useColorModeValue
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
import { MotionFlex, MotionHeader, MotionText } from '../motion'
import { AnimatePresence } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { address, chains } from '../data'
import { ChainName } from '../chainName'

export default function Sidebar({ title }) {
  const [select, setSelect] = useState(title)

  const [navSize, changeNavSize] = useState('small')

  const [addr, setAddress] = useRecoilState(address)
  const [chainz, setChain] = useRecoilState(chains)

  const [_chainNames, setChainNames] = useState('')
  const [logo, setLogo] = useState(null)

  const subscribeProvider = async connection => {
    if (!connection.on) {
      const web3Modal = new Web3Modal()
      web3Modal.clearCachedProvider()
      router.push('/login')
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
      setAddress(null || undefined)
      const web3Modal = new Web3Modal()
      web3Modal.clearCachedProvider()
    })
  }

  const chainNames = props => {
    if (!props) return
    const selectChain = ChainName.find(item => item.key === `0x${props}`)

    setChainNames(selectChain.value)
    setLogo(selectChain.icon)
  }

  const userChain = useCallback(async () => {
    try {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const userAddr = await signer.getAddress()
      setAddress(userAddr)
      const chains = await signer.getChainId()
      chainNames(chains)
      setChain(chains)

      await subscribeProvider(connection)
    } catch (error) {
      console.log(error)
      router.push('/login')
    }
  }, [addr, chainz])

  useEffect(() => {
    userChain()
    console.log(chainz)
  }, [])

  function logOut() {
    const web3Modal = new Web3Modal()
    web3Modal.clearCachedProvider()
    setAddress(null || undefined)
    router.push('/')
  }

  return (
    <MotionFlex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == 'small' ? '15px' : '30px'}
      w={navSize == 'small' ? '75px' : '230px'}
      animate={{ width: navSize == 'small' ? '75px' : '230px' }}
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
        <AnimatePresence>
          {navSize == 'large' && (
            <MotionHeader
              color="red"
              size="md"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 1 }}
            >
              <MotionText text={select} />
            </MotionHeader>
          )}
        </AnimatePresence>
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
          select={setSelect}
          description="This is the description for the dashboard."
        />
        <NavItem
          as={Link}
          navSize={navSize}
          icon={FiDollarSign}
          title="Mint"
          href="/Mint"
          select={setSelect}
        />
        <NavItem
          as={Link}
          navSize={navSize}
          icon={FiBriefcase}
          title="Collection"
          href="/Balance"
          select={setSelect}
        />
        <NavItem
          as={Link}
          navSize={navSize}
          icon={FiCalendar}
          title="Reward"
          href="/Reward"
          select={setSelect}
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
            ml={-1}
            display={navSize == 'small' ? 'none' : 'flex'}
          >
            <Box
              w={navSize == 'small' ? '75px' : '170px'}
              boxShadow={useColorModeValue(
                '1px 1px 8px gray',
                '1px 1px 8px skyblue'
              )}
              p={1}
              borderRadius={8}
              mb={4}
            >
              <Text isTruncated fontSize="20px" pr={5}>
                {addr}
              </Text>
            </Box>
            <Flex mb={4}>
              {logo}
              <Text align="center" isTruncated ml={4} fontSize={18}>
                {_chainNames}
              </Text>
            </Flex>
            <Button onClick={() => logOut()}>Log Out</Button>
          </Flex>
        </Flex>
      </Flex>
    </MotionFlex>
  )
}
