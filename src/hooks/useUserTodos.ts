import { useEffect, useState } from 'react'
import { fetchUserTodos } from '../api/users'
import { Todo } from '../types/types'
import { useQueryClient } from '@tanstack/react-query'

interface UseUserTodosProps {
  profileId?: string
}

export const useUserTodos = ({ profileId = '' }: UseUserTodosProps) => {
  const queryClient = useQueryClient()
  const [todos, setTodos] = useState<Todo[] | null>(null)

  const findUserTodos = async () => {
    if (profileId) {
      const data = await queryClient.ensureQueryData({
        queryKey: [`userTodos-${profileId}`],
        queryFn: () => fetchUserTodos(Number(profileId)),
      })

      if (data.length > 0) setTodos(data)
    }
  }

  useEffect(() => {
    findUserTodos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId])

  return { todos, findUserTodos }
}
