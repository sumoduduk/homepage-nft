import { Box, Flex, Stack, Text, LinkOverlay, Icon } from '@chakra-ui/react'
import { MinusIcon } from '@chakra-ui/icons'
import React from 'react'
import { MotionBox } from '../motion'
import router from 'next/router'
import NextLink from 'next/link'

export default function Menu({ menus, selected, setSelected, collapse }) {
  const index = menus.findIndex(v => v[0] === selected[0])

  return (
    <>
      <Box
        lineHeight="1rem"
        color="white"
        my="2"
        textAlign={collapse ? 'center' : 'left'}
      >
        {collapse ? (
          <MinusIcon />
        ) : (
          <Text fontWeight="light" whiteSpace="nowrap" fontSize="18px">
            Navigation
          </Text>
        )}
      </Box>
      <Box position="relative">
        {menus.length > 0 && (
          <MotionBox
            height="12"
            width="full"
            rounded="lg"
            position="absolute"
            initial={{ y: index * 88, backgroundColor: selected[2] }}
            animate={{ y: index * 88, backgroundColor: selected[2] }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 20,
              duration: 1
            }}
          />
        )}
        <Stack
          color="whiteAlpha.600"
          direction="column"
          spacing="10"
          position="relative"
        >
          {menus.map(v => (
            <Box
              key={v[0]}
              padding="4"
              borderRadius="lg"
              color={v[0] === selected[0] ? 'white' : 'whiteAlpha.600'}
              lineHeight="1rem"
              transitionProperty="background-color"
              transitionDuration="180ms"
              _hover={
                v[0] !== selected[0] && {
                  bg: 'whiteAlpha.900'
                }
              }
              cursor="pointer"
              onClick={() => {
                setSelected(v)
              }}
            >
              <NextLink href={v[1]} passHref>
                <LinkOverlay>
                  <Flex alignItems="center" userSelect="none">
                    {/* <Icon style={{ marginRight: '1rem' }} /> */}
                    <Text>{v[0]}</Text>
                  </Flex>
                </LinkOverlay>
              </NextLink>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  )
}
