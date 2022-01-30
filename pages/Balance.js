import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import Sidebar from '../components/layouts/sidebar'
import { address, abi } from '../lib/abi'
import { ethers } from 'ethers'
import axois from 'axios'
import Web3Modal, { providers } from 'web3modal'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/layouts/article'
import Section from '../components/section'

const Balance = () => {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-load')

  useEffect(() => {
    loadAsset()
  }, [])

  async function loadAsset() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const userAddr = signer.getAddress()
    const contract = new ethers.Contract(address, abi, signer)
    const data = await contract.getAllNftDataOwned(userAddr)
    const items = await Promise.all(
      data.map(async i => {
        const tokenUri = await contract.tokenURI(i.id)
        const metaData = await axios.get(tokenUri)
        const epoch = i.timeIssued.toNumber
        const epochNumeber = epoch * 1000
        const date = new Date(epochNumeber).toLocaleString()

        let item = {
          tokenId: i.id.toNumber(),
          pendingReward: i.pendingReward.toNumber(),
          rewardReleased: i.rewardReleased.toNumber(),
          nftCreated: date,
          image: metaData.data.image
        }
        return item
      })
    )
    setNfts(items)
    setLoadingState('load')
  }

  return (
    <Layout title="Collection">
      <Section delay={0.5}>
        <Flex>
          <Sidebar />
          <Box>
            <Heading>Hello</Heading>
          </Box>
          <Container>
            {nfts.map((nft, i) => (
              <Box key={i}>
                <Image src={nft.image} />
              </Box>
            ))}
          </Container>
        </Flex>
      </Section>
    </Layout>
  )
}

export default Balance
export { getServerSideProps } from '../components/chakra'
