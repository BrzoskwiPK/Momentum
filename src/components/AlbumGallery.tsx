import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment, useEffect, useRef, useState } from 'react'
import ChevronButton from './ChevronButton'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Photo } from '../types/types'
import { fetchPhotosByAlbumId } from '../api/photos'

interface AlbumGalleryProps {
  currentAlbum: number
  setShouldRenderGallery: (shouldRender: boolean) => void
}

const AlbumGallery: FC<AlbumGalleryProps> = ({
  currentAlbum,
  setShouldRenderGallery,
}: AlbumGalleryProps) => {
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null)
  const [albumPhotos, setAlbumPhotos] = useState<Photo[]>([])
  const [imageSrc, setImageSrc] = useState<string>('')
  const [currentImage, setCurrentImage] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [shouldCloseDialog, setShouldCloseDialog] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const photos = await fetchPhotosByAlbumId(currentAlbum)
        setAlbumPhotos(photos)
        setCurrentImage(0)
        if (photos.length > 0) {
          setImageSrc(photos[0].url)
        }
      } catch (error) {
        console.error('Error fetching photos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [currentAlbum])

  const handlePrevPhoto = () => {
    setCurrentImage(prev => prev - 1)
    setImageSrc(albumPhotos[currentImage].url)
    setShouldCloseDialog(false)
  }

  const handleNextPhoto = () => {
    setCurrentImage(prev => prev + 1)
    setImageSrc(albumPhotos[currentImage].url)
    setShouldCloseDialog(false)
  }

  const handleClose = () => {
    if (shouldCloseDialog) {
      setShouldRenderGallery(false)
      setOpen(false)
    } else {
      setShouldCloseDialog(true)
    }
  }

  return (
    <Transition.Root show={open && !loading} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full justify-center p-4 text-center items-center sm:p-0'>
            {currentImage > 0 ? (
              <ChevronButton
                onClick={handlePrevPhoto}
                className='w-8 h-8 mr-2 lg:mr-5 flex-shrink-0 rounded-full bg-gray-300 text-white flex items-center justify-center cursor-pointer transition duration-200 ease-in-out hover:bg-gray-400'>
                <FaChevronLeft className='w-4 h-4' />
              </ChevronButton>
            ) : null}
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='h-[200px] w-[200px] lg:h-[600px] lg:w-[600px] sm:h-[300px] sm:w-[300px] flex items-center justify-center relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8'>
                <div className='relative h-full w-full'>
                  <img src={imageSrc} alt='' className='h-full w-full object-cover' />
                  {albumPhotos?.[currentImage] ? (
                    <div className='absolute top-0 left-0 text-white z-10 pl-2 pt-1'>
                      <p>{albumPhotos[currentImage].title}</p>
                    </div>
                  ) : null}
                </div>
              </Dialog.Panel>
            </Transition.Child>
            {currentImage < albumPhotos.length ? (
              <ChevronButton
                onClick={handleNextPhoto}
                className='w-8 h-8 ml-2 lg:ml-5 flex-shrink-0 rounded-full bg-gray-300 text-white flex items-center justify-center cursor-pointer transition duration-200 ease-in-out hover:bg-gray-400'>
                <FaChevronRight className='w-4 h-4' />
              </ChevronButton>
            ) : null}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AlbumGallery
