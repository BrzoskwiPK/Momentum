import { FC } from 'react'
import { Todo } from '../types/types'
import TodoItem from './TodoItem'

interface UserTodosProps {
  todos: Todo[]
}

const UserTodos: FC<UserTodosProps> = ({ todos }: UserTodosProps) => {
  return (
    <div className='w-full h-[500px] flex justify-center'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full mx-10'>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
}

export default UserTodos
