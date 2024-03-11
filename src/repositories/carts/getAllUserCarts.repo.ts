import {
  KeyService,
  categoriesCollectionService,
  useApiQuery,
} from 'repositories/services';
import {CartIdModel, CategoryIdModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetAllUserCartsOutput = CartIdModel[];
export const useGetAllUserCartsRepo = () => {
  const {data: carts, ...rest} = useApiQuery<GetAllUserCartsOutput>({
    queryKey: [KeyService.GET_ALL_USER_CARTS],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      // const rawCategories = await categoriesCollectionService.get();

      // const categories: CategoryIdModel[] = rawCategories.docs.map(
      //   rawCategory => ({
      //     id: rawCategory.id,
      //     ...rawCategory.data(),
      //   }),
      // );

      // return categories;
    },
  });

  return {carts, ...rest};
};
