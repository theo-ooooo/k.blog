import { Post, User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import apiError from '../libs/apiError';
import db from '../libs/db';
import _ from 'lodash';

interface postParams {
  postId: number;
  title: string;
  content: string;
  tags?: number[];
  display: number;
  thumbnailId?: number;
}

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
  async getPost({ slug }: { slug: string }) {
    const post = await db.post.findFirst({
      where: { slug, display: 1 },
      include: {
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });
    if (!post) {
      throw new apiError(StatusCodes.NOT_FOUND, 'post not found');
    }
    return post;
  },
  async createPostTags(tags: number[], post: Post) {
    await db.postTag.createMany({
      data: _.map(tags, (tagId) => {
        return { postId: post.id, tagId };
      }),
    });
  },

  async createSlug(title: string) {
    const reqExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
    const specialCharacters = title.replace(reqExp, '');
    let slugTitle = specialCharacters.replace(/ /g, '-');
    const findSlug = await db.post.findUnique({ where: { slug: slugTitle } });

    if (findSlug) {
      slugTitle = slugTitle + '-' + Math.random().toString(36).substr(2, 11);
    }
    return slugTitle;
  },

  async deletePostTags(postId: number) {
    await db.postTag.deleteMany({ where: { postId } });
  },

  async createPost(userId: number, { title, content, tags, display, thumbnailId }: postParams) {
    const slugTitle = await this.createSlug(title);
    const post = await db.post.create({
      data: {
        title,
        content,
        display,
        thumbnailId,
        userId,
        slug: slugTitle,
      },
    });
    if (tags && tags.length) {
      await this.createPostTags(tags, post);
    }
    return { message: 'SUCCESS' };
  },

  async updatePost(
    userId: number,
    { postId, title, content, tags, display, thumbnailId }: postParams
  ) {
    const exists = await db.post.findUnique({ where: { id: postId }, include: { user: true } });
    if (!exists) {
      throw new apiError(StatusCodes.NOT_FOUND, 'post not found');
    }
    if (exists.userId !== userId) {
      throw new apiError(StatusCodes.FORBIDDEN, 'user not match');
    }

    const slugTitle = await this.createSlug(title);

    await db.post.update({
      where: { id: postId },
      data: { title, content, display, thumbnailId, slug: slugTitle },
    });

    await this.deletePostTags(postId);
    if (tags && tags.length) {
      await this.createPostTags(tags, exists);
    }
    return { message: 'SUCCESS' };
  },
};

export default postService;
