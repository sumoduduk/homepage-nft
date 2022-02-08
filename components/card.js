import {
  Badge,
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { Fragment, useCallback, useMemo, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

const MotionBox = motion(Box)

export default function Card() {
  const toast = useToast()
  const disclosure = useDisclosure()
  const progress = useMemo(() => Math.floor(Math.random() * (100 - 1)) + 1, [])

  const cardRef = useRef()
  const [inViewRef, inView, entry] = useInView({
    threshold: 0.25,
    triggerOnce: false
  })

  const scrollToCard = () => {
    cardRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  }

  const setRefs = useCallback(
    node => {
      cardRef.current = node
      inViewRef(node)
    },
    [inViewRef]
  )

  return (
    <Fragment>
      <Center py={6}>
        <MotionBox
          w={useBreakpointValue({ base: '80vw', md: '50vw', lg: '40vw' })}
          bg={useColorModeValue('white', 'gray.900')}
          rounded={'2xl'}
          p={6}
          textAlign={'center'}
          border="1px solid"
          borderColor="black.900"
          boxShadow="dark-lg"
          whileHover={{ scale: 1.1 }}
          ref={setRefs}
          animate={{
            x: inView ? 0 : 100,
            scale: inView ? 1 : 0.95
          }}
          onClick={scrollToCard}
        >
          <CircularProgress value={progress} color="blue.400" size="128px">
            <CircularProgressLabel>{progress}%</CircularProgressLabel>
          </CircularProgress>
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            test
          </Heading>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            sapiente dolor suscipit animi ullam ad?
          </Text>
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge px={2} py={1} bg={'red.500'} fontWeight={'400'}>
              Lorem
            </Badge>
            <Badge px={2} py={1} bg={'orange.400'} fontWeight={'400'}>
              Ipsum
            </Badge>
            <Badge px={2} py={1} bg={'green.400'} fontWeight={'400'}>
              Dolor
            </Badge>
          </Stack>
          <Stack mt={8} direction={'row'} spacing={4}>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              _focus={{
                bg: 'gray.200'
              }}
              onClick={e => {
                e.stopPropagation()
                toast({
                  position: 'top-left',
                  title: 'Now Viewing:',
                  description: 'test',
                  duration: 1000,
                  isClosable: true
                })
              }}
            >
              View
            </Button>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500'
              }}
              _focus={{
                bg: 'blue.500'
              }}
              onClick={disclosure.onOpen}
            >
              Read More
            </Button>
          </Stack>
        </MotionBox>
      </Center>
    </Fragment>
  )
}
