import {
  Box,
  Flex,
  Heading,
  Container,
  Image,
  Divider,
  IconButton,
  Button
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Sidebar from '../components/layouts/SideBar'
import { ethers, BigNumber } from 'ethers'
import Web3Modal from 'web3modal'
import { address, abi } from '../lib/abi'
import { useEffect, useState } from 'react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import Section from '../components/section'

const Mint = () => {
  const [amount, setAmount] = useState(1)
  console.log(amount)
  const provider = new ethers.providers.JsonRpcProvider(
    'https://speedy-nodes-nyc.moralis.io/6392f177bd4334ce5a07629e/eth/goerli'
  )
  const url =
    'https://ipfs.moralis.io:2053/ipfs/QmSeGEb6y5dHbXvk2zV4M1rws77C4dDXFZvmdYgDrMjq7k'

  useEffect(() => {}, [])

  const buy = async () => {
    const amounts = BigNumber.from(amount)

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, abi, signer)

    const price = await contract.cost()
    let totalPrice = amounts.mul(price)

    const transaction = await contract.mint(amounts, { value: totalPrice })
    await transaction.wait()
  }

  return (
    <Layout title="Mint">
      <Flex>
        <Sidebar />

        <Container maxW="full">
          <Section delay={0.4}>
            <Heading
              mb={8}
              pl={4}
              shadow="dark-lg"
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
              shadow="dark-lg"
              rounded="6"
              h={800}
              borderRadius={30}
            >
              <Image mt={16} src={url} boxSize="xs" borderRadius="12px" />
              <Box pt={12}>
                <IconButton
                  m={6}
                  icon={<MinusIcon />}
                  onClick={() => setAmount(amount - 1)}
                />
                {amount}
                <IconButton
                  m={6}
                  icon={<AddIcon />}
                  onClick={() => setAmount(amount + 1)}
                />
              </Box>
              <Button mt={1} onClick={() => buy()}>
                Buy
              </Button>
            </Box>
          </Section>
        </Container>
      </Flex>
    </Layout>
  )
}

export default Mint
export { getServerSideProps } from '../components/chakra'
