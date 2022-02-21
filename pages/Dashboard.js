import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Text,
  Spacer,
  Wrap,
  WrapItem,
  Icon
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
import CardHeader from '../components/Card/CardHeader'
import CardBody from '../components/Card/CardBody'
import { address, chains } from '../components/data'
import { useRecoilValue } from 'recoil'
import { RiMastercardFill } from 'react-icons/ri'
import { FaWallet } from 'react-icons/fa'
import { ChainName } from '../components/chainName'

const Dashboard = () => {
  const [supply, setSupply] = useState('')
  const addr = useRecoilValue(address)
  const chain = useRecoilValue(chains)
  const [chainNames, setChainNames] = useState(null)
  const [balance, setBalance] = useState(null)

  const networkName = props => {
    if (!props) return
    const selectChain = ChainName.find(item => item.key === `0x${props}`)

    setChainNames(selectChain.value)
  }

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
      const balances = await contract.yourNftTotal()
      setBalance(balances.toNumber())
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    networkName(chain)
    contractInit()
    console.log(supply)
  }, [supply, chain])
  return (
    <Layout title="Dashboard">
      <Section delay={0.5}>
        <Flex>
          <Sidebar title="Dashboard" />
          <Wrap className=" pl-[100px]">
            <WrapItem>
              <Cards
                className="h-[280px] rounded-xl"
                backgroundImage='url("/images/cardDashboard.png")'
                backgroundRepeat="no-repeat"
                background="cover"
                p="16px"
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
                        Holder Stat
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
                      <Box mb={3}>
                        <Text
                          fontSize="xl"
                          letterSpacing="2px"
                          fontWeight="bold"
                        >
                          {addr}
                        </Text>
                      </Box>
                      <Flex mt="14px">
                        <Flex direction="column" me="34px">
                          <Text fontSize="xs">Your Total NFT</Text>
                          <Text fontSize="md" fontWeight="bold" pl={6}>
                            {balance}
                          </Text>
                        </Flex>
                        <Spacer />
                        <Flex direction="column" pr={4}>
                          <Text fontSize="xs">Network</Text>
                          <Text fontSize="md" fontWeight="bold" isTruncated>
                            {chainNames}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </CardBody>
              </Cards>
            </WrapItem>
            <WrapItem>
              <Cards p="16px" display="flex" align="center" justify="center">
                <CardBody>
                  <Flex direction="column" align="center" w="100%" py="14px">
                    <IconBox as="box" h={'60px'} w={'60px'} bg={iconTeal}>
                      <Icon h={'24px'} w={'24px'} color="white" as={FaWallet} />
                    </IconBox>
                    <Flex
                      direction="column"
                      m="14px"
                      justify="center"
                      textAlign="center"
                      align="center"
                      w="100%"
                    >
                      <Text fontSize="md" color={textColor} fontWeight="bold">
                        Salary
                      </Text>
                      <Text
                        mb="24px"
                        fontSize="xs"
                        color="gray.400"
                        fontWeight="semibold"
                      >
                        Belong Interactive
                      </Text>
                      <Separator />
                    </Flex>
                    <Text fontSize="lg" color={textColor} fontWeight="bold">
                      +$2000
                    </Text>
                  </Flex>
                </CardBody>
              </Cards>
            </WrapItem>
          </Wrap>
        </Flex>
      </Section>
    </Layout>
  )
}

export default Dashboard
export { getServerSideProps } from '../components/chakra'
