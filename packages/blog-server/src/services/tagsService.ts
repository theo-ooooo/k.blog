import { StatusCodes } from 'http-status-codes';
import apiError from '../libs/apiError';
import db from '../libs/db';

interface tagParams {
  id?: number;
  name: string;
  display?: number;
}

const getTagList = async () => {
  const tags = await db.tag.findMany({ where: { display: 1 }, orderBy: { id: 'desc' } });

  return { tags };
};

const getTagByName = async ({ name }: tagParams) => {
  return await db.tag.findUnique({ where: { name } });
};

const getTagById = async ({ id }: { id: number }) => {
  return await db.tag.findUnique({ where: { id } });
};

const createTag = async ({ name, display = 1 }: tagParams) => {
  const tag = await getTagByName({ name });
  if (tag) {
    throw new apiError(StatusCodes.BAD_REQUEST, 'tag exists');
  }
  return await db.tag.create({ data: { name, display } });
};

const updateTag = async ({ id, name, display }: tagParams) => {
  if (id && name) {
    const tagNameExists = await getTagByName({ name });
    const tagIdExists = await getTagById({ id });

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
};

export default { getTagList, createTag, updateTag };
