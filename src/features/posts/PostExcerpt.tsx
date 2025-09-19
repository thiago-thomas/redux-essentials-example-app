import { Link } from "react-router-dom";

import { Post } from "@/features/posts/postsSlice";

import { PostAuthor } from "@/features/posts/PostAuthor";
import { ReactionButtons } from "@/features/posts/ReactionButtons";

import { TimeAgo } from "@/components/TimeAgo";

interface PostExcerptProps {
  post: Post
}

export function PostExcerpt({post}: PostExcerptProps) {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <div>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0,100)}</p>
      <ReactionButtons post={post} readOnly={false} />
    </article>
  )
}