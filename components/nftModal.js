import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  useColorModeValue,
  Text,
  Icon,
  Flex,
  chakra
} from '@chakra-ui/react'
import { StarIcon, BellIcon } from '@chakra-ui/icons'
import { MdReceipt } from 'react-icons/md'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { NFTAddress } from '../lib/contract'
import { nftABI } from '../lib/abi'
import { useEffect, useState } from 'react'
import { useMoralisCloudFunction } from 'react-moralis'
import axios from 'axios'
import { data } from 'autoprefixer'

const NftModal = ({ uri, reward, released, time, _key, nftId }) => {
  const [aset, set] = useState('')
  // const { data } = useMoralisCloudFunction('fetchNft', { theUrl: uri })

  useEffect(() => {
    // console.log(uri)

    // setUrl(uri)
    // ;(async () => await fetch({ throwOnError: true }))()
    const data = async () => {
      const meta = await axios.get(`https://cors-anywhere.herokuapp.com/${uri}`)
      return meta
    }
    console.log(data)
  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure()

  async function claimReward() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(NFTAddress, nftABI.abi, signer)

    const claim = await contract.claimRewardPerNft(nftId)
    await claim.wait()
  }

  return (
    <Box
      as="button"
      className="border rounded-xl overflow-hidden hover:scale-125 transition ease-in-out delay-150  hover:-translate-y-1 hover:skew-y-2 shadow-xl shadow-cyan-500/50"
      key={_key}
      mx={2}
      my={4}
      size="md"
      onClick={onOpen}
    >
      <Image
        src={data.image}
        className="hover:skew-y-2"
        fallbackSrc="https://via.placeholder.com/150"
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalContent
          w="md"
          mx="auto"
          mt="12px"
          bg={useColorModeValue('white', 'gray.800')}
          shadow="lg"
          rounded="lg"
        >
          <ModalBody>
            <Box>
              <Image
                w="full"
                h="full"
                objectPosition="center"
                src="https://via.placeholder.com/150"
                borderRadius={16}
                my="15px"
                fit="cover"
                fallbackSrc="https://via.placeholder.com/150"
              />
              <Flex
                alignItems="center"
                px={6}
                py={3}
                bg="gray.900"
                borderRadius={16}
              >
                <Icon as={StarIcon} h={6} w={6} color="white" />
                <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
                  xqdqdqw
                </chakra.h1>
              </Flex>
            </Box>
            <Box py={4} px={6}>
              <Flex
                alignItems="center"
                mt={4}
                color={useColorModeValue('gray.700', 'gray.200')}
              >
                <Icon as={MdReceipt} h={6} w={6} mr={2} />

                <chakra.h1 px={2} fontSize="lg">
                  Reward Hold : $ {reward}
                </chakra.h1>
              </Flex>
              <Flex
                alignItems="center"
                mt={4}
                color={useColorModeValue('gray.700', 'gray.200')}
              >
                <Icon as={MdReceipt} h={6} w={6} mr={2} />

                <chakra.h1 px={2} fontSize="lg">
                  Reward Released : $ {released}
                </chakra.h1>
              </Flex>
              <Flex
                alignItems="center"
                mt={4}
                color={useColorModeValue('gray.700', 'gray.200')}
              >
                <Icon as={BellIcon} h={6} w={6} mr={2} />

                <chakra.h1 px={2} fontSize="lg">
                  NFT Created at : {time}
                </chakra.h1>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={() => claimReward()}
            >
              Claim Reward
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default NftModal
