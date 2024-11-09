import { getTasks } from '@api/tasks'
import { useQuery } from '@tanstack/react-query'
import { qk } from '@utils/const'

const useGetTasks = () => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [qk.tasks.get],
    queryFn: () => getTasks()
  })
  return { tasks: data ?? [], isLoading, isSuccess, isError }
}

export default useGetTasks
