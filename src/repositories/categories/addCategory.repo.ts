import {KeyService, useApiMutation} from 'repositories/services';
import firestore from '@react-native-firebase/firestore';
import {CategoryModel} from 'models';

type AddCategoryOutput = CategoryModel[];
export const useAddCategoryRepo = () => {
  //   const {data: categories, ...rest} = useApiMutation<AddCategoryOutput>({
  //     mutationKey: [KeyService.GET_ALL_CATEGORIES],
  //     mutationFn: async () => {
  //       const data = await firestore()
  //         .collection<CategoryModel>('categories')
  //         .add({})
  //       const categories: CategoryModel[] = [];
  //       data.forEach(category => categories.push(category.data()));
  //       return categories;
  //     },
  //   });
  //   return {categories, ...rest};
};
