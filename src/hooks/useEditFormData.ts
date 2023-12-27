import { useState } from 'react'
import { User } from '../types/types'

export const useEditFormData = (user: User | null) => {
  const [firstName, setFirstName] = useState<string>(user?.name?.split(' ')[0] || '')
  const [lastName, setLastName] = useState<string>(user?.name?.split(' ')[1] || '')
  const [username, setUsername] = useState<string>(user?.username || '')
  const [email, setEmail] = useState<string>(user?.email || '')
  const [street, setStreet] = useState<string>(user?.address?.street || '')
  const [city, setCity] = useState<string>(user?.address?.city || '')
  const [suite, setSuite] = useState<string>(user?.address?.suite || '')
  const [zipCode, setZipCode] = useState<string>(user?.address?.zipcode || '')
  const [geoLatitude, setGeoLatitude] = useState<string>(user?.address?.geo?.lat || '')
  const [geoLongitude, setGeoLongitude] = useState<string>(user?.address?.geo?.lng || '')
  const [phone, setPhone] = useState<string>(user?.phone || '')
  const [website, setWebsite] = useState<string>(user?.website || '')
  const [companyName, setCompanyName] = useState<string>(user?.company?.name || '')
  const [companyCatchPhrase, setCompanyCatchPhrase] = useState<string>(
    user?.company?.catchPhrase || ''
  )
  const [companyBs, setCompanyBs] = useState<string>(user?.company?.bs || '')

  const saveable = !(
    firstName === '' ||
    lastName === '' ||
    username === '' ||
    email === '' ||
    street === '' ||
    city === '' ||
    suite === '' ||
    zipCode === '' ||
    geoLatitude === '' ||
    geoLongitude === '' ||
    phone === '' ||
    website === '' ||
    companyName === '' ||
    companyCatchPhrase === '' ||
    companyBs === ''
  )

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    email,
    setEmail,
    street,
    setStreet,
    suite,
    setSuite,
    city,
    setCity,
    zipCode,
    setZipCode,
    geoLatitude,
    setGeoLatitude,
    geoLongitude,
    setGeoLongitude,
    phone,
    setPhone,
    website,
    setWebsite,
    companyName,
    setCompanyName,
    companyCatchPhrase,
    setCompanyCatchPhrase,
    companyBs,
    setCompanyBs,
    saveable,
  }
}
