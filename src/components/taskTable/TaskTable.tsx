import { Chip } from '@components'
import { useDeleteTask } from '@queries/tasks'
import { routes } from '@utils/const'
import { formatDate, getStatusChipType, getStatusLabel } from '@utils/helpers'
import { Task } from '@utils/types'
import { Edit, Trash } from 'iconoir-react'
import { Link } from 'react-router-dom'

interface TasksTableProps {
  tasks: Task[]
}

const TasksTable = ({ tasks }: TasksTableProps) => {
  const { deleteTask } = useDeleteTask()
  const handleDelete = (id: string) => {
    const hasConfirm = window.confirm('¿Estás seguro de eliminar esta tarea?')
    if (hasConfirm) {
      deleteTask(id)
    }
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{formatDate(task.date)}</td>
            <td>
              <Chip type={getStatusChipType(task.status)}>
                {getStatusLabel(task.status)}
              </Chip>
            </td>
            <td>
              <div className="flex items-center gap-4">
                <Link
                  to={routes.tasks.new}
                  state={{ task }}
                  className="link link-neutral text-sm"
                >
                  <Edit />
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="link link-error text-sm"
                >
                  <Trash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TasksTable
