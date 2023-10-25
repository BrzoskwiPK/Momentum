import { useQuery } from '@tanstack/react-query'
import { FunctionComponent } from 'react'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const fetchPosts = async () => {
  return await fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
}

const Home: FunctionComponent = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <section className='home'>
      {data.map((post: Post) => {
        return (
          <>
            <div>{post.title}</div>
          </>
        )
      })}
    </section>
  )
}

export default Home
