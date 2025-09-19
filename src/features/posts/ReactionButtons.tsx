import { useAppDispatch } from '@/app/hooks'

import type { Post, ReactionName } from './postsSlice'
import { reactionAdded } from './postsSlice'

const reactionEmoji: Record<ReactionName, string> = {
  thumbsUp: '👍',
  tada: '🥁',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

interface ReactionButtonsProps {
  post: Post
  readOnly: boolean
}

export function ReactionButtons({ post, readOnly }: ReactionButtonsProps) {
  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([stringName, emoji]) => {
    const reaction = stringName as ReactionName

    return (
      <button
        disabled={readOnly}
        key={reaction}
        type="button"
        className="muted-button reaction-button"
        onClick={!readOnly ? () => dispatch(reactionAdded({ postId: post.id, reaction })) : undefined}
      >
        {emoji} {post.reactions[reaction]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
