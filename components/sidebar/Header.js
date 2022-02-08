import { Flex, IconButton } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { AiOutlineMenu } from 'react-icons/ai'
import React from 'react'
import { MotionBox, MotionHeader, MotionText } from '../motion'

export default function Header({ selected, collapse, setCollapse }) {
  return (
    <Flex direction="row" justifyContent="space-between" alignItems="center">
      <AnimatePresence>
        {!collapse && (
          <MotionHeader
            color="red"
            size="md"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 1 }}
          >
            <MotionText text={selected[0]} />
          </MotionHeader>
        )}
      </AnimatePresence>
      <MotionBox animate={{ x: collapse ? 4 : 0 }}>
        <IconButton
          icon={<AiOutlineMenu />}
          aria-label="toggle sidebar"
          variant="ghost"
          onClick={() => {
            setCollapse(!collapse)
          }}
        />
      </MotionBox>
    </Flex>
  )
}
