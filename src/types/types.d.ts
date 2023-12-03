import { ReactNode } from 'react'

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export type Comment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export type Album = {
  userId: number
  id: number
  title: string
}

export type Photo = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type User = {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export type Geo = {
  lat: string
  lng: string
}

export type Address = {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export type Company = {
  name: string
  catchPhrase: string
  bs: string
}

export type NavigationItem = {
  name: string
  href: string
  iconBase: ReactNode
  iconActive: ReactNode
  current?: boolean
}
