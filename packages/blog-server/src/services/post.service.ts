import db from '../libs/db';

const postService = {
  async getPostList({ lastId }: { lastId?: number }) {
    const postLimit = 10;
    const posts = await db.post.findMany({
      where: {
        display: 1,
      },
      take: postLimit + 1,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
      orderBy: {
        id: 'desc',
      },
    });

    return { posts, hasMorePost: posts.length > postLimit };
  },
};

export default postService;
