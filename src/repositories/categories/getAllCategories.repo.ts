import {KeyService, clientService, useApiQuery} from 'repositories/services';
import {CategoryIdModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetAllCategoriesOutput = CategoryIdModel[];
export const useGetAllCategoriesRepo = () => {
  const {data: categories, ...rest} = useApiQuery<GetAllCategoriesOutput>({
    queryKey: [KeyService.GET_ALL_CATEGORIES],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await clientService.get<GetAllCategoriesOutput>(
        'categories',
      );
      const categories = response.data;

      return categories;
    },
  });

  return {categories, ...rest};
};
