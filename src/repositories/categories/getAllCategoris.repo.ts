import {KeyService, useApiQuery} from 'repositories/services';
import firestore from '@react-native-firebase/firestore';
import {CategoryModel} from 'models';

export type GetAllCategoriesOutput = CategoryModel[];
export const useGetAllCategoriesRepo = () => {
  const {data: categories, ...rest} = useApiQuery<GetAllCategoriesOutput>({
    queryKey: [KeyService.GET_ALL_CATEGORIES],
    queryFn: async () => {
      const data = await firestore()
        .collection<CategoryModel>('categories')
        .get();
      const categories: CategoryModel[] = [];
      data.forEach(category => categories.push(category.data()));

      return categories;
    },
  });

  return {categories, ...rest};
};
