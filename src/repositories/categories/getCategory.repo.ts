import {
  KeyService,
  categoriesCollectionService,
  useApiQuery,
} from 'repositories/services';
import {CategoryIdModel} from 'models';
import {useQueryClient} from '@tanstack/react-query';
import {GetAllCategoriesOutput} from './getAllCategories.repo';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetCategoryProps = {id: string};
export type GetCategoryOutput = CategoryIdModel;
export const useGetCategoryRepo = ({id}: GetCategoryProps) => {
  const queryClient = useQueryClient();
  const localCategory = queryClient
    .getQueryData<GetAllCategoriesOutput>([KeyService.GET_ALL_CATEGORIES])
    ?.find(category => category.id === id);

  const {data: category, ...rest} = useApiQuery<GetCategoryOutput>({
    queryKey: [KeyService.GET_CATEGORY, id],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const rawCategory = await categoriesCollectionService.doc(id).get();
      const category: CategoryIdModel = {
        id: rawCategory.id,
        ...rawCategory.data()!,
      };
      return category;
    },
    initialData: localCategory,
  });

  return {category, ...rest};
};
