import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
import { Post } from '../types/types'

// GET https://jsonplaceholder.typicode.com/posts
export const fetchAllPosts = async (): Promise<Post> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`)

    return response.data
  } catch (error) {
    throw error
  }
}

// GET https://jsonplaceholder.typicode/posts/:id
export const fetchPostById = async (postId: number): Promise<Post> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}`)

    return response.data
  } catch (error) {
    throw error
  }
}

// POST https://jsonplaceholder.typicode.com/posts
export const createPost = async (post: Post): Promise<Post> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts`, post)

    return response.data
  } catch (error) {
    throw error
  }
}

// PUT https://jsonplaceholder.typicode.com/posts/:id
export const updatePost = async (postId: number, updatedPost: Post): Promise<Post> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/posts/${postId}`, updatedPost)

    return response.data
  } catch (error) {
    throw error
  }
}

// DELETE https://jsonplaceholder.typicode.com/posts/:id
export const deletePost = async (postId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/posts/${postId}`)
  } catch (error) {
    throw error
  }
}

// GET https://jsonplaceholder.typicode/posts?userId=:id
export const fetchUserPosts = async (userId: number): Promise<Post[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts?userId=${userId}`)

    return response.data
  } catch (error) {
    throw error
  }
}
