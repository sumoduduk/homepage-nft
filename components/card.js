import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue
} from '@chakra-ui/react'
import React, { Fragment, useCallback, useMemo, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { MotionBox } from './motion'

export default function Card({
  title,
  label,
  method,
  visible,
  scMethod,
  scButtonName
}) {
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
          <MotionBox
            boxShadow={useColorModeValue(
              '1px 1px 8px gray',
              '1px 1px 8px skyblue'
            )}
            borderRadius={20}
            m={4}
            animate={{ scale: visible ? 1 : 0 }}
          >
            <Heading p={1}>$ {label}</Heading>
          </MotionBox>
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {title}
          </Heading>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            sapiente dolor suscipit animi ullam ad?
          </Text>
          <Stack mt={8} direction={'row'} spacing={4}>
            {scMethod && (
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                _focus={{
                  bg: 'gray.200'
                }}
                onClick={() => scMethod()}
              >
                {scButtonName}
              </Button>
            )}
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
              onClick={() => method()}
            >
              See
            </Button>
          </Stack>
        </MotionBox>
      </Center>
    </Fragment>
  )
}
