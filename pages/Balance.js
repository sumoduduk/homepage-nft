import { Box, Container, Divider, Flex, Heading } from '@chakra-ui/react'
import Sidebar from '../components/layouts/SideBar'
import { nftABI } from '../lib/abi'
import { NFTAddress } from '../lib/contract'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { useState, useEffect } from 'react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import NftModal from '../components/nftModal'
import { useMoralis } from 'react-moralis'

const Balance = () => {
  const [nfts, setNfts] = useState([])
  const [render, setRender] = useState(``)
  const [loading, setLoading] = useState(false)
  const { Moralis } = useMoralis()

  function currency(numbers) {
    let len = numbers.length
    if (len <= 18) {
      return numbers
    }
    return numbers.slice(() => len, -16)
  }
  const tanggal = epochNumber => new Date(epochNumber).toLocaleString()

  useEffect(() => {
    loadAsset()
    console.log(render)
  }, [render])

  async function loadAsset() {
    setLoading(true)
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const userAddr = signer.getAddress()
    const contract = new ethers.Contract(NFTAddress, nftABI.abi, signer)
    const datas = await contract.getAllNftDataOwned(userAddr)

    const items = await Promise.all(
      datas.map(async i => {
        const tokenUri = await contract.tokenURI(i.id)
        const params = { theUrl: `${tokenUri}` }
        const meta = await Moralis.Cloud.run('fetchNft', params)

        const epoch = i.timeIssued.toNumber()
        const epochNumber = epoch * 1000

        const date = tanggal(epochNumber)

        let item = {
          tokenId: i.id.toNumber(),
          pendingReward: currency(
            ethers.utils.commify(ethers.utils.formatEther(i.pendingReward))
          ),
          rewardReleased: currency(
            ethers.utils.commify(ethers.utils.formatEther(i.rewardReleased))
          ),
          nftCreated: date,
          image: meta.data.image,
          name: meta.data.name
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
          <Sidebar title="Collection" />
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
                    render={setRender}
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
