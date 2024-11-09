import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateTask } from '@queries/tasks'
import { CreateTask, createTaskSchema, Task } from '@utils/types'
import { TaskStatus } from '@utils/enum'
import { getStatusLabel, parseUtcDate } from '@utils/helpers'
import clsx from 'clsx'
import useUpdateTask from '@queries/tasks/useUpdateTask'
import { ErrorMessage } from '@components'

const defaultValues: CreateTask = {
  title: '',
  date: null,
  description: '',
  status: TaskStatus.Pending
}

const TaskForm = () => {
  const { state } = useLocation()
  const task: Task | undefined = state?.task
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    control
  } = useForm({
    defaultValues,
    values: task
      ? {
          ...task,
          date: parseUtcDate(task.date)
        }
      : defaultValues,
    resolver: zodResolver(createTaskSchema)
  })
  const { create } = useCreateTask({
    onSuccess: () => handleCancel()
  })
  const { updateTask } = useUpdateTask({
    onSuccess: () => handleCancel()
  })

  const handleOnSubmit: SubmitHandler<CreateTask> = (data) => {
    if (task) {
      updateTask({ id: task.id, data })
      return
    }
    create(data)
  }

  const handleCancel = () => {
    navigate(-1)
    reset(defaultValues)
  }

  return (
    <>
      <div className="divider">
        <h1 className="text-lg font-bold">
          {task ? 'Editar tarea' : 'Nueva tarea'}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-4 max-w-lg mx-auto"
      >
        <input
          type="text"
          {...register('title')}
          className="input input-bordered"
          placeholder="Título"
        />
        {errors.title?.message && (
          <ErrorMessage>{errors.title.message.toString()}</ErrorMessage>
        )}
        <input
          type="date"
          {...register('date')}
          className="input input-bordered"
        />
        {errors.date?.message && (
          <ErrorMessage>{errors.date.message.toString()}</ErrorMessage>
        )}
        <textarea
          {...register('description')}
          className="textarea textarea-bordered"
          placeholder="✏️ Escribe una descripción más detallada"
        />
        {errors.description?.message && (
          <ErrorMessage>{errors.description.message.toString()}</ErrorMessage>
        )}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div className="flex justify-between">
              {Object.values(TaskStatus).map((status) => (
                <div className="form-control" key={status}>
                  <label
                    className="label cursor-pointer gap-2"
                    htmlFor={field.name}
                  >
                    <span className="label-text">{getStatusLabel(status)}</span>
                    <input
                      id={field.name}
                      type="radio"
                      name={field.name}
                      value={status}
                      onChange={(e) => field.onChange(e.target.value)}
                      checked={field.value === status}
                      className={clsx('radio', {
                        ['checked:bg-warning']: status === TaskStatus.Pending,
                        ['checked:bg-info']: status === TaskStatus.InProgress,
                        ['checked:bg-success']: status === TaskStatus.Done
                      })}
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
        />
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
      </form>
    </>
  )
}

export default TaskForm
