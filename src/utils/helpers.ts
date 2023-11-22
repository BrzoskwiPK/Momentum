import { UserAccount } from '../types/types'

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const isAuthenticated = (user: UserAccount) => {
  return user !== null
}
