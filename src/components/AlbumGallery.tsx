import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Photo } from '../types/types'
import { fetchPhotosByAlbumId } from '../api/photos'
import GalleryOverlay from './GalleryOverlay'

interface AlbumGalleryProps {
  currentAlbum: number
  setShouldRenderGallery: (shouldRender: boolean) => void
}

const AlbumGallery: FC<AlbumGalleryProps> = ({
  currentAlbum,
  setShouldRenderGallery,
}: AlbumGalleryProps) => {
  const [open, setOpen] = useState(true)
  const [albumPhotos, setAlbumPhotos] = useState<Photo[]>([])
  const [imageSrc, setImageSrc] = useState<string>('')
  const [currentImage, setCurrentImage] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        event.target instanceof HTMLButtonElement ||
        event.target instanceof SVGElement ||
        event.target instanceof HTMLImageElement
      ) {
        return
      }

      if (overlayRef.current && overlayRef.current.contains(event.target as Node)) {
        handleOverlayClose()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [overlayRef]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  useEffect(() => {
    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAlbum])

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

  const handlePrevPhoto = () => {
    setCurrentImage(prev => (prev > 0 ? prev - 1 : prev))
    setImageSrc(albumPhotos[currentImage].url)
  }

  const handleNextPhoto = () => {
    setCurrentImage(prev => (prev < albumPhotos.length - 1 ? prev + 1 : prev))
    setImageSrc(albumPhotos[currentImage].url)
  }

  const handleOverlayClose = () => {
    setShouldRenderGallery(false)
    setOpen(false)
  }

  return (
    <Transition.Root show={open && !loading} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={e => {}}>
        <GalleryOverlay
          imageSrc={imageSrc}
          currentImage={currentImage}
          albumPhotos={albumPhotos}
          handlePrevPhoto={handlePrevPhoto}
          handleNextPhoto={handleNextPhoto}
          overlayRef={overlayRef}
        />
      </Dialog>
    </Transition.Root>
  )
}

export default AlbumGallery
