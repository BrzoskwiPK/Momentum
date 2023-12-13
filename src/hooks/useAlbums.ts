import { Album } from '../types/types'
import { fetchAllAlbums } from '../api/albums'
import { useData } from './useData'

export const useAlbums = () => {
  const { data: albums } = useData<Album>({ queryKey: ['albums'], fetchFn: fetchAllAlbums })

  return { albums }
}
