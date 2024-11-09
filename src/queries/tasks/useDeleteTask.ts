import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteTask } from '@api/tasks'
import { useToastContext } from '@hooks/useToastContext'
import { qk } from '@utils/const'

const useDeleteTask = () => {
  const queryClient = useQueryClient()
  const { success } = useToastContext()
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [qk.tasks.get] })
      success('Tarea eliminada correctamente')
    }
  })

  return {
    deleteTask: mutate
  }
}

export default useDeleteTask
