import { createSlice } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
}

const initialState: User[] = [
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
})

export const { selectAllUsers, selectUserById } = usersSlice.selectors

export default usersSlice.reducer
