import {KeyService, useApiMutation} from 'repositories/services';
import firestore from '@react-native-firebase/firestore';
import {CategoryFirestoreModel, CategoryModel} from 'models';
import {useQueryClient} from '@tanstack/react-query';
import {GetAllCategoriesOutput} from './getAllCategoris.repo';

type AddCategoryProps = {
  onSuccess?: () => void;
} | void;
type AddCategoryInput = CategoryModel;
type AddCategoryOutput = CategoryFirestoreModel;
export const useAddCategoryRepo = (props: AddCategoryProps) => {
  const queryClient = useQueryClient();

  const {mutate: addCategory, ...rest} = useApiMutation<
    AddCategoryOutput,
    AddCategoryInput
  >({
    mutationKey: [KeyService.ADD_CATEGORY],
    mutationFn: async data => {
      const response = await firestore()
        .collection<CategoryModel>('categories')
        .add(data);
      const category = await response.get();

      category &&
        queryClient.setQueryData<GetAllCategoriesOutput>(
          [KeyService.GET_ALL_CATEGORIES],
          oldData => (oldData ? [category, ...oldData] : oldData),
        );

      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_ALL_CATEGORIES],
      });

      return category;
    },
    ...props,
  });
  return {addCategory, ...rest};
};
