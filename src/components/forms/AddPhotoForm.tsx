import { PhotoIcon } from '@heroicons/react/24/outline'
import { FC, useEffect, useState } from 'react'
import Select from '../Select'
import { useUserAlbums } from '../../hooks/useUserAlbums'
import { OptionProps, Photo } from '../../types/types'
import { useQueryClient } from '@tanstack/react-query'
import { addPhotoToAlbum } from '../../api/albums'

interface AddPhotoFormProps {
  onCancel: () => void
  setShowPhotoForm: (v: boolean) => void
}

const AddPhotoForm: FC<AddPhotoFormProps> = ({ onCancel, setShowPhotoForm }: AddPhotoFormProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState<string>('')
  const [errors, setErrors] = useState<string | null>(null)
  const [albumId, setAlbumId] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const userInfoString = localStorage.getItem('userInfo')
  const authenticatedUserId = userInfoString ? JSON.parse(userInfoString)?.id : null
  const { albums, findUserAlbums } = useUserAlbums({ profileId: authenticatedUserId })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (isSaved) setTimeout(() => setShowPhotoForm(false), 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSaved])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return
    }

    const selectedFile = e.target.files[0]
    const maxSize = 10000000 // 10MB
    const allowedFileTypes = ['jpg', 'png', 'jpeg']

    if (selectedFile.size > maxSize) {
      setFileAndErrors(null, 'You cannot upload a file with a size greater than 10MB!')
      return
    }

    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase()
    if (!fileExtension || !allowedFileTypes.includes(fileExtension)) {
      setFileAndErrors(null, 'Only JPG, JPEG, PNG file types are allowed!')
      return
    }

    setFileAndErrors(selectedFile, null)
  }

  const setFileAndErrors = (file: File | null, error: string | null) => {
    setFile(file)
    setErrors(error)
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!file || !albums || !albumId) return
    const photosInAlbum = queryClient.getQueryData<Photo[]>([`albumsPhotos-${albumId}`]) || []

    const url = URL.createObjectURL(file)
    const photo: Photo = {
      albumId: Number(albumId),
      title,
      id: photosInAlbum.length + 1,
      url: url,
      thumbnailUrl: url,
    }

    if (albumId) {
      setIsSaved(true)
      addPhoto(albumId, photo)
      findUserAlbums()
    }
  }

  const options: OptionProps[] = albums
    ? albums.map(album => ({
        value: String(album.id),
        label: String(album.id),
      }))
    : []

  const addPhoto = async (albumId: string, photo: Photo) => {
    await queryClient.fetchQuery({
      queryKey: [`publishPhotoInAlbum-${albumId}`],
      queryFn: () => addPhotoToAlbum(Number(albumId), photo),
    })

    queryClient.setQueryData([`albumsPhotos-${albumId}`], (prevPhotos: Photo[]) => [
      ...prevPhotos,
      photo,
    ])

    queryClient.invalidateQueries({ queryKey: [`albumsPhotos-${albumId}`] })
  }

  const removeFile = () => {
    setFile(null)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='h-full md:w-[60%] sm:w-[100%] sm:mt-0 md:mt-4 md:px-0 px-6 py-28'>
      <div className='space-y-2'>
        <div className={`${file ? 'border-b border-gray-900/10' : ''} pb-2`}>
          <h2 className='text-2xl font-semibold leading-7 text-gray-900'>Add Photo</h2>

          <div className='mt-10 flex flex-col gap-x-6 gap-y-2 '>
            <div>
              <label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-900'>
                Title <span className='text-red-500 font-bold'>*</span>
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  name='title'
                  id='title'
                  autoComplete='title'
                  maxLength={255}
                  required
                  onChange={e => setTitle(e.target.value)}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='albumId'
                className='block text-sm font-medium leading-6 text-gray-900 mb-1'>
                Album ID <span className='text-red-500 font-bold'>*</span>
              </label>
              <Select fieldName='albumId' options={options} setCurrentValue={setAlbumId} />
            </div>

            <div>
              <label
                htmlFor='file-upload'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Cover photo
              </label>
              <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-8 py-10'>
                <div className='text-center'>
                  {file ? (
                    <img
                      className='mx-auto h-[250px] w-[250px] object-cover border-2 border-black rounded-md'
                      src={URL.createObjectURL(file)}
                      alt=''
                    />
                  ) : (
                    <PhotoIcon className='mx-auto h-12 w-12 text-gray-300' aria-hidden='true' />
                  )}
                  <div className='mt-4 flex text-sm leading-6 text-gray-600 justify-center'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
                      <span>Upload a file</span>
                      <input
                        id='file-upload'
                        name='file-upload'
                        type='file'
                        className='sr-only'
                        required
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className='text-xs leading-5 text-gray-600'>JPG, JPEG, PNG up to 10MB</p>
                </div>
              </div>
              {errors ? (
                <p className='mt-4 text-red-600 text-center font-semibold'>{errors}</p>
              ) : null}
              {file ? (
                <div className='flex justify-center items-center flex-col'>
                  <div className='flex justify-center items-center w-full'>
                    <strong className='text-indigo-600 text-center block mt-1 text-sm'>
                      File uploaded: {file.name}
                    </strong>
                    <button
                      className='ml-auto mt-2 w-[60px] h-[40px] rounded-md hover:bg-red-500 bg-red-600 px-1 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      onClick={removeFile}>
                      Delete
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className='mt-6 flex flex-col items-center justify-center !mb-2'>
          <div className='flex items-center w-full justify-end gap-x-3'>
            <button
              type='button'
              className='text-sm font-semibold leading-6 text-gray-900 rounded-md px-3 py-2 bg-gray-200 hover:bg-gray-100'
              onClick={onCancel}>
              Cancel
            </button>
            <button
              type='submit'
              className={`${
                file && title && albumId ? 'hover:bg-indigo-500' : 'disabled pointer-events-none'
              } leading-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
              Save
            </button>
          </div>
          <div className='flex items-center w-full justify-center'>
            {isSaved ? (
              <strong className='text-indigo-600 text-center block mt-1 text-sm'>
                An image has been uploaded! You will be redirected in 2 seconds...
              </strong>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddPhotoForm
