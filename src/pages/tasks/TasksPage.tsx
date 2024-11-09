import TaskList from "@components/taskList/TaskList"
import TasksTable from "@components/taskTable/TaskTable"
import { useGetTasks } from "@queries/tasks"
import { useTaskStore } from "../../stores/tasks"

const Tasks = () => {
  const { tasks } = useGetTasks()
  const { showCards, toggleShowCards } = useTaskStore()

  return (
    <section className="flex flex-col gap-4">
      <div className="divider">
        <h1 className="text-lg font-bold">Mi lista de tareas</h1>
      </div>
      <div className="flex justify-end">
        <div className="form-control">
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
      </div>
      {showCards ? <TaskList tasks={tasks} /> : <TasksTable tasks={tasks} />}
    </section>
  )
}

export default Tasks
