import React from 'react'
//importando o useNavigate e useParams
import { useNavigate, useParams } from 'react-router-dom'

//Importando o useDispatch e useSelector tipado
import { useAppSelector, useAppDispatch } from '@/app/hooks'
//Importando o action creator/reducer postUpdated
import { postUpdated } from '@/features/posts/postsSlice'

//Importando o seletor escolhe o posto pelo Id
import { selectPostById } from '@/features/posts/postsSlice'

interface EditPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface EditPostFormElements extends HTMLFormElement {
  readonly elements: EditPostFormFields
}

export function EditPostForm() {
  //Pegando o parametro 'postId' da URL
  const { postId } = useParams()

  //Buscando com o 'find' na store com 'useAppSelector', 'o post' com o msmo id do parametro
  //Buscando o post pelo id, agora usando o seletor 'selectPostById'
  const post = useAppSelector((state) => selectPostById(state, postId!))

  //Preparando 'dispatch' e 'navigate'
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  //Se não existir o post na store, com id igual ao parametro retorna 'Post not found'
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  //Função para editar o post
  const onSavePostClicked = (e: React.FormEvent<EditPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    if (title && content) {
      //'Dispachando' para a store o post editado
      dispatch(postUpdated({ id: post.id, title, content }))
      //E depois ja navega para a pagina de visualização
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit New Post</h2>
      <form onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle">Post Title</label>
        <input type="text" id="postTitle" defaultValue={post.title} required />
        <label htmlFor="postContent">Content:</label>
        <textarea name="postContent" id="postContent" defaultValue={post.content} required />
        <button>Save Post</button>
      </form>
    </section>
  )
}
