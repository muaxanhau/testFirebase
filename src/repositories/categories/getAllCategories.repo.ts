import {
  KeyService,
  categoriesCollectionService,
  useApiQuery,
} from 'repositories/services';
import {CategoryIdModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetAllCategoriesOutput = CategoryIdModel[];
export const useGetAllCategoriesRepo = () => {
  const {data: categories, ...rest} = useApiQuery<GetAllCategoriesOutput>({
    queryKey: [KeyService.GET_ALL_CATEGORIES],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const rawCategories = await categoriesCollectionService.get();

      const categories: CategoryIdModel[] = rawCategories.docs.map(
        rawCategory => ({
          id: rawCategory.id,
          ...rawCategory.data(),
        }),
      );

      return categories;
    },
  });

  return {categories, ...rest};
};
