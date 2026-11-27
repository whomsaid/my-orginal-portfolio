import { motion, useReducedMotion } from 'framer-motion'

/** Fade-and-rise once when scrolled into view. Animates only opacity/transform. */
export default function Reveal({ children, delay = 0, y = 24, className, as = 'div' }) {
  const reduce = useReducedMotion()
  const Cmp = motion[as] || motion.div
  return (
    <Cmp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Cmp>
  )
}
