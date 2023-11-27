import { FC } from 'react'
import { Todo } from '../types/types'

interface UserTodosProps {
  todos: Todo[]
}

const UserTodos: FC<UserTodosProps> = ({ todos }: UserTodosProps) => {
  return (
    <div className='w-full h-[500px] flex justify-center'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full mx-10'>
        {todos.map(todo => (
          <li key={todo.id} className='mb-4 h-auto todo-item'>
            <div className='bg-white p-4 border rounded-md h-full'>
              <h3 className='text-xl font-semibold mb-2'>{todo.title}</h3>
              <p className={`text-sm ${todo.completed ? 'text-green-500' : 'text-red-500'}`}>
                {todo.completed ? 'Completed' : 'Not Completed'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserTodos
