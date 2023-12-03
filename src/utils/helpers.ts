import { User } from '../types/types'

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const isAuthenticated = (user: Partial<User> | null | undefined) => {
  return user !== undefined && user !== null
}
