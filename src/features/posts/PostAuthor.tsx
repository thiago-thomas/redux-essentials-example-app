import { useAppSelector } from '@/app/hooks'

import { selectUserById } from '../users/usersSlice'

interface PostAuthorProps {
  userId: string
}

export function PostAuthor({ userId }: PostAuthorProps) {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return <>{author?.name ?? 'Anomymous'}</>
}
