//Configuração da store
import { configureStore } from '@reduxjs/toolkit'
//Importando o Slice da Posts
import postsReducer from '@/features/posts/postsSlice'
//Importando o Slice do Users
import usersReducer from '@/features/users/usersSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer
  }
})

//Infere-se ao tipo da 'store'
export type AppStore = typeof store

//Infere-se ao "tipo" da 'useDispatch' e do 'useSelector'
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState> 