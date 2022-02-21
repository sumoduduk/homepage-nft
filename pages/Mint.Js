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
import { useState } from 'react'
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

  const minusClick = () => {
    if (amount > 1) {
      setAmount(amount - 1)
    }
    if (amount < 1) {
      amount = 1
    }
  }

  const plusClick = () => {
    amount >= 20 ? 20 : setAmount(amount + 1)
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
                <Box pt={4}>
                  <IconButton
                    className="hover:translate-y-[-6px] hover:transition-transform active:translate-y-[2px] active:transition-transform-[34ms]"
                    m={6}
                    icon={<MinusIcon />}
                    onClick={() => minusClick()}
                  />
                  {amount}
                  <IconButton
                    className="hover:translate-y-[-6px] hover:transition-transform active:translate-y-[2px] active:transition-transform-[34ms]"
                    m={6}
                    icon={<AddIcon />}
                    onClick={() => plusClick()}
                  />
                </Box>
                <Button
                  className="hover:translate-y-[-6px] hover:transition-transform active:translate-y-[2px] active:transition-transform-[34ms]"
                  boxShadow={useColorModeValue(
                    '1px 1px 8px gray',
                    '1px 1px 8px skyblue'
                  )}
                  mt={1}
                  size="lg"
                  onClick={() => buy()}
                  mb={8}
                >
                  MINT
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
