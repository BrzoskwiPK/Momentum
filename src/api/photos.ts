import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
import { Photo } from '../types/types'

// GET https://jsonplaceholder.typicode.com/photos
export const fetchAllPhotos = async (): Promise<Photo> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/photos`)

    return response.data
  } catch (error) {
    throw error
  }
}

// GET https://jsonplaceholder.typicode.com/albums/:albumId/photos
export const fetchPhotosByAlbumId = async (albumId: number): Promise<Photo[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/albums/${albumId}/photos`)

    return response.data
  } catch (error) {
    throw error
  }
}

// GET https://jsonplaceholder.typicode/photos/:id
export const fetchPhotoById = async (photoId: number): Promise<Photo> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/photos/${photoId}`)

    return response.data
  } catch (error) {
    throw error
  }
}

// POST https://jsonplaceholder.typicode.com/photos
export const createPhoto = async (photo: Photo): Promise<Photo> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/photos`, photo)

    return response.data
  } catch (error) {
    throw error
  }
}

// PUT https://jsonplaceholder.typicode.com/photos/:id
export const updatePhoto = async (photoId: number, updatedPhoto: Photo): Promise<Photo> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/photos/${photoId}`, updatedPhoto)

    return response.data
  } catch (error) {
    throw error
  }
}

// DELETE https://jsonplaceholder.typicode.com/photos/:id
export const deletePhoto = async (photoId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/photos/${photoId}`)
  } catch (error) {
    throw error
  }
}
