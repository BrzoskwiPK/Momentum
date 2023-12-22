import React, { FC } from 'react'
import { Comment, CommentPublisher } from '../types/types'
import CommentComponent from './CommentComponent'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

interface CommentListProps {
  comments: Comment[]
  deleteComment: (id: number) => void
}

const CommentList: FC<CommentListProps> = ({ comments, deleteComment }) => {
  const { isAuthenticated } = useAuthenticatedUser()

  return (
    <>
      {isAuthenticated && comments ? (
        comments.map(c => {
          const publisher: CommentPublisher = {
            email: c.email,
            id: Math.ceil(Math.random() * 4),
          }
          return (
            <CommentComponent
              key={c.id}
              id={c.id}
              name={c.name}
              publisher={publisher}
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
