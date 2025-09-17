import type { RootState } from '@/app/store'
import { createSlice } from '@reduxjs/toolkit'

import { selectCurrentUsername } from '@/features/auth/authSlice'

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

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  if (currentUsername === null) {
    return undefined
  }
  return selectUserById(state, currentUsername)
}

export default usersSlice.reducer
