import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    postAdded: (state, action: PayloadAction<Post>) => {
      state.push(action.payload) //Atualizando a lista imutavelmente com immer
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
})

//Exportando as action creators
export const { postAdded, postUpdated } = postsSlice.actions

//Exportando a função reducer gerada
export default postsSlice.reducer
