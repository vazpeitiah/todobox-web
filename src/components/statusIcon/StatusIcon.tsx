import { TaskStatus } from '@utils/enum'
import { Box, Check, Play, StatsUpSquare } from 'iconoir-react'

interface StatusIconProps {
  status: TaskStatus
}

const StatusIcon = ({ status }: StatusIconProps) => {
  switch (status) {
    case TaskStatus.Pending:
      return <Box />
    case TaskStatus.InProgress:
      return <Play />
    case TaskStatus.Done:
      return <Check />
    default:
      return <StatsUpSquare />
  }
}

export default StatusIcon
