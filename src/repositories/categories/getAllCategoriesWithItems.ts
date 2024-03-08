import {KeyService, useApiQuery} from 'repositories/services';
import {CategoryIdModel, ItemIdModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';
import {useGetAllCategoriesRepo} from './getAllCategories.repo';
import {useGetAllItemsRepo} from 'repositories/items';
import {useEffect} from 'react';

export type GetAllCategoriesWithItemsOutput = (CategoryIdModel & {
  items: ItemIdModel[];
})[];
export const useGetAllCategoriesAndItemsRepo = () => {
  const {categories} = useGetAllCategoriesRepo();
  const {items} = useGetAllItemsRepo();

  const {
    data: categoriesWithItems,
    refetch,
    ...rest
  } = useApiQuery<GetAllCategoriesWithItemsOutput>({
    queryKey: [KeyService.GET_ALL_CATEGORIES_WITH_ITEMS],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const categoriesWithItems: GetAllCategoriesWithItemsOutput =
        categories?.map(category => ({
          ...category,
          items:
            items?.filter(item => item.categoryId.id === category.id) || [],
        })) || [];

      return categoriesWithItems;
    },
  });

  useEffect(() => {
    refetch();
  }, [categories?.length, items?.length]);

  return {categoriesWithItems, refetch, ...rest};
};
