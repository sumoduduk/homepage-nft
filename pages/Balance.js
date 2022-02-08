import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  useBoolean
} from '@chakra-ui/react'
import Sidebar from '../components/layouts/SideBar'
import { nftABI } from '../lib/abi'
import { NFTAddress } from '../lib/contract'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import NftModal from '../components/nftModal'

const Balance = () => {
  const [nfts, setNfts] = useState([])
  //const [loadingState, setLoadingState] = useState('not-load')

  function currency(numbers) {
    let len = numbers.length
    if (len <= 18) {
      return numbers
    }
    return numbers.slice(() => len, -16)
  }

  useEffect(() => {
    loadAsset()
  }, [])

  async function loadAsset() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const userAddr = signer.getAddress()
    const contract = new ethers.Contract(NFTAddress, nftABI.abi, signer)
    const data = await contract.getAllNftDataOwned(userAddr)

    const items = await Promise.all(
      data.map(async i => {
        const tokenUri = await contract.tokenURI(i.id)
        const metaData = await axios.get(`${tokenUri}`, {
          crossdomain: true,
          withCredentials: false,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
          }
        })
        const epoch = i.timeIssued.toNumber()
        const epochNumber = epoch * 1000
        const date = new Date(epochNumber).toLocaleString()

        let item = {
          tokenId: i.id.toNumber(),
          pendingReward: currency(
            ethers.utils.commify(ethers.utils.formatEther(i.pendingReward))
          ),
          rewardReleased: currency(
            ethers.utils.commify(ethers.utils.formatEther(i.rewardReleased))
          ),
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
                    nftId={nft.tokenId}
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
