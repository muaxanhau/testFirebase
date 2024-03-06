import {
  FirestoreCollectionService,
  KeyService,
  useApiQuery,
} from 'repositories/services';
import firestore from '@react-native-firebase/firestore';
import {CategoryFirestoreModel, CategoryModel} from 'models';
import {useQueryClient} from '@tanstack/react-query';
import {GetAllCategoriesOutput} from './getAllCategoris.repo';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetCategoryProps = {id: string};
export type GetCategoryOutput = CategoryFirestoreModel;
export const useGetCategoryRepo = ({id}: GetCategoryProps) => {
  const queryClient = useQueryClient();
  const localCategory = queryClient
    .getQueryData<GetAllCategoriesOutput>([KeyService.GET_ALL_CATEGORIES])
    ?.find(category => category.id === id);

  const {data: category, ...rest} = useApiQuery<GetCategoryOutput>({
    queryKey: [KeyService.GET_CATEGORY, id],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);
      const currentCategory = await firestore()
        .collection<CategoryModel>(FirestoreCollectionService.CATEGORIES)
        .doc(id)
        .get();

      return currentCategory;
    },
    initialData: localCategory,
  });

  return {category, ...rest};
};
