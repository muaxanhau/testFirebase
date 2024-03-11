import {
  KeyService,
  categoriesCollectionService,
  useApiMutation,
} from 'repositories/services';
import {CategoryIdModel} from 'models';
import {useQueryClient} from '@tanstack/react-query';
import {GetAllCategoriesOutput} from './getAllCategories.repo';
import {utils} from 'utils';
import {devToolConfig} from 'config';

type EditCategoryProps = {onSuccess: () => void} | void;
type EditCategoryInput = CategoryIdModel;
type EditCategoryOutput = void;
export const useEditCategoryRepo = (props: EditCategoryProps) => {
  if (typeof props !== 'undefined') {
    props.onSuccess;
  }
  const queryClient = useQueryClient();

  const {mutate: editCategory, ...rest} = useApiMutation<
    EditCategoryOutput,
    EditCategoryInput
  >({
    mutationKey: [KeyService.EDIT_CATEGORY],
    mutationFn: async ({id, name, description, image}) => {
      await utils.sleep(devToolConfig.delayFetching);

      await categoriesCollectionService
        .doc(id)
        .update({name, description, image});
    },
    onMutate: ({id, name, description, image}) => {
      queryClient.setQueryData<GetAllCategoriesOutput>(
        [KeyService.GET_ALL_CATEGORIES],
        oldData => {
          if (!oldData) return oldData;

          const editedItemCategories: GetAllCategoriesOutput = oldData.map(
            category => {
              if (category.id !== id) return category;

              return {
                ...category,
                name,
                description,
                image,
              };
            },
          );
          return editedItemCategories;
        },
      );
    },
    onSettled: (_1, _2, {id}) => {
      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_ALL_CATEGORIES],
      });
      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_CATEGORY, id],
      });
    },
    ...props,
  });
  return {editCategory, ...rest};
};
