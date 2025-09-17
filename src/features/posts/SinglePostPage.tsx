import { Link, useParams } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'

import { TimeAgo } from '@/components/TimeAgo'

//Importando o seletor escolhe o posto pelo Id
import { selectPostById } from '@/features/posts/postsSlice'
import { PostAuthor } from '@/features/posts/PostAuthor'
import { ReactionButtons } from '@/features/posts/ReactionButtons'

import { selectCurrentUser } from '@/features/users/usersSlice'

export const SinglePostPage = () => {
  const { postId } = useParams()

  //Buscando o post pelo id, agora usando o seletor 'selectPostById'
  const post = useAppSelector((state) => selectPostById(state, postId!))

  const currentUser = useAppSelector(selectCurrentUser)!

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const canEdit = currentUser.id === post.userId

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <div>
          <span>
            Post made by{' '}
            <strong>
              <PostAuthor userId={post.userId} />
            </strong>
          </span>
        </div>
        <div>
          <span>
            Posted <TimeAgo timestamp={post.date} />
          </span>
          <br />
          <ReactionButtons post={post} readOnly={true} />
        </div>
        {canEdit && (
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
      </article>
    </section>
  )
}
