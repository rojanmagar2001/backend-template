import HttpException from './HttpException';
import { toNumber } from './Params';
import { type GetAllParams } from '@/interfaces/services/Admin.Interface';

export const pagination = (data: GetAllParams) => {
  const limit = toNumber(data.limit ?? '10');
  const page = toNumber(data.page ?? '1');

  if (!limit) throw new HttpException(400, 'Invalid Limit sent');

  if (!page) throw new HttpException(400, 'Invalid Page sent');

  const skip = limit * (page - 1);

  return { limit, skip, page };
};

interface PageDocProps {
  page: number;
  limit: number;
  count: number;
}

export const getPageDocs = (data: PageDocProps) => {
  const page = Math.ceil(data.count / data.limit);

  return {
    total: {
      page,
      limit: data.count,
    },
    next: {
      page: data.page + 1 > page ? null : data.page + 1,
      limit: data.limit ? data.limit : data.count,
    },
    prev: {
      page: data.page ? (data.page - 1 <= 0 ? null : data.page - 1) : null,
      limit: data.limit ? data.limit : data.count,
    },
  };
};
