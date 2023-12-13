import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface UseDataProps<T> {
  queryKey: string[]
  fetchFn: () => Promise<T[]>
}

export const useData = <T>({ queryKey, fetchFn }: UseDataProps<T>) => {
  const [data, setData] = useState<T[] | undefined>()
  const queryClient = useQueryClient()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    const fetchedData = await queryClient.ensureQueryData({
      queryKey,
      queryFn: fetchFn,
    })

    if (fetchedData.length > 0) {
      setData(fetchedData)
    }
  }

  return { data }
}
