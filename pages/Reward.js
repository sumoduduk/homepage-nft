import React, { useState } from 'react'
import Layout from '../components/layouts/article'
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'
import { nftAbi } from '../lib/abi'
import { NFTAddress } from '../lib/contract'
import Sidebar from '../components/layouts/SideBar'
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading
} from '@chakra-ui/react'
import Section from '../components/section'

const Reward = () => {
  const [profit, setProfit] = useState('')
  const [profitReleased, setProfitReleased] = useState('')

    async function getSign() {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers?.Web3Provider(connection)
      const signer = provider.getSigner()
      
      return signer
    }

    async function currency(reward) {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          })
          formatter.format(reward)
    }


  async function getProfit() {
    const sign =  await getSign()
    const addr = sign?.getAddress()

    const nftContract = new ethers.Contract(NFTAddress, nftAbi.abi, sign)
    const _profit = await nftContract.viewPendingRewardPerAddress(addr)
    const dollar = _profit.toNumber()
    
    setProfit(currency(dollar))
  }

  async function getReleased() {
    const sign = await getSign()
    const addr = sign?.getAddress()

    const nftContract = new ethers.Contract(NFTAddress, nftAbi.abi, sign)
    const _profit = await nftContract.TotalRewardReleasedPerAddress(addr)
    const dollar = _profit.toNumber()
    setProfitReleased(currency(dollar))
  }

  return (
    <Layout title="Reward">
      <Section delay={0.5}>
        <Flex>
          <Sidebar />
          <Container maxW="full">
            <Box my={8}>
              <Heading>Reward</Heading>
            </Box>
            <Divider />
            <Box my={12} position="relative" h='full'border='4px'>
              <Box className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4 h-full" border='4px' >
                <Box borderRadius={20} border='4px'  mx={8}>
                  <Box  border='4px'>
                    <Heading alignSelf="center">NFT Reward</Heading>
                  </Box>
                  <Box justifyContent="center" border='4px' h='30%'>
                    <Heading>{profit}</Heading>
                  </Box>
                  <Box justifyContent="center" border='4px'>
                    <Button
                      onClick={() => {
                        getProfit()
                      }}
                    >
                      VIEW
                    </Button>
                  </Box>
                </Box>
                <Box borderRadius={20}>
                  <Box >
                    <Heading alignSelf="center">NFT Total Reward</Heading>
                  </Box>
                  <Box  justifyContent="center">
                    <Heading>{profitReleased}</Heading>
                  </Box>
                  <Box justifyContent="center">
                    <Button
                      onClick={() => {
                        getReleased()
                      }}
                    >
                      VIEW
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Flex>
      </Section>
    </Layout>
  )
}

export default Reward
export { getServerSideProps } from '../components/chakra'
