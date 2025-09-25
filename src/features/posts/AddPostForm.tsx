import React, { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
//Importando o useDispatch tipado
import { useAppDispatch, useAppSelector } from '@/app/hooks'
//Importando o tipo do Post, e o action creator
import { addNewPost, type Post } from '@/features/posts/postsSlice'

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
  const [addRequestStatus, setAddRequestStatus] = useState<'idle' | 'pending'>('idle')

  const dispatch = useAppDispatch()

  // Aqui, 'user' nunca será considerado undefined pelo TypeScript
  const user = useAppSelector(selectCurrentUser)!

  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const titleForm = elements.postTitle.value
    const contentForm = elements.postContent.value

    const form = e.currentTarget

    try {
      setAddRequestStatus('pending')
      await dispatch(
        addNewPost({
          title: titleForm,
          content: contentForm,
          user: user.id,
        }),
      ).unwrap()
    } catch (error) {
      console.error('Failed to save the post: ', error)
    } finally {
      setAddRequestStatus('idle')
    }

    //Agora nos podemos passar em parametros separados,
    //E o ID será gerado automaticamente
    //dispatch(postAdded(titleForm, contentForm, user.id))

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
        <button type="submit" disabled={addRequestStatus !== 'idle'}>
          Save Post
        </button>
      </form>
    </section>
  )
}
