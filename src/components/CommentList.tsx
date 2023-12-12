import React, { FC } from 'react'
import { User, Comment } from '../types/types'
import CommentComponent from './CommentComponent'

interface CommentListProps {
  comments: Comment[]
  users: User[]
  authenticatedUser: User
  deleteComment: (id: number) => void
}

const CommentList: FC<CommentListProps> = ({
  comments,
  users,
  deleteComment,
  authenticatedUser,
}) => {
  return (
    <>
      {comments?.map(c => {
        let publisher: User

        do {
          publisher = users![Math.floor(Math.random() * 9 + 1)]
        } while (publisher.id === authenticatedUser.id)

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
      })}
    </>
  )
}

export default React.memo(CommentList)
