import { Photo } from '../types/types'
import { fetchAllPhotos } from '../api/photos'
import { useData } from './useData'

export const usePhotos = () => {
  const { data: photos } = useData<Photo>({ queryKey: ['photos'], fetchFn: fetchAllPhotos })

  return { photos }
}
