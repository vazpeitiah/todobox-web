import { Chip } from '@components'
import { useDeleteTask } from '@queries/tasks'
import { getStatusChipType, getStatusLabel } from '@utils/helpers'
import { Task } from '@utils/types'
import { Trash } from 'iconoir-react'

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
            <td>{task.date?.toLocaleDateString()}</td>
            <td>
              <Chip type={getStatusChipType(task.status)}>
                {getStatusLabel(task.status)}
              </Chip>
            </td>
            <td>
              <button
                onClick={() => handleDelete(task.id)}
                className="link link-error text-xs"
              >
                <Trash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TasksTable
