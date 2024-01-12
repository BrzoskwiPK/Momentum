import { FC } from 'react'

interface UserTabsProps {
  selectedTab: 'posts' | 'todos'
  handleTabChange: (tab: 'posts' | 'todos') => void
}

const UserTabs: FC<UserTabsProps> = ({ selectedTab, handleTabChange }: UserTabsProps) => {
  return (
    <div className='flex w-full justify-center px-10 mb-6'>
      <button
        className={`mr-2 px-6 py-2 rounded-sm border-b-2  ${
          selectedTab === 'posts' ? 'border-black' : 'border-gray-400'
        }`}
        onClick={() => handleTabChange('posts')}>
        USER POSTS
      </button>
      <button
        className={`px-4 py-2 rounded-sm border-b-2 border-black ${
          selectedTab === 'todos' ? 'border-black' : 'border-gray-400'
        }`}
        onClick={() => handleTabChange('todos')}>
        USER TODOS
      </button>
    </div>
  )
}

export default UserTabs
