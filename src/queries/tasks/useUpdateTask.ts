import { updateTask } from "@api/tasks"
import { useToastContext } from "@hooks/useToastContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { qk } from "@utils/const"
import { CreateTask, Task } from "@utils/types"
import { AxiosError } from "axios"

type Params = {
  id: string
  data: Partial<CreateTask>
}

type UseUpdateTask = {
  onSuccess?: () => void
}

const useUpdateTask = (options?: UseUpdateTask) => {
  const queryClient = useQueryClient()
  const { success } = useToastContext()
  const { mutate, isSuccess } = useMutation<Task, AxiosError, Params>({
    mutationFn: ({ id, data }) => updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [qk.tasks.get] })
      success("Tarea actualizada correctamente!!")
      options?.onSuccess?.()
    }
  })

  return { updateTask: mutate, isSuccess }
}

export default useUpdateTask
