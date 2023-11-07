import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
import { Album } from '../types/types'

// GET https://jsonplaceholder.typicode.com/albums
export const fetchAllAlbums = async (): Promise<Album> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/albums`)

    return response.data
  } catch (error) {
    throw error
  }
}

// GET https://jsonplaceholder.typicode/albums/:id
export const fetchAlbumById = async (albumId: number): Promise<Album> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/albums/${albumId}`)

    return response.data
  } catch (error) {
    throw error
  }
}

// POST https://jsonplaceholder.typicode.com/albums
export const createAlbum = async (album: Album): Promise<Album> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/albums`, album)

    return response.data
  } catch (error) {
    throw error
  }
}

// PUT https://jsonplaceholder.typicode.com/albums/:id
export const updateAlbum = async (albumId: number, updatedAlbum: Album): Promise<Album> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/albums/${albumId}`, updatedAlbum)

    return response.data
  } catch (error) {
    throw error
  }
}

// DELETE https://jsonplaceholder.typicode.com/albums/:id
export const deleteAlbum = async (albumId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/albums/${albumId}`)
  } catch (error) {
    throw error
  }
}
