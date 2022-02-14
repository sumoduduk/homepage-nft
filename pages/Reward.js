import React, { useCallback, useMemo, useState } from 'react'
import Layout from '../components/layouts/article'
import Web3Modal from 'web3modal'
import {ethers} from 'ethers'
import { nftABI } from '../lib/abi'
import { NFTAddress } from '../lib/contract'
import Sidebar from '../components/layouts/SideBar'
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  VStack, Text, Center
} from '@chakra-ui/react'
import Section from '../components/section'
import Card from '../components/card'

const Reward = () => {
  const [profit, setProfit] = useState('')
  const [profitReleased, setProfitReleased] = useState('')
  const [pvisible, setPvisible] = useState(false)
  const [rvisible, setRvisible] = useState(false)
  const [addr, setAddress] = useState('')
  const [chain, setChain] = useState('')
  const [signer, setSigner] = useState(undefined)
  const [provider, setProvider] = useState(undefined)


    async function getSign() {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers?.Web3Provider(connection)
      const signer = provider.getSigner()
      
      return signer
    }

    function currency(numbers) {
      let len = numbers.length
      if (len <= 15) {
        return numbers
      }
      return numbers.slice(() => len, -16)
    }


  const getProfit = useCallback(async() =>  {
    const sign =  await getSign()
    const addr = sign?.getAddress()

    const nftContract = new ethers.Contract(NFTAddress, nftABI.abi, sign)
    const _profit = await nftContract.viewPendingRewardPerAddress(addr)
    const dollar = currency(ethers.utils.commify(ethers.utils.formatEther(_profit)))
    setProfit(dollar)
    console.log(dollar)
    setPvisible(true)
  }, [])

  const getReleased = useCallback(async () => {
    const sign = await getSign()
    const addr = sign?.getAddress()

    const nftContract = new ethers.Contract(NFTAddress, nftABI.abi, sign)
    const _profit = await nftContract.TotalRewardReleasedPerAddress(addr)
    const dollar = currency(ethers.utils.commify(ethers.utils.formatEther(_profit)))
    
    setProfitReleased(dollar)
    setRvisible(true)
  }, []) 

  const claimAll = useCallback(async() => {
    const sign = await getSign()
    const addr = sign.getAddress()

    const nftContract = new ethers.Contract(NFTAddress, nftABI.abi, sign)
    const claim = await nftContract.claimRewardPerAddress(addr)
  } , []) 

  return (
    <Layout title="Reward">
      <Section delay={0.5}>
        <Flex>
          <Sidebar  title="Reward" pAddress={setAddress}
            pChain={setChain}
            setSigner={setSigner}
            setProvider={setProvider}/>
          <Container maxW="full">
            <Box my={8}>
              <Heading>Reward</Heading>
            </Box>
            <Divider />
            <VStack>
                <Card title='Pending Reward Owned' label={profit} method={getProfit} visible={pvisible} scMethod={claimAll} scButtonName='Claim All Reward'/>
                <Card title='Total Reward Claimed' label={profitReleased} method={getReleased} visible={rvisible}/>
              </VStack>            
          </Container>
        </Flex>
      </Section>
    </Layout>
  )
}

export default Reward
export { getServerSideProps } from '../components/chakra'
