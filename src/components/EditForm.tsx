import { useContext } from 'react'
import UserContext from '../contexts/user-context'
import { User } from '../types/types'
import { useEditFormData } from '../hooks/useEditFormData'
import FormField from './FormField'

interface EditFormProps {
  user: Partial<User>
  handleCancel: () => void
}

const EditForm = ({ user, handleCancel }: EditFormProps) => {
  const formData = useEditFormData()
  const userContext = useContext(UserContext)

  const handleSave = () => {
    const updatedUser: User = {
      id: userContext?.user?.id!,
      name: `${formData.firstName} ${formData.lastName}`,
      username: formData.username,
      email: formData.email,
      address: {
        street: formData.street,
        city: formData.city,
        suite: formData.suite,
        zipcode: formData.zipCode,
        geo: {
          lat: formData.geoLatitude,
          lng: formData.geoLongitude,
        },
      },
      phone: formData.phone,
      website: formData.website,
      company: {
        name: formData.companyName,
        bs: formData.companyBs,
        catchPhrase: formData.companyCatchPhrase,
      },
    }

    userContext?.setUser(updatedUser)
  }

  return (
    <form className='w-full min-h-[100vh] absolute top-0 left-0 z-50 bg-gray-200 flex items-center flex-col justify-center'>
      <div className='w-[80%] py-6'>
        <div className='grid grid-cols-1 gap-x-6 md:gap-y-8 sm:grid-cols-2'>
          <div className='md:border-b md:border-gray-900/10 md:pb-6'>
            <p className='font-bold text-xl my-4'>Profile Info</p>
            <FormField
              label='Username'
              name='username'
              defaultValue={user.username}
              value={formData.username}
              onChange={formData.setUsername}
            />
            <FormField
              label='First name'
              name='first-name'
              defaultValue={user.name?.split(' ')[0]}
              value={formData.firstName}
              onChange={formData.setFirstName}
            />
            <FormField
              label='Last name'
              name='last-name'
              defaultValue={user.name?.split(' ')[1]}
              value={formData.lastName}
              onChange={formData.setLastName}
            />
            <FormField
              label='Email address'
              name='email'
              type='email'
              defaultValue={user.email}
              value={formData.email}
              onChange={formData.setEmail}
            />
            <FormField
              label='Phone'
              name='phone'
              defaultValue={user.phone}
              value={formData.phone}
              onChange={formData.setPhone}
            />
            <FormField
              label='Website'
              name='website'
              defaultValue={user.website}
              value={formData.website}
              onChange={formData.setWebsite}
            />
          </div>
          <div className='md:border-b md:border-gray-900/10 md:pb-6'>
            <p className='font-bold text-xl my-4'>Address</p>
            <FormField
              label='Street'
              name='street-address'
              defaultValue={user.address?.street}
              value={formData.street}
              onChange={formData.setStreet}
            />
            <FormField
              label='City'
              name='city'
              defaultValue={user.address?.city}
              value={formData.city}
              onChange={formData.setCity}
            />
            <FormField
              label='Suite'
              name='region'
              defaultValue={user.address?.suite}
              value={formData.suite}
              onChange={formData.setSuite}
            />
            <FormField
              label='ZIP / Postal code'
              name='postal-code'
              defaultValue={user.address?.zipcode}
              value={formData.zipCode}
              onChange={formData.setZipCode}
            />
            <FormField
              label='Latitude'
              name='geo-lat'
              defaultValue={user.address?.geo.lat}
              value={formData.geoLatitude}
              onChange={formData.setGeoLatitude}
            />
            <FormField
              label='Longitude'
              name='geo-lng'
              defaultValue={user.address?.geo.lng}
              value={formData.geoLongitude}
              onChange={formData.setGeoLongitude}
            />
          </div>
          <div>
            <p className='font-bold text-xl my-4'>Company Info</p>
            <FormField
              label='Company Name'
              name='company-name'
              defaultValue={user.company?.name}
              value={formData.companyName}
              onChange={formData.setCompanyName}
            />
            <FormField
              label='Company Catch Phrase'
              name='company-phrase'
              defaultValue={user.company?.catchPhrase}
              value={formData.companyCatchPhrase}
              onChange={formData.setCompanyCatchPhrase}
            />
            <FormField
              label='Company BS'
              name='company-bs'
              defaultValue={user.company?.bs}
              value={formData.companyBs}
              onChange={formData.setCompanyBs}
            />
          </div>
        </div>
      </div>

      <div className='flex items-center justify-end gap-x-6 w-[80%] mb-6'>
        <button
          type='button'
          className='text-sm font-semibold leading-6 text-gray-900'
          onClick={handleCancel}>
          Cancel
        </button>
        <button
          type='submit'
          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          onClick={handleSave}>
          Save
        </button>
      </div>
    </form>
  )
}

export default EditForm
