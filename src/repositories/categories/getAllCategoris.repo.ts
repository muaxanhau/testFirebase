import {
  FirestoreCollectionService,
  KeyService,
  useApiQuery,
} from 'repositories/services';
import firestore from '@react-native-firebase/firestore';
import {CategoryFirestoreModel, CategoryModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetAllCategoriesOutput = CategoryFirestoreModel[];
export const useGetAllCategoriesRepo = () => {
  const {data: categories, ...rest} = useApiQuery<GetAllCategoriesOutput>({
    queryKey: [KeyService.GET_ALL_CATEGORIES],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);
      const rawCategories = await firestore()
        .collection<CategoryModel>(FirestoreCollectionService.CATEGORIES)
        .get();

      const categories: CategoryFirestoreModel[] = [];
      rawCategories.forEach(category =>
        categories.push({id: category.id, ...category.data()}),
      );

      return categories;
    },
  });

  return {categories, ...rest};
};
