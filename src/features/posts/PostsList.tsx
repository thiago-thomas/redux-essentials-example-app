import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'

//Importando o seletor para selecionar todos os posts
import { fetchPosts, selectAllPosts, selectPostsError, selectPostsStatus } from '@/features/posts/postsSlice'

import { PostExcerpt } from '@/features/posts/PostExcerpt'

import { Spinner } from '@/components/Spinner'

export function PostsList() {
  const dispatch = useAppDispatch()

  //Buscando a lista de posts com 'useAppSelector'
  //E agora com o seletor 'selectAllPosts'
  const posts = useAppSelector(selectAllPosts)

  //Codigo para iniciar a busca de posts na api com 'Thunks'
  const postStatus = useAppSelector(selectPostsStatus)

  const postsError = useAppSelector(selectPostsError)

  useEffect(() => {
    if (postStatus === 'idle') {
      //Envia a ação, execulta o thunk, e dps o extraReducer do posts 'ouça' e faça algo.
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content: React.ReactNode

  if (postStatus === 'pending') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => <PostExcerpt post={post} />)
  } else if (postStatus === 'failed') {
    content = (
      <div>
        <h4>Error while fetch posts: </h4>
        <p>{postsError}</p>
      </div>
    )
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
