import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import { sub, format } from 'date-fns'

import { userLoggedOut } from '@/features/auth/authSlice'
import { createAppAsyncThunk } from '@/app/withTypes'
import { client } from '@/api/client'

export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export type ReactionName = keyof Reactions

//Definindo o tipo TS para o dado do slice (post)
export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
  reactions: Reactions
}

//Pick serve para 'clonar' uma tipagem, pegando apenas os tipos que quer
type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

interface PostsState {
  posts: Post[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get<Post[]>('/fakeApi/posts')
    return response.data
  },
  {
    condition(arg, thunkApi) {
      const postStatus = selectPostsStatus(thunkApi.getState())
      if (postStatus !== 'idle') {
        return false
      }
    },
  },
)

//Criando o initialState
const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
}

//Criando o Slice passando o initialState
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    //DICA: Nomeclatura boa para reducer é colocar uma ação no passado (Ex: postAdded)
    //Reducer de adicionar o post passando o state, e a action tipada
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload) //Atualizando a lista imutavelmente com immer
      },
      //`prepare` serve para pré-processar os dados da action
      // antes de chegar ao reducer, garantindo que o formato
      // esteja correto e que informações adicionais (como o `id`)
      // sejam incluídas automaticamente.
      prepare(title: string, content: string, user: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user,
            date: new Date().toISOString(),
            reactions: initialReactions,
          },
        }
      },
    },
    //Reducer de editar o post com immer (não esquecer)
    postUpdated: (state, action: PayloadAction<PostUpdate>) => {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: ReactionName }>) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  //Criando os selectors dentro so createSlice
  selectors: {
    //Note que todos esses selectors são dados apenas o 'PostState'
    //como argumento e não o 'RootState' inteiro
    selectAllPosts: (postState) => postState.posts,
    selectPostById: (postState, postId: string) => {
      return postState.posts.find((post) => post.id === postId)
    },
    selectPostsStatus: (postState) => postState.status,
    selectPostsError: (postState) => postState.error,
  },

  //Reducers vs ExtraReducers
  //Reducers: Use para definir novas actions como parte de um slice
  //ExtraReducers: Use para manipular ações que foram definidas 'fora' do slice

  extraReducers: (builder) => {
    //'Ouve' a 'action creator', e realiza algo como a action é execultada
    builder
      .addCase(userLoggedOut, (state) => {
        //Aqui limpa os posts, quando a 'action creator' for execultada
        return initialState
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts.push(...action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
  },
})

//Exportando os selectors que foram criados dentro do createSlice
export const { selectAllPosts, selectPostById, selectPostsStatus, selectPostsError } = postsSlice.selectors

//Exportando as action creators
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

//Exportando a função reducer gerada
export default postsSlice.reducer

//Exportando os selectors
/* 
/ //Criando fora do createSlice
export const selectAllPosts = (state: RootState) => state.posts
export const selectPostById = (state: RootState, postId: string) =>
  state.posts.find((post) => post.id === postId)
*/
