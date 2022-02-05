import { Box, Container, Divider, Flex, Heading } from '@chakra-ui/react'
import Sidebar from '../components/layouts/SideBar'
import { address, abi } from '../lib/abi'
import { ethers } from 'ethers'
import Web3Modal, { providers } from 'web3modal'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import pngegg from '../public/images/pngegg.png'
// import Image from 'next/image'
import NftModal from '../components/nftModal'

const Balance = () => {
  const [nfts, setNfts] = useState([])
  //const [loadingState, setLoadingState] = useState('not-load')
  // const [modal, setModal] = useState(false)

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
        const metaData = await axios.get(
          `https://cors-anywhere.herokuapp.com/${tokenUri}`
        )
        const epoch = i.timeIssued.toNumber()
        const epochNumber = epoch * 1000
        const date = new Date(epochNumber).toLocaleString()

        let item = {
          tokenId: i.id.toNumber(),
          pendingReward: i.pendingReward.toNumber(),
          rewardReleased: i.rewardReleased.toNumber(),
          nftCreated: date,
          image: metaData.data.image,
          name: metaData.data.name
        }

        return item
      })
    )
    setNfts(items)
    // setLoadingState('load')
  }

  return (
    <Layout title="Collection">
      <Section delay={0.5}>
        <Flex>
          <Sidebar />
          <Container maxW="full">
            <Box my={8}>
              <Heading>NFT</Heading>
            </Box>
            <Divider />
            <Box my={12}>
              <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {nfts.map((nft, i) => (
                  <NftModal
                    image={nft.image}
                    name={nft.name}
                    reward={nft.pendingReward}
                    released={nft.rewardReleased}
                    time={nft.nftCreated}
                    key={i}
                  />
                ))}
              </Box>
            </Box>
          </Container>
        </Flex>
      </Section>
    </Layout>
  )
}

export default Balance
export { getServerSideProps } from '../components/chakra'
