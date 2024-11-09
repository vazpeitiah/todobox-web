import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createTask } from "@api/tasks"
import { qk } from "@utils/const"
import { useToastContext } from "@hooks/useToastContext"

type UseCreateTask = {
  onSuccess?: () => void
}

const useCreateTask = (options?: UseCreateTask) => {
  const queryClient = useQueryClient()
  const { success } = useToastContext()
  const { data, isSuccess, isError, isPending, mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [qk.tasks.get] })
      options?.onSuccess?.()
      success("Tarea creada correctamente")
    }
  })

  return { data, isSuccess, isError, isPending, create: mutate }
}

export default useCreateTask
