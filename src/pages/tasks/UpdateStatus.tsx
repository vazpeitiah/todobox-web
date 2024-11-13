import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLocation, useNavigate } from 'react-router-dom'

import { ErrorMessage } from '@components'
import { useUpdateTask } from '@queries/tasks'
import { TaskStatus } from '@utils/enum'
import { Task } from '@utils/types'
import { useTaskStore } from '@stores/tasks'

const formValuesSchema = z.object({
  date: z.date(),
  comments: z.string().optional()
})

type FormValues = z.infer<typeof formValuesSchema>

const defaultValues = formValuesSchema.parse({
  date: new Date(),
  comments: ''
})

const UpdateStatus = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { setStatus } = useTaskStore()
  const task = state.task as Task
  const isPending = task.status === TaskStatus.Pending
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control
  } = useForm({
    defaultValues,
    resolver: zodResolver(formValuesSchema)
  })
  const { updateTask } = useUpdateTask({
    onSuccess: () => {
      setStatus(isPending ? TaskStatus.InProgress : TaskStatus.Done)
      navigate(-1)
    }
  })

  const handleUpdateStatus: SubmitHandler<FormValues> = (data) => {
    updateTask({
      id: task.id,
      data: {
        ...task,
        comments: data.comments || undefined,
        start: isPending ? data.date : undefined,
        end: task.status === TaskStatus.InProgress ? data.date : undefined,
        status: isPending ? TaskStatus.InProgress : TaskStatus.Done
      }
    })
  }

  const handleCancel = () => {
    navigate(-1)
    reset(defaultValues)
  }

  return (
    <form onSubmit={handleSubmit(handleUpdateStatus)}>
      <div className="divider">
        <h1 className="font-bold text-xl">
          {isPending ? 'Iniciar tarea' : 'Finalizar tarea'}
        </h1>
      </div>
      <div className="flex flex-col gap-2 max-w-lg mx-auto">
        <label htmlFor="date" className="form-control">
          <span className="label">
            <span className="label-text">Titulo</span>
          </span>
          <input
            id="text"
            type="text"
            readOnly
            className="input input-bordered"
            disabled
            defaultValue={task.title}
          />
        </label>
        <Controller
          control={control}
          name="date"
          render={({ field, fieldState: { error } }) => (
            <label htmlFor={field.name} className="form-control">
              <span className="label">
                <span className="label-text">
                  {isPending ? 'Fecha de inicio' : 'Fecha de finalización'}
                </span>
              </span>
              <input
                ref={field.ref}
                id={field.name}
                name={field.name}
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().split('T')[0]
                    : field.value
                }
                onChange={field.onChange}
                type="date"
                className="input input-bordered"
              />
              {error?.message && (
                <ErrorMessage>{error.message.toString()}</ErrorMessage>
              )}
            </label>
          )}
        />
        <label htmlFor="comments" className="form-control">
          <span className="label">
            <span className="label-text">Comentarios (opcional)</span>
          </span>
          <textarea
            id="comments"
            className="textarea textarea-bordered"
            placeholder="Escribe algo sobre la tarea..."
            {...register('comments')}
          />
          {errors.comments?.message && (
            <ErrorMessage>{errors.comments.message.toString()}</ErrorMessage>
          )}
        </label>
        <div className="flex justify-between">
          <button
            className="btn btn-outline"
            onClick={handleCancel}
            type="button"
          >
            Cancelar
          </button>
          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
        </div>
      </div>
    </form>
  )
}

export default UpdateStatus
