import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
import { Comment } from '../types/types'

// GET https://jsonplaceholder.typicode.com/comments
export const fetchAllComments = async (): Promise<Comment> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comments`)

    return response.data
  } catch (error) {
    throw error
  }
}

// GET https://jsonplaceholder.typicode/posts/:postId/comments
export const fetchCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`)

    return response.data
  } catch (error) {
    throw error
  }
}

// GET https://jsonplaceholder.typicode/comments/:id
export const fetchCommentById = async (commentId: number): Promise<Comment> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comments/${commentId}`)

    return response.data
  } catch (error) {
    throw error
  }
}

// POST https://jsonplaceholder.typicode.com/comments
export const createComment = async (comment: Comment): Promise<Comment> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/comments`, comment)

    return response.data
  } catch (error) {
    throw error
  }
}

// PUT https://jsonplaceholder.typicode.com/comments/:id
export const updateComment = async (
  commentId: number,
  updatedComment: Comment
): Promise<Comment> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/comments/${commentId}`, updatedComment)

    return response.data
  } catch (error) {
    throw error
  }
}

// DELETE https://jsonplaceholder.typicode.com/comments/:id
export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/comments/${commentId}`)
  } catch (error) {
    throw error
  }
}
