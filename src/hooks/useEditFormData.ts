import { useState } from 'react'

export const useEditFormData = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [suite, setSuite] = useState<string>('')
  const [zipCode, setZipCode] = useState<string>('')
  const [geoLatitude, setGeoLatitude] = useState<string>('')
  const [geoLongitude, setGeoLongitude] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [companyName, setCompanyName] = useState<string>('')
  const [companyCatchPhrase, setCompanyCatchPhrase] = useState<string>('')
  const [companyBs, setCompanyBs] = useState<string>('')

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
  }
}
