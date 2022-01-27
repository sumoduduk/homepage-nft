import { motion } from 'framer-motion'

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

const AnimateSideBar = children => (
  <motion.article
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.7 }}
  >
    {children}
  </motion.article>
)

export default AnimateSideBar
