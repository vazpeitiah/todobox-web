import clsx from 'clsx'

import { useGetTasks } from '@queries/tasks'
import { TaskStatus } from '@utils/enum'
import { TaskList, TaskTable, StatusIcon } from '@components'
import { useTaskStore } from '@stores/tasks'
import useTasksFilters from '@hooks/useTasksFilters'

const Tasks = () => {
  const { tasks } = useGetTasks()
  const {
    showCards,
    toggleShowCards,
    setStatus,
    status: selectedStatus
  } = useTaskStore()
  const { filterByStatus } = useTasksFilters()
  const filteredTasks = showCards
    ? filterByStatus(tasks, selectedStatus)
    : tasks

  return (
    <section className="flex flex-col gap-8">
      <div className="divider">
        <h1 className="text-lg font-bold">Mi lista de tareas</h1>
      </div>
      <div className="form-control flex-row justify-between">
        <div className="join">
          {showCards && (
            <>
              {Object.values(TaskStatus).map((status) => (
                <button
                  key={status}
                  className={clsx('join-item btn btn-sm', {
                    ['btn-primary']: selectedStatus === status
                  })}
                  name="status"
                  onClick={() => setStatus(status)}
                >
                  <StatusIcon status={status} />
                </button>
              ))}
            </>
          )}
        </div>
        <label className="label cursor-pointer gap-2">
          <span className="label-text">Mostrar tarjetas</span>
          <input
            type="checkbox"
            className="toggle"
            checked={showCards}
            onChange={() => toggleShowCards()}
          />
        </label>
      </div>
      {showCards ? (
        <TaskList tasks={filteredTasks} />
      ) : (
        <TaskTable tasks={filteredTasks} />
      )}
    </section>
  )
}

export default Tasks
