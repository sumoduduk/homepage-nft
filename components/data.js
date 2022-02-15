import { atom } from 'recoil'

const address = atom({
  key: `address-user`,
  default: null
})

const chains = atom({
  key: 'user-chain',
  default: null
})

const providers = atom({
  key: 'user-provider',
  default: undefined
})

export { address, chains, providers }
