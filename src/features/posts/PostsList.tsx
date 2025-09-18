import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

//Importando o seletor para selecionar todos os posts
import { fetchPosts, selectAllPosts, selectPostsStatus } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { useEffect } from 'react'

export function PostsList() {
  const dispatch = useAppDispatch()

  //Buscando a lista de posts com 'useAppSelector'
  //E agora com o seletor 'selectAllPosts'
  const posts = useAppSelector(selectAllPosts)

  //Codigo para iniciar a busca de posts na api com 'Thunks'
  const postStatus = useAppSelector(selectPostsStatus)
  useEffect(() => {
    if (postStatus === 'idle') {
      //Envia a ação, execulta o thunk, e dps o extraReducer do posts 'ouça' e faça algo.
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <div>
        <span>
          Post made by{' '}
          <strong>
            <PostAuthor userId={post.userId} />
          </strong>
        </span>
      </div>
      <span>
        Posted <TimeAgo timestamp={post.date} />
      </span>
      <br />
      <ReactionButtons post={post} readOnly={false} />
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
