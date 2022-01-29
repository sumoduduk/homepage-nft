import { Box, Flex, Heading, Container } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Sidebar from '../components/layouts/SideBar'
import {ethers} from 'ethers'
import axios from 'axios'
// import Web3Modal from 'web3modal'
import { address, abi } from '../lib/abi'
import { useEffect } from 'react'

const Mint = () => {
  // const [count, setCount] = useEffect(1)

  const provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/6392f177bd4334ce5a07629e/eth/goerli")
  const contract = new ethers.Contract(address, abi, provider)
  
  useEffect(() => {
    imageNotRevealed()
  }, [])
  

  async function imageNotRevealed(){
    const meta = await contract.hiddenMetadataUri()
    const fetchFake = await axios.get(meta)
    const fakeImage = meta.data.image
    return meta.data.image
  }



  return (
  <Layout title="Mint">
    <Flex>
    <Sidebar/>
    <Box>
        <Heading>Hello</Heading>
        <Container>
          <Box>
            {}
          </Box>
        </Container>
      </Box>
      </Flex>
  </Layout>

  )
}

export default Mint
