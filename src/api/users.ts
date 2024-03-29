import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
import { Album, Todo, User } from '../types/types'

// GET https://jsonplaceholder.typicode.com/users
export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`)

    return response.data
  } catch (error) {
    throw error
  }
}

// GET https://jsonplaceholder.typicode/users/:id
export const fetchUserById = async (userId: number): Promise<User> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`)

    return response.data
  } catch (error) {
    throw error
  }
}

// POST https://jsonplaceholder.typicode.com/users
export const createUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, user)

    return response.data
  } catch (error) {
    throw error
  }
}

// PUT https://jsonplaceholder.typicode.com/users/:id
export const updateUser = async (userId: number, updatedUser: User): Promise<number> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, updatedUser)

    return response.status
  } catch (error) {
    throw error
  }
}

// DELETE https://jsonplaceholder.typicode.com/users/:id
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${userId}`)
  } catch (error) {
    throw error
  }
}

// GET https://jsonplaceholder.typicode.com/users/:id/albums
export const fetchUserAlbums = async (userId: number): Promise<Album[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/albums`)

    return response.data
  } catch (error) {
    throw error
  }
}

// GET https://jsonplaceholder.typicode/users/:id/todos
export const fetchUserTodos = async (userId: number): Promise<Todo[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/todos`)

    return response.data
  } catch (error) {
    throw error
  }
}
