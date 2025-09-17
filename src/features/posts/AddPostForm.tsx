import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
//Importando o useDispatch tipado
import { useAppDispatch, useAppSelector } from '@/app/hooks'
//Importando o tipo do Post, e o action creator
import { type Post, postAdded } from '@/features/posts/postsSlice'

import { selectCurrentUser } from '@/features/users/usersSlice'

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  postAuthor: HTMLSelectElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export function AddPostForm() {
  const dispatch = useAppDispatch()

  // Aqui, 'user' nunca será considerado undefined pelo TypeScript
  const user = useAppSelector(selectCurrentUser)!

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const titleForm = elements.postTitle.value
    const contentForm = elements.postContent.value

    //Agora nos podemos passar em parametros separados,
    //E o ID será gerado automaticamente
    dispatch(postAdded(titleForm, contentForm, user.id))

    console.log(titleForm, contentForm, user.id) //Testando no console.log
    e.currentTarget.reset()
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title</label>
        <input type="text" id="postTitle" defaultValue="" placeholder="Put the post title" required />
        <label htmlFor="postContent">Content:</label>
        <textarea name="postContent" id="postContent" defaultValue="" required placeholder="Write the content" />
        <button>Save Post</button>
      </form>
    </section>
  )
}
