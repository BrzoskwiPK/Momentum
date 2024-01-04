import { FC, Fragment, RefObject } from 'react'
import { Photo } from '../types/types'
import { Dialog, Transition } from '@headlessui/react'
import ChevronButton from './ChevronButton'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface GalleryOverlayProps {
  imageSrc: string
  currentImage: number
  albumPhotos: Photo[]
  overlayRef: RefObject<HTMLDivElement>
  handlePrevPhoto: () => void
  handleNextPhoto: () => void
}

const GalleryOverlay: FC<GalleryOverlayProps> = ({
  imageSrc,
  currentImage,
  albumPhotos,
  handlePrevPhoto,
  handleNextPhoto,
  overlayRef,
}: GalleryOverlayProps) => {
  return (
    <>
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
        <div
          ref={overlayRef}
          className='flex min-h-full justify-center p-4 text-center items-center sm:p-0'>
          <ChevronButton
            onClick={handlePrevPhoto}
            className={`clickable ${
              currentImage === 0 ? 'invisible' : ''
            } w-8 h-8 mr-2 lg:mr-5 flex-shrink-0 rounded-full bg-gray-300 text-white flex items-center justify-center cursor-pointer transition duration-200 ease-in-out hover:bg-gray-400`}>
            <FaChevronLeft className='w-4 h-4' />
          </ChevronButton>
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
                <img
                  src={imageSrc}
                  alt='Random 600x600 img fetched from API'
                  className='h-full w-full object-cover'
                />
                {albumPhotos?.[currentImage] ? (
                  <div className='absolute top-0 left-0 text-white z-10 pl-2 pt-1'>
                    <p>{albumPhotos[currentImage].title}</p>
                  </div>
                ) : null}
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <ChevronButton
            onClick={handleNextPhoto}
            className={`clickable ${
              currentImage === albumPhotos.length - 1 ? 'invisible' : ''
            } w-8 h-8 ml-2 lg:ml-5 flex-shrink-0 rounded-full bg-gray-300 text-white flex items-center justify-center cursor-pointer transition duration-200 ease-in-out hover:bg-gray-400`}>
            <FaChevronRight className='w-4 h-4' />
          </ChevronButton>
        </div>
      </div>
    </>
  )
}

export default GalleryOverlay
