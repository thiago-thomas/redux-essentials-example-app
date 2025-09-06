import { Link } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
//Importando o seletor para selecionar todos os posts
import { selectAllPosts } from './postsSlice'

export function PostsList() {
  //Buscando a lista de posts com 'useAppSelector'
  //E agora com o seletor 'selectAllPosts'
  const posts = useAppSelector(selectAllPosts)

  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
