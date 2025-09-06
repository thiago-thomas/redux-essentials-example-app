import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
//Importando o useDispatch tipado
import { useAppDispatch } from '@/app/hooks'
//Importando o tipo do Post, e o action creator
import { type Post, postAdded } from '@/features/posts/postsSlice'

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export function AddPostForm() {
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const titleForm = elements.postTitle.value
    const contentForm = elements.postContent.value

    //Agora nos podemos passar em parametros separados,
    //E o ID será gerado automaticamente
    dispatch(postAdded(titleForm, contentForm))

    console.log({ titleForm, contentForm })
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
