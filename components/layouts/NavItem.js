import React from 'react'
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Button
} from '@chakra-ui/react'
import NavHoverBox from './NavHoverBox'
import NextLink from 'next/link'

export default function NavItem({
  icon,
  title,
  description,
  href,
  path,
  navSize,
  active,
  select
}) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == 'small' ? 'center' : 'flex-start'}
    >
      <Menu id="3" placement="right">
        <NextLink href={href} passHref>
          <Link
            backgroundColor={active && '#AEC8CA'}
            p={3}
            borderRadius={8}
            _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}
            w={navSize == 'large' && '100%'}
            path={path}
          >
            <MenuButton w="100%">
              <Flex>
                <Icon
                  as={icon}
                  fontSize="xl"
                  color={active ? '#82AAAD' : 'gray.500'}
                />
                <Text ml={5} display={navSize == 'small' ? 'none' : 'flex'}>
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </Link>
        </NextLink>
        <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList>
      </Menu>
    </Flex>
  )
}
