import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

//Definindo o tipo TS para o dado do slice (post)
export interface Post {
  id: string
  title: string
  content: string
}

//Criando o initialState
const initialState: Post[] = [
  { id: '1', title: '1° Post', content: 'Learning Redux part 01' },
  { id: '2', title: '2° Post', content: 'Learning Redux part 02' },
]

//Criando o Slice passando o initialState
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    //DICA: Nomeclatura boa para reducer é colocar uma ação no passado (Ex: postAdded)
    //Reducer de adicionar o post passando o state, e a action tipada
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload) //Atualizando a lista imutavelmente com immer
      },
      //`prepare` serve para pré-processar os dados da action
      // antes de chegar ao reducer, garantindo que o formato 
      // esteja correto e que informações adicionais (como o `id`) 
      // sejam incluídas automaticamente.
      prepare(title: string, content: string) {
        return {
          payload: { id: nanoid(), title, content }
        }
      }
    },
    //Reducer de editar o post com immer (não esquecer)
    postUpdated: (state, action: PayloadAction<Post>) => {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  //Criando os selectors dentro so createSlice
  selectors: {
    //Note que todos esses selectors são dados apenas o 'PostState'
    //como argumento e não o 'RootState' inteiro
    selectAllPosts: postState => postState,
    selectPostById: (postState, postId: string) => {
      return postState.find((post) => post.id === postId)
    }
  }
})

//Exportando os selectors que foram criados dentro do createSlice
export const { selectAllPosts, selectPostById  } = postsSlice.selectors

//Exportando as action creators
export const { postAdded, postUpdated } = postsSlice.actions

//Exportando a função reducer gerada
export default postsSlice.reducer

//Exportando os selectors
/* 
/ //Criando fora do createSlice
export const selectAllPosts = (state: RootState) => state.posts
export const selectPostById = (state: RootState, postId: string) =>
  state.posts.find((post) => post.id === postId)
*/