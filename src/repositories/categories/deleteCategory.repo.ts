import {
  KeyService,
  categoriesCollectionService,
  useApiMutation,
} from 'repositories/services';
import {useQueryClient} from '@tanstack/react-query';
import {GetAllCategoriesOutput} from './getAllCategories.repo';
import {utils} from 'utils';
import {devToolConfig} from 'config';

type DeleteCategoryInput = {id: string};
type DeleteCategoryOutput = void;
export const useDeleteCategoryRepo = () => {
  const queryClient = useQueryClient();

  const {mutate: deleteCategory, ...rest} = useApiMutation<
    DeleteCategoryOutput,
    DeleteCategoryInput
  >({
    mutationKey: [KeyService.DELETE_CATEGORY],
    mutationFn: async ({id}) => {
      await utils.sleep(devToolConfig.delayFetching);

      queryClient.setQueryData<GetAllCategoriesOutput>(
        [KeyService.GET_ALL_CATEGORIES],
        oldData => {
          if (!oldData) return oldData;

          const deletedItemCategories = oldData.filter(
            category => category.id !== id,
          );
          return deletedItemCategories;
        },
      );

      await categoriesCollectionService.doc(id).delete();

      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_ALL_CATEGORIES],
      });
    },
  });
  return {deleteCategory, ...rest};
};
