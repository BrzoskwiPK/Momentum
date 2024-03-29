import React, { FC } from 'react'
import { CommentWithPublisher } from '../types/types'
import CommentComponent from './CommentComponent'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

interface CommentListProps {
  comments: CommentWithPublisher[]
  deleteComment: (id: number) => void
}

const CommentList: FC<CommentListProps> = ({ comments, deleteComment }) => {
  const { isAuthenticated } = useAuthenticatedUser()

  return (
    <>
      {isAuthenticated && comments.length ? (
        comments
          .sort((a, b) => b.publishDate - a.publishDate)
          .map((c, index, array) => {
            return (
              <CommentComponent
                key={c.id}
                id={c.id}
                publisherEmail={c.email}
                publisherId={c.publisherId}
                publishDate={c.publishDate}
                name={c.name}
                content={c.body}
                deleteComment={deleteComment}
                addBottomBorder={index !== array.length - 1}
              />
            )
          })
      ) : (
        <p className='p-10'>There are no comments to display yet...</p>
      )}
    </>
  )
}

export default React.memo(CommentList)
