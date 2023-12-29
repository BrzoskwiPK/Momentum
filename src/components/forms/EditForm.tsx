import { User } from '../../types/types'
import { useEditFormData } from '../../hooks/useEditFormData'
import FormField from '../FormField'
import { FC, FormEvent, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser'
import { updateUser } from '../../api/users'

const EditForm: FC = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { userContext, isLoading } = useAuthenticatedUser()
  const formData = useEditFormData(userContext)

  useEffect(() => {
    if (userContext && !isLoading) {
      formData.setFirstName(userContext.name?.split(' ')[0] || '')
      formData.setLastName(userContext.name?.split(' ')[1] || '')
      formData.setUsername(userContext.username || '')
      formData.setEmail(userContext.email || '')
      formData.setStreet(userContext.address?.street || '')
      formData.setCity(userContext.address?.city || '')
      formData.setSuite(userContext.address?.suite || '')
      formData.setZipCode(userContext.address?.zipcode || '')
      formData.setGeoLatitude(userContext.address?.geo?.lat || '')
      formData.setGeoLongitude(userContext.address?.geo?.lng || '')
      formData.setPhone(userContext.phone || '')
      formData.setWebsite(userContext.website || '')
      formData.setCompanyName(userContext.company?.name || '')
      formData.setCompanyCatchPhrase(userContext.company?.catchPhrase || '')
      formData.setCompanyBs(userContext.company?.bs || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const handleCancel = () => navigate(-1)

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()

    if (!userContext) {
      return
    }

    const updatedUser: User = {
      id: userContext.id,
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

    localStorage.setItem('userInfo', JSON.stringify(updatedUser))
    window.dispatchEvent(new Event('storage'))

    await queryClient.fetchQuery({
      queryKey: [`editUserProfile-${userContext.id}`],
      queryFn: () => updateUser(userContext.id, updatedUser),
    })

    const prevUsers = queryClient.getQueryData<User[]>(['users']) || []

    const updatedUsers = prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
    queryClient.setQueryData(['users'], updatedUsers)
    queryClient.invalidateQueries({ queryKey: ['users'] })

    handleCancel()
  }

  return (
    <form className='w-full min-h-[100vh] md:h-[100vh] absolute top-0 left-0 z-50 bg-indigo-100 flex items-center flex-col justify-center'>
      <div className='w-[80%] py-6'>
        <div className='grid grid-cols-1 gap-x-6 md:gap-y-8 sm:grid-cols-2'>
          <div className='md:border-b md:border-gray-900/10 md:pb-6'>
            <p className='font-bold text-xl my-4'>Profile Info</p>
            <FormField
              label='Username'
              name='username'
              value={formData.username}
              onChange={formData.setUsername}
            />
            <FormField
              label='First name'
              name='first-name'
              value={formData.firstName}
              onChange={formData.setFirstName}
            />
            <FormField
              label='Last name'
              name='last-name'
              value={formData.lastName}
              onChange={formData.setLastName}
            />
            <FormField
              label='Email address'
              name='email'
              type='email'
              value={formData.email}
              onChange={formData.setEmail}
            />
            <FormField
              label='Phone'
              name='phone'
              value={formData.phone}
              onChange={formData.setPhone}
            />
            <FormField
              label='Website'
              name='website'
              value={formData.website}
              onChange={formData.setWebsite}
            />
          </div>
          <div className='md:border-b md:border-gray-900/10 md:pb-6'>
            <p className='font-bold text-xl my-4'>Address</p>
            <FormField
              label='Street'
              name='street-address'
              value={formData.street}
              onChange={formData.setStreet}
            />
            <FormField label='City' name='city' value={formData.city} onChange={formData.setCity} />
            <FormField
              label='Suite'
              name='region'
              value={formData.suite}
              onChange={formData.setSuite}
            />
            <FormField
              label='ZIP / Postal code'
              name='postal-code'
              value={formData.zipCode}
              onChange={formData.setZipCode}
            />
            <FormField
              label='Latitude'
              name='geo-lat'
              value={formData.geoLatitude}
              onChange={formData.setGeoLatitude}
            />
            <FormField
              label='Longitude'
              name='geo-lng'
              value={formData.geoLongitude}
              onChange={formData.setGeoLongitude}
            />
          </div>
          <div>
            <p className='font-bold text-xl my-4'>Company Info</p>
            <FormField
              label='Company Name'
              name='company-name'
              value={formData.companyName}
              onChange={formData.setCompanyName}
            />
            <FormField
              label='Company Catch Phrase'
              name='company-phrase'
              value={formData.companyCatchPhrase}
              onChange={formData.setCompanyCatchPhrase}
            />
            <FormField
              label='Company BS'
              name='company-bs'
              value={formData.companyBs}
              onChange={formData.setCompanyBs}
            />
          </div>
        </div>
      </div>

      <div className='flex items-center justify-end gap-x-3 w-[80%] mb-6'>
        <button
          type='button'
          className='rounded-md text-sm font-semibold leading-6 text-gray-900 bg-white px-3 py-2 hover:bg-gray-100'
          onClick={handleCancel}>
          Cancel
        </button>
        <button
          type='submit'
          className={`${
            formData.saveable ? 'hover:bg-indigo-500' : 'disabled pointer-events-none'
          } rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          onClick={handleSave}>
          Save
        </button>
      </div>
    </form>
  )
}

export default EditForm
