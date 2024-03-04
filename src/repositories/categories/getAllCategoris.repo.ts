import {
  FirestoreCollectionService,
  KeyService,
  useApiQuery,
} from 'repositories/services';
import firestore from '@react-native-firebase/firestore';
import {CategoryFirestoreModel, CategoryModel} from 'models';

export type GetAllCategoriesOutput = CategoryFirestoreModel[];
export const useGetAllCategoriesRepo = () => {
  const {data: categories, ...rest} = useApiQuery<GetAllCategoriesOutput>({
    queryKey: [KeyService.GET_ALL_CATEGORIES],
    queryFn: async () => {
      const data = await firestore()
        .collection<CategoryModel>(FirestoreCollectionService.CATEGORIES)
        .get();

      const categories: CategoryFirestoreModel[] = [];
      data.forEach(category => categories.push(category));

      return categories;
    },
  });

  return {categories, ...rest};
};
