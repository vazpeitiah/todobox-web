import { ChipType } from '@utils/types'
import clsx from 'clsx'

type ChipProps = {
  type?: ChipType
  children?: React.ReactNode
}

const Chip = ({ type = 'inactive', children }: ChipProps) => {
  return (
    <span
      className={clsx('badge', {
        ['badge-error']: type === 'error',
        ['badge-success']: type === 'success',
        ['badge-warning']: type === 'warning'
      })}
    >
      {children}
    </span>
  )
}

export default Chip
