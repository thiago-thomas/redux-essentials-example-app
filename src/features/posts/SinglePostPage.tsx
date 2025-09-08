import { Link, useParams } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
//Importando o seletor escolhe o posto pelo Id
import { selectPostById } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'

export const SinglePostPage = () => {
  const { postId } = useParams()
  //Buscando o post pelo id, agora usando o seletor 'selectPostById'
  const post = useAppSelector((state) => selectPostById(state, postId!))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

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
        </div>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}
