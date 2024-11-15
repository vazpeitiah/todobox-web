import { Link } from 'react-router-dom'

import { Chip, StatusIcon } from '@components'
import { routes } from '@utils/const'
import { formatDate, getStatusChipType, getStatusLabel } from '@utils/helpers'
import { Task } from '@utils/types'
import { TaskStatus } from '@utils/enum'
import useUpdateTask from '@queries/tasks/useUpdateTask'

interface TasksListProps {
  tasks: Task[]
}

const TaskList = ({ tasks }: TasksListProps) => {
  const { updateTask } = useUpdateTask()

  const handleUpdateStatus = (task: Task) => {
    updateTask({
      id: task.id,
      data: {
        ...task,
        status:
          task.status === TaskStatus.Pending
            ? TaskStatus.InProgress
            : TaskStatus.Done
      }
    })
  }

  const getNextStatus = (status: TaskStatus) => {
    if (status === TaskStatus.Pending) {
      return <StatusIcon status={TaskStatus.InProgress} />
    }
    if (status === TaskStatus.InProgress) {
      return <StatusIcon status={TaskStatus.Done} />
    }
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <div key={task.id} className="card card-bordered">
          <div className="card-body">
            <Link to={routes.tasks.new} state={{ task }}>
              <h2 className="card-title text-base link link-hover">
                {task.title}
              </h2>
            </Link>
            <time className="text-xs text-base-content">
              {formatDate(task.date)}
            </time>
            <p className="prose text-sm">{task.description}</p>
            <Chip type={getStatusChipType(task.status)}>
              {getStatusLabel(task.status)}
            </Chip>
            <div className="card-actions justify-end">
              {task.status !== TaskStatus.Done && (
                <button
                  className="btn btn-circle btn-xs"
                  onClick={() => handleUpdateStatus(task)}
                >
                  {getNextStatus(task.status)}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
