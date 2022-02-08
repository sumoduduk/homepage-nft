import { Box, Flex, Text } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { AnimatePresence } from 'framer-motion'

import { MotionBox } from '../motion'

export default function Footer({ collapse }) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexWrap="nowrap">
        <Box boxSize="12" rounded="lg" overflow="hidden" mr="4">
          <Box boxSize="12" bgColor="whiteAlpha.400" />
        </Box>
        <Box>
          <Text color="whiteAlpha.400" whiteSpace="nowrap">
            Good noon,
          </Text>
          <Text color="whiteAlpha.700" whiteSpace="nowrap">
            pot-code
          </Text>
        </Box>
      </Flex>
      <AnimatePresence>
        {!collapse && (
          <MotionBox
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <ArrowRightIcon aria-label="profile detail" size="xs" />
          </MotionBox>
        )}
      </AnimatePresence>
    </Flex>
  )
}
