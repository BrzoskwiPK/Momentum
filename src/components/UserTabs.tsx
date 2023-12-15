import { FC } from 'react'

interface UserTabsProps {
  selectedTab: 'posts' | 'todos'
  handleTabChange: (tab: 'posts' | 'todos') => void
}

const UserTabs: FC<UserTabsProps> = ({ selectedTab, handleTabChange }: UserTabsProps) => {
  return (
    <div className='flex w-full justify-center px-10 mb-6'>
      <button
        className={`mr-2 px-4 py-2 ${
          selectedTab === 'posts' ? 'bg-black text-white' : 'bg-gray-300'
        }`}
        onClick={() => handleTabChange('posts')}>
        User Posts
      </button>
      <button
        className={`px-4 py-2 ${selectedTab === 'todos' ? 'bg-black text-white' : 'bg-gray-300'}`}
        onClick={() => handleTabChange('todos')}>
        User Todos
      </button>
    </div>
  )
}

export default UserTabs
