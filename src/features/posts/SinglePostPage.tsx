import { Link, useParams } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
//Importando o seletor escolhe o posto pelo Id
import { selectPostById } from './postsSlice'
import { PostAuthor } from './PostAuthor'

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
        <span>
          Post made by <PostAuthor userId={post.userId} />
        </span>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}
