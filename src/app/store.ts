//Configuração da store
import { configureStore } from '@reduxjs/toolkit'

//Importando os Reduces dos Slices
import postsReducer from '@/features/posts/postsSlice'
import usersReducer from '@/features/users/usersSlice'
import authReducers from '@/features/auth/authSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    auth: authReducers,
  },
})

//Infere-se ao tipo da 'store'
export type AppStore = typeof store

//Infere-se ao "tipo" da 'useDispatch' e do 'useSelector'
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
