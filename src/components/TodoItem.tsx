import { FC } from 'react'
import { Todo } from '../types/types'

interface TodoItemProps {
  todo: Todo
}

const TodoItem: FC<TodoItemProps> = ({ todo }: TodoItemProps) => (
  <li className='mb-4 h-auto todo-item'>
    <div className='bg-white p-4 border rounded-md h-full'>
      <h3 className='text-xl font-semibold mb-2'>{todo.title}</h3>
      <p className={`text-sm ${todo.completed ? 'text-green-500' : 'text-red-500'}`}>
        {todo.completed ? 'Completed' : 'Not Completed'}
      </p>
    </div>
  </li>
)

export default TodoItem
