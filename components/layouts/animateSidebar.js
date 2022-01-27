import { motion } from 'framer-motion'
import Sidebar from './sidebar'

const AnimeSideBar = motion(Sidebar)

const variants = {
  initial: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' //NIEWIDOCZNY LEWO
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
  },
  exit: {
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' //NIEWIDOCZNY PRAWO
  }
}

export default function Example() {
  return (
    <AnimeSideBar
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.7 }}
    />
  )
}
