import PostCard from "./PostCard";

function PostCardList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 xl:grid-cols-3">
      {[...new Array(20)].map((_, i) => (
        <PostCard key={i} />
      ))}
    </div>
  );
}

export default PostCardList;
