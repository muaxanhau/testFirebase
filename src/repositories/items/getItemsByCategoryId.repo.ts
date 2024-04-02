import {KeyService, service, useApiInfiniteQuery} from 'repositories/services';
import {ItemIdModel, PaginationResponseBaseModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetItemsByCategoryIdProps = {id: string};
export type GetItemsByCategoryIdOutput = PaginationResponseBaseModel<{
  items: ItemIdModel[];
}>;
export const useGetItemsByCategoryIdRepo = ({
  id,
}: GetItemsByCategoryIdProps) => {
  const {data, hasNextPage, ...rest} =
    useApiInfiniteQuery<GetItemsByCategoryIdOutput>({
      queryKey: [KeyService.GET_ITEMS_BY_CATEGORY_ID, id],
      queryFn: async ({pageParam}) => {
        await utils.sleep(devToolConfig.delayFetching);

        const response = await service.get<GetItemsByCategoryIdOutput>(
          'items',
          {
            params: {
              categoryId: id,
              page: pageParam,
            },
          },
        );
        return response.data;
      },
      initialPageParam: 0,
      getNextPageParam: lastPage =>
        lastPage.totalPage === lastPage.nextPage
          ? undefined
          : lastPage.nextPage,
    });

  const items = data?.pages.reduce<ItemIdModel[]>((prev, curr) => {
    return [...prev, ...curr.items];
  }, []);

  return {items, ...rest};
};
