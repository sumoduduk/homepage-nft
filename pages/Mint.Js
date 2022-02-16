import {
  Box,
  Flex,
  Heading,
  Container,
  Img,
  Divider,
  IconButton,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Sidebar from '../components/layouts/SideBar'
import { ethers, BigNumber } from 'ethers'
import Web3Modal from 'web3modal'
import { nftABI } from '../lib/abi'
import { NFTAddress } from '../lib/contract'
import { useEffect, useState } from 'react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import Section from '../components/section'

const Mint = () => {
  const [amount, setAmount] = useState(1)
  console.log(amount)
  const provider = new ethers.providers.JsonRpcProvider(
    'https://speedy-nodes-nyc.moralis.io/6392f177bd4334ce5a07629e/eth/goerli'
  )
  // const url =
  //   'https://ipfs.moralis.io:2053/ipfs/QmSeGEb6y5dHbXvk2zV4M1rws77C4dDXFZvmdYgDrMjq7k'

  const buy = async () => {
    const amounts = BigNumber.from(amount)

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(NFTAddress, nftABI.abi, signer)

    const price = await contract.cost()
    let totalPrice = amounts.mul(price)

    const transaction = await contract.mint(amounts, { value: totalPrice })
    await transaction.wait()
  }

  return (
    <Layout title="Mint">
      <Flex>
        <Sidebar title="Mint" />

        <Container maxW="full">
          <Section delay={0.4}>
            <Heading
              mb={8}
              pl={4}
              boxShadow={useColorModeValue(
                '1px 1px 8px gray',
                '1px 1px 8px skyblue'
              )}
              rounded="6"
              h={20}
              pt={3}
              pl={10}
            >
              Buy
            </Heading>
            <Divider />
            <Box
              align="center"
              justify="center"
              pt={12}
              boxShadow={useColorModeValue(
                '1px 1px 8px gray',
                '1px 1px 8px skyblue'
              )}
              rounded="6"
              h={800}
              borderRadius={30}
            >
              <Img
                mt={16}
                src="images/pngegg.png"
                boxSize="xs"
                borderRadius="12px"
              />
              <Box
                boxShadow={useColorModeValue(
                  '1px 1px 8px gray',
                  '1px 1px 8px skyblue'
                )}
                display="inline-grid"
                pt={0}
                pb={9}
                px={8}
                m={8}
                borderRadius={18}
              >
                <Box pt={12}>
                  <div>
                    <button className="relative border-0 bg-transparent p-0 cursor-pointer outline-offset-4 transition-300">
                      <span className="absolute top-0 left-0 w-full h-full rounded-xl bg-stone-700 will-change-transform transform: translate-y-1/4 transition-transform" />
                      <span className="absolute top-0 w-full h-100 rounded-xl bg-gradient-to-l from-red-400 to-red-800" />
                      <span className="block relative px-3 py-10 rounded-xl text-xl ">
                        -
                      </span>
                    </button>
                  </div>

                  {amount}
                  <IconButton
                    m={6}
                    icon={<AddIcon />}
                    onClick={() => setAmount(amount + 1)}
                  />
                </Box>
                <Button
                  boxShadow={useColorModeValue(
                    '1px 1px 8px gray',
                    '1px 1px 8px skyblue'
                  )}
                  mt={1}
                  size="lg"
                  onClick={() => buy()}
                  mb={8}
                >
                  <Heading size="xl">BUY</Heading>
                </Button>
              </Box>
            </Box>
          </Section>
        </Container>
      </Flex>
    </Layout>
  )
}

export default Mint
export { getServerSideProps } from '../components/chakra'
