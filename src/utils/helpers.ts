import { TaskStatus } from './enum'
import { ChipType } from './types'

export const getStatusChipType = (status: TaskStatus): ChipType => {
  switch (status) {
    case TaskStatus.Done:
      return 'success'
    case TaskStatus.Pending:
      return 'inactive'
    case TaskStatus.InProgress:
      return 'warning'
    default:
      return 'inactive'
  }
}

export const getStatusLabel = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.Done:
      return 'Completado'
    case TaskStatus.Pending:
      return 'Pendiente'
    case TaskStatus.InProgress:
      return 'En progreso'
    default:
      return 'Sin estado'
  }
}

export const parseUtcDate = (date?: Date | null): Date | null => {
  if (!date) return null
  const offset = date.getTimezoneOffset()
  return new Date(date.getTime() - offset * 60 * 1000)
    .toISOString()
    .split('T')[0] as unknown as Date
}

export const formatDate = (date?: Date | null): string => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const parsePayloadDate = (date?: Date | null): Date | undefined => {
  if (!date) return undefined
  const currentTimeZoneOffset = new Date().getTimezoneOffset()
  return new Date(date.getTime() + currentTimeZoneOffset * 60 * 1000)
}
