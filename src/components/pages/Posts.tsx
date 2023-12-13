import { FC } from 'react'
import PostComponent from '../PostComponent'
import { shuffleArray } from '../../utils/helpers'
import { usePosts } from '../../hooks/usePosts'
import { useUsers } from '../../hooks/useUsers'

const Posts: FC = () => {
  const { posts } = usePosts()
  const { users } = useUsers()

  const deletePost = () => {
    // TBD
  }

  const addPost = () => {
    // TBD
  }

  return (
    <div className='w-full max-h-screen flex flex-col items-center'>
      <div className='w-[80%] my-6 border-b-4 pb-4 flex flex-col'>
        <h2 className='text-3xl'>Posts</h2>
        <p className='underline hover:cursor-pointer self-end' onClick={addPost}>
          Add your own post
        </p>
      </div>
      {shuffleArray(posts!)?.map(post => (
        <PostComponent
          key={post.id}
          title={post.title}
          body={post.body}
          id={post.id}
          user={users?.find(user => user.id === post.userId)!}
          deletePost={deletePost}
        />
      ))}
    </div>
  )
}

export default Posts
