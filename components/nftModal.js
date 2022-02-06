import {
  Box,
  Button,
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
  Image,
  Img,
  useColorModeValue
} from '@chakra-ui/react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { NFTAddress } from '../lib/contract'
import { nftABI } from '../lib/abi'
import { useEffect } from 'react'

const NftModal = ({ image, name, reward, released, time, _key, nftId }) => {
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
      className="border shadow rounded-xl overflow-hidden hover:scale-125 transition ease-in-out delay-150 hover:-translate-y-1 hover:skew-y-2"
      key={_key}
      mx={2}
      my={4}
      size="md"
      onClick={onOpen}
      boxShadow={useColorModeValue('1px 1px 8px gray', '1px 1px 8px skyblue')}
    >
      <Img src={image} className="hover:skew-y-2" />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInRight"
        borderRadius="20px"
      >
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalBody>
            <Box>
              <Image borderRadius="20px" src={image} />
            </Box>
            <Box>
              <UnorderedList spacing={3}>
                <ListItem>Reward Hold : $ {reward}</ListItem>
                <ListItem>Reward Released : $ {released}</ListItem>
                <ListItem>NFT Created : {time}</ListItem>
              </UnorderedList>
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
