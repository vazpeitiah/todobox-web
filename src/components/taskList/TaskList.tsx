import { Chip } from "@components"
import { routes } from "@utils/const"
import { formatDate, getStatusChipType, getStatusLabel } from "@utils/helpers"
import { Task } from "@utils/types"
import { Link } from "react-router-dom"
import { Check, Play } from "iconoir-react"
import { TaskStatus } from "@utils/enum"

interface TasksListProps {
  tasks: Task[]
}

const TaskList = ({ tasks }: TasksListProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {tasks.map((task) => (
        <div key={task.id} className="card p-3 gap-2 shadow-md">
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
            <button className="btn btn-circle btn-xs">
              {task.status === TaskStatus.Pending ? <Play /> : <Check />}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
