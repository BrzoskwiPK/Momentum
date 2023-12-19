import React, { FC } from 'react'
import { Comment, User } from '../types/types'
import CommentComponent from './CommentComponent'
import { useUsers } from '../hooks/useUsers'
import { getRandomPublisher } from '../utils/helpers'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

interface CommentListProps {
  comments: Comment[]
  deleteComment: (id: number) => void
}

const CommentList: FC<CommentListProps> = ({ comments, deleteComment }) => {
  const { users } = useUsers()
  const { isAuthenticated, userContext } = useAuthenticatedUser()

  let publisher: User | null

  if (users) publisher = userContext ? getRandomPublisher(users, userContext) : null

  return (
    <>
      {isAuthenticated && comments ? (
        comments.map(c => {
          return (
            <CommentComponent
              key={c.id}
              id={c.id}
              name={c.name}
              publisher={publisher!}
              content={c.body}
              deleteComment={deleteComment}
            />
          )
        })
      ) : (
        <p className='p-10'>Loading comments...</p>
      )}
    </>
  )
}

export default React.memo(CommentList)
