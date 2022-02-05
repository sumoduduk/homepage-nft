import {
  Box,
  Container,
  Button,
  Divider,
  Flex,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Image
} from '@chakra-ui/react'
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

const Balance = () => {
  const [nfts, setNfts] = useState([])
  //const [loadingState, setLoadingState] = useState('not-load')
  const { isOpen, onOpen, onClose } = useDisclosure()

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
                  <Box
                    as="button"
                    className="border shadow rounded-xl overflow-hidden hover:scale-110 transition ease-in-out delay-150 hover:-translate-y-1 hover:skew-y-2"
                    key={i}
                    mx={2}
                    my={4}
                    size="md"
                    onClick={onOpen}
                  >
                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                      <ModalContent>
                        <ModalHeader>{nft.name}</ModalHeader>
                        <ModalBody>
                          <Box>
                            <Image src={nft.image} />
                          </Box>
                          <Box>
                            <UnorderedList spacing={3}>
                              <ListItem>{nft.pendingReward}</ListItem>
                              <ListItem>{nft.rewardReleased}</ListItem>
                              <ListItem>{nft.nftCreated}</ListItem>
                            </UnorderedList>
                          </Box>
                        </ModalBody>
                        <ModalFooter>
                          <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                          </Button>
                          <Button variant="ghost">Secondary Action</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                    <Image src={pngegg} className="hover:skew-y-2" />
                  </Box>
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
