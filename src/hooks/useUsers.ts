import { fetchAllUsers } from '../api/users'
import { User } from '../types/types'
import { useData } from './useData'

export const useUsers = () => {
  const { data: users } = useData<User>({ queryKey: ['users'], fetchFn: fetchAllUsers })

  return { users }
}
