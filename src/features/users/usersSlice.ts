import type { RootState } from '@/app/store'
import { createSlice } from '@reduxjs/toolkit'

import { client } from '@/api/client'

import { selectCurrentUsername } from '@/features/auth/authSlice'

import { createAppAsyncThunk } from '@/app/withTypes'


interface User {
  id: string
  name: string
}

//Função para buscar pela API com o Thunk
export const fetchUsers = createAppAsyncThunk('users/fetchUsers', 
  async() => {
    const response = await client.get<User[]>('/fakeapi/users')
    console.log(response.data)
    return response.data
  }
)

//Zerando o intialState do usuario para a chegada dos dados pela API
const initialState: User[] = []

const dummyUsers: User[] = [
  { id: '0', name: 'Chris' },
  { id: '1', name: 'Shermie' },
  { id: '2', name: 'Yashiro' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  selectors: {
    selectAllUsers: (userState) => userState,
    selectUserById: (userState, userId: string) => {
      return userState.find((user) => user.id === userId)
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const { selectAllUsers, selectUserById } = usersSlice.selectors

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  if (currentUsername === null) {
    return undefined
  }
  return selectUserById(state, currentUsername)
}

export default usersSlice.reducer
