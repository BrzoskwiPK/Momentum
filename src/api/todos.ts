import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
import { Todo } from '../types/types'

// GET https://jsonplaceholder.typicode.com/todos
export const fetchAllTodos = async (): Promise<Todo> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos`)

    return response.data
  } catch (error) {
    throw error
  }
}

// GET https://jsonplaceholder.typicode/todos/:id
export const fetchTodoById = async (todoId: number): Promise<Todo> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos/${todoId}`)

    return response.data
  } catch (error) {
    throw error
  }
}

// POST https://jsonplaceholder.typicode.com/todos
export const createTodo = async (todo: Todo): Promise<Todo> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/todos`, todo)

    return response.data
  } catch (error) {
    throw error
  }
}

// PUT https://jsonplaceholder.typicode.com/todos/:id
export const updateTodo = async (todoId: number, updatedTodo: Todo): Promise<Todo> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/todos/${todoId}`, updatedTodo)

    return response.data
  } catch (error) {
    throw error
  }
}

// DELETE https://jsonplaceholder.typicode.com/todos/:id
export const deleteTodo = async (todoId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/todos/${todoId}`)
  } catch (error) {
    throw error
  }
}
