import {KeyService, useApiMutation} from 'repositories/services';
import firestore from '@react-native-firebase/firestore';
import {CategoryFirestoreModel, CategoryModel} from 'models';
import {useQueryClient} from '@tanstack/react-query';
import {GetAllCategoriesOutput} from './getAllCategoris.repo';

type DeleteCategoryInput = CategoryFirestoreModel;
type DeleteCategoryOutput = CategoryFirestoreModel;
export const useDeleteCategoryRepo = () => {
  const queryClient = useQueryClient();

  const {mutate: deleteCategory, ...rest} = useApiMutation<
    DeleteCategoryOutput,
    DeleteCategoryInput
  >({
    mutationKey: [KeyService.DELETE_CATEGORY],
    mutationFn: async category => {
      const {id: deleteId} = category;
      queryClient.setQueryData<GetAllCategoriesOutput>(
        [KeyService.GET_ALL_CATEGORIES],
        oldData => {
          if (!oldData) return oldData;

          const deletedItemCategories = oldData.filter(
            category => category.id !== deleteId,
          );
          return deletedItemCategories;
        },
      );

      await firestore()
        .collection<CategoryModel>('categories')
        .doc(deleteId)
        .delete();

      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_ALL_CATEGORIES],
      });

      return category;
    },
  });
  return {deleteCategory, ...rest};
};
