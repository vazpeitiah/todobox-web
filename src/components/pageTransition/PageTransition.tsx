import { motion } from 'framer-motion'

const pageVariants = {
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  initial: { opacity: 0 }
}

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
