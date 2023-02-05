import type { Post } from "~/lib/api/post";
import PostCard from "./PostCard";

interface Props {
  posts: Post[];
}

function PostCardList({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 xl:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} item={post} />
      ))}
    </div>
  );
}

export default PostCardList;
