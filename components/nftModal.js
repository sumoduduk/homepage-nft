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
  Img
} from '@chakra-ui/react'
import React, { useEffect } from 'react'

const NftModal = ({ image, name, reward, released, time, setOpen, _key }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (setOpen) {
      onOpen()
    }
  }, [setOpen])

  return (
    <Box
      as="button"
      className="border shadow rounded-xl overflow-hidden hover:scale-110 transition ease-in-out delay-150 hover:-translate-y-1 hover:skew-y-2"
      key={_key}
      mx={2}
      my={4}
      size="md"
      onClick={onOpen}
    >
      <Img src={image} className="hover:skew-y-2" />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalBody>
            <Box>
              <Image src={image} />
            </Box>
            <Box>
              <UnorderedList spacing={3}>
                <ListItem>Reward Hold : {reward}</ListItem>
                <ListItem>Reward Released : {released}</ListItem>
                <ListItem>NFT Created : {time}</ListItem>
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
    </Box>
  )
}

export default NftModal
