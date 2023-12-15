import { Album, Photo, User } from '../types/types'

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const isAuthenticated = (): boolean => Boolean(localStorage.getItem('userInfo'))

export const shuffleArray = <T>(collection: T[]): T[] => {
  if (!collection) return collection

  for (let i = collection.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[collection[i], collection[j]] = [collection[j], collection[i]]
  }

  return collection
}

export const getFilteredResults = (
  searchPhrase: string,
  selectedTab: string,
  users: User[],
  photos: Photo[],
  albums: Album[]
): (User | Photo | Album)[] => {
  if (searchPhrase.length === 0) return []

  const searchLowerCase = searchPhrase.toLowerCase()

  if (selectedTab === 'photos') {
    return photos.filter(p => p.id.toString().startsWith(searchLowerCase))
  } else if (selectedTab === 'users') {
    return users.filter(u => u.name.toLowerCase().startsWith(searchLowerCase))
  } else if (selectedTab === 'albums') {
    return albums.filter(a => a.id.toString().startsWith(searchLowerCase))
  }

  return []
}

export const fetchData = async (
  queryClient: any,
  queryKey: string[],
  fetchFn: () => Promise<any>,
  setData: (data: any) => void
) => {
  const data = await queryClient.ensureQueryData({ queryKey, queryFn: fetchFn })

  if (data) setData(data)
}

export const getRandomPublisher = (users: User[], excludedUser: Partial<User>): User => {
  const availablePublishers = users?.filter(user => user.id !== excludedUser.id)
  const randomIndex = Math.floor(Math.random() * availablePublishers.length)

  return availablePublishers[randomIndex]
}
