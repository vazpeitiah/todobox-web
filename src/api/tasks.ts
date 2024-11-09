import { CreateTask, taskSchema } from '@utils/types'
import api from '@api/api'

const PATH = '/tasks'

export const getTasks = async () => {
  const response = await api.get(PATH)
  return taskSchema.array().parse(response.data)
}

export const createTask = async (task: CreateTask) => {
  const response = await api.post(PATH, task)
  return taskSchema.parse(response.data)
}

export const deleteTask = async (id: string) => {
  await api.delete(`${PATH}/${id}`)
}

export const updateTask = async (id: string, task: Partial<CreateTask>) => {
  const response = await api.put(`${PATH}/${id}`, task)
  return taskSchema.parse(response.data)
}
