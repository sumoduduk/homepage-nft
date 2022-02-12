import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading
} from '@chakra-ui/react'
import Sidebar from '../components/layouts/SideBar'
import Layout from '../components/layouts/article'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import Section from '../components/section'
import { nftABI } from '../lib/abi'
import { NFTAddress } from '../lib/contract'
import { useState, useEffect } from 'react'

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

  return (
    <Layout title="Dashboard">
      <Section delay={(0, 5)}>
        <Flex>
          <Sidebar />
          <Container maxW="full">
            <Box my={8} position="fixed">
              <Heading>{supply}</Heading>
            </Box>
          </Container>
        </Flex>
      </Section>
    </Layout>
  )
}

export default Dashboard
export { getServerSideProps } from '../components/chakra'
