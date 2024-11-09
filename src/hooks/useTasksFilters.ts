import { TaskStatus } from '@utils/enum'
import { Task } from '@utils/types'

const useTasksFilters = () => {
  const filterByStatus = (tasks: Task[], status: TaskStatus) => {
    return tasks.filter((task) => task.status === status)
  }
  return {
    filterByStatus
  }
}

export default useTasksFilters
