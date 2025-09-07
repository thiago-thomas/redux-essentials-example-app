import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
//Importando o useDispatch tipado
import { useAppDispatch, useAppSelector } from '@/app/hooks'
//Importando o tipo do Post, e o action creator
import { type Post, postAdded } from '@/features/posts/postsSlice'

import { selectAllUsers } from '@/features/users/usersSlice'

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
  const users = useAppSelector(selectAllUsers)

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const titleForm = elements.postTitle.value
    const contentForm = elements.postContent.value
    const userId = elements.postAuthor.value

    //Agora nos podemos passar em parametros separados,
    //E o ID será gerado automaticamente
    dispatch(postAdded(titleForm, contentForm, userId))

    console.log({ titleForm, contentForm, userId }) //Testando no console.log
    e.currentTarget.reset()
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title</label>
        <input type="text" id="postTitle" defaultValue="" placeholder="Put the post title" required />
        <label htmlFor="postContent">Content:</label>
        <textarea name="postContent" id="postContent" defaultValue="" required placeholder="Write the content" />
        <label htmlFor="postAuthor">Author:</label>
        <select name="postAuthor" id="postAuthor" required>
          <option value=""></option>
          {userOptions}
        </select>
        <button>Save Post</button>
      </form>
    </section>
  )
}
