import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import { AnimatePresence } from 'framer-motion'
import Chakra from '../components/chakra'
import NFT from '../components/NFT'

function Website({ Component, pageProps, router }) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <Fonts />
      <Layout router={router}>
        <AnimatePresence exitBeforeEnter initial={true}>
          <NFT>
            <Component {...pageProps} key={router.route} />
          </NFT>
        </AnimatePresence>
      </Layout>
    </Chakra>
  )
}

export default Website
