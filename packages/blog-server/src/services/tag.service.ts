import { StatusCodes } from 'http-status-codes';
import apiError from '../libs/apiError';
import db from '../libs/db';

interface tagParams {
  id?: number;
  name: string;
  display?: number;
}

const tagService = {
  async getTagList() {
    const tags = await db.tag.findMany({
      select: {
        id: true,
        name: true,
      },
      where: { display: 1 },
      orderBy: { id: 'desc' },
    });

    return { tags };
  },

  async getTagByName({ name }: tagParams) {
    return await db.tag.findUnique({ where: { name } });
  },

  async getTagById({ id }: { id: number }) {
    return await db.tag.findUnique({ where: { id } });
  },

  async createTag({ name, display = 1 }: tagParams) {
    const tag = await tagService.getTagByName({ name });
    if (tag) {
      throw new apiError(StatusCodes.BAD_REQUEST, 'tag exists');
    }
    return await db.tag.create({ data: { name, display } });
  },

  async updateTag({ id, name, display }: tagParams) {
    if (id && name) {
      const tagNameExists = await tagService.getTagByName({ name });
      const tagIdExists = await tagService.getTagById({ id });

      if (!tagIdExists) {
        throw new apiError(StatusCodes.NOT_FOUND, `tag not found`);
      }

      if (tagNameExists) {
        if (tagNameExists.id !== id) {
          throw new apiError(StatusCodes.BAD_REQUEST, 'tag name exists');
        }
      }
      return await db.tag.update({ where: { id }, data: { name, display } });
    } else {
      throw new apiError(StatusCodes.BAD_REQUEST, `request body confirm`);
    }
  },
};

export default tagService;
