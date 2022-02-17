import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading
} from '@chakra-ui/react'
import Sidebar from '../components/layouts/SideBar'
import Layout from '../components/layouts/article'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import Section from '../components/section'
import { nftABI } from '../lib/abi'
import { NFTAddress } from '../lib/contract'
import { useState, useEffect, useCallback } from 'react'
import Cards from '../components/Card/index'
import CardBody from '../components/Card/CardBody'
import CardHeader from '../components/Card/CardHeader'
import image from 'next/image'
import cardDashboard from '../public/images/cardDashboard.png'

const Dashboard = () => {
  const [supply, setSupply] = useState('')

  // useEffect(() => {
  //   ;(async () => {
  //     const web3Modal = new Web3Modal()
  //     const connection = await web3Modal.connect()
  //     const provider = new ethers.providers.Web3Provider(connection)
  //     const signer = provider.getSigner()
  //     const contract = new ethers.Contract(NFTAddress, nftABI.abi, signer)
  //     const getSupply = await contract.totalSupply()
  //     setSupply(getSupply.toNumber())
  //   })()
  // }, [])

  const contractInit = useCallback(async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(NFTAddress, nftABI.abi, signer)
    try {
      const getSupply = await contract.totalSupply()
      setSupply(getSupply.toNumber())
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    contractInit()
    console.log(supply)
  }, [supply])
  return (
    <Layout title="Dashboard">
      <Section delay={0.5}>
        <Flex>
          <Sidebar title="Dashboard" />
          <Container maxW="full">
            <Cards
              backgroundImage={cardDashboard}
              backgroundRepeat="no-repeat"
              background="cover"
              bgPosition="10%"
              p="16px"
              h={{ sm: '220px', xl: '100%' }}
              gridArea={{ md: '1 / 1 / 2 / 3', xl: '1 / 1 / 2 / 3' }}
            >
              <CardBody h="100%" w="100%">
                <Flex
                  direction="column"
                  color="white"
                  h="100%"
                  p="0px 10px 20px 10px"
                  w="100%"
                >
                  <Flex justify="space-between" align="center">
                    <Text fontSize="md" fontWeight="bold">
                      Purity UI
                    </Text>
                    <Icon
                      as={RiMastercardFill}
                      w="48px"
                      h="auto"
                      color="gray.400"
                    />
                  </Flex>
                  <Spacer />
                  <Flex direction="column">
                    <Box>
                      <Text fontSize="xl" letterSpacing="2px" fontWeight="bold">
                        7812 2139 0823 XXXX
                      </Text>
                    </Box>
                    <Flex mt="14px">
                      <Flex direction="column" me="34px">
                        <Text fontSize="xs">VALID THRU</Text>
                        <Text fontSize="xs" fontWeight="bold">
                          05/24
                        </Text>
                      </Flex>
                      <Flex direction="column">
                        <Text fontSize="xs">CVV</Text>
                        <Text fontSize="xs" fontWeight="bold">
                          09X
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </CardBody>
            </Cards>
          </Container>
        </Flex>
      </Section>
    </Layout>
  )
}

export default Dashboard
export { getServerSideProps } from '../components/chakra'
