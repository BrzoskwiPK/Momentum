import { useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { fetchAllPosts } from '../../api/posts'
import { Post } from '../../types/types'

interface AddPostFormProps {
  onCancel: () => void
  setShowPostForm: (v: boolean) => void
}

const AddPostForm: FC<AddPostFormProps> = ({ onCancel, setShowPostForm }: AddPostFormProps) => {
  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<string>()
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const userInfo = localStorage.getItem('userInfo')
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isSaved) setTimeout(() => setShowPostForm(false), 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSaved])

  const addPost = (post: Post) => {
    // FAKE API CALL + info czy sie dodalo
    const prevPosts = queryClient.getQueryData<Post[]>(['posts']) || []

    queryClient.setQueryData(['posts'], [...prevPosts, post])

    queryClient.invalidateQueries({ queryKey: ['posts'] })
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!title || !content) return

    const posts = await fetchAllPosts()

    const post: Post = {
      userId: JSON.parse(userInfo!).id,
      id: posts.length,
      title,
      body: content,
    }

    addPost(post)
    setIsSaved(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='h-full md:w-[60%] sm:w-[100%] sm:mt-0 md:mt-4 md:px-0 px-6'>
      <div className='space-y-2'>
        <div className='border-b border-gray-900/10 pb-2'>
          <h2 className='text-2xl font-semibold leading-7 text-gray-900'>Add Post</h2>

          <div className='mt-10 flex flex-col gap-x-6 gap-y-2 '>
            <div>
              <label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-900'>
                Title
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name='title'
                  id='title'
                  autoComplete='title'
                  required
                  onChange={e => setTitle(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='content'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Content
              </label>
              <div className='mt-2'>
                <textarea
                  name='content'
                  id='content'
                  maxLength={250}
                  autoComplete='content'
                  required
                  onChange={e => setContent(e.target.value)}
                  style={{ minHeight: '50px', height: '200px', maxHeight: '250px' }}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-3 !mb-2'>
            <button
              type='button'
              className='text-sm font-semibold leading-6 text-gray-900 rounded-md px-3 py-2 bg-gray-200 hover:bg-gray-100'
              onClick={onCancel}>
              Cancel
            </button>
            <button
              type='submit'
              className={`${
                title && content ? 'hover:bg-indigo-500' : 'disabled pointer-events-none'
              } leading-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddPostForm