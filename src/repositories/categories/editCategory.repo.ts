import {
  FirestoreCollectionService,
  KeyService,
  useApiMutation,
} from 'repositories/services';
import firestore from '@react-native-firebase/firestore';
import {CategoryFirestoreModel, CategoryModel} from 'models';
import {useQueryClient} from '@tanstack/react-query';
import {GetAllCategoriesOutput} from './getAllCategoris.repo';
import {utils} from 'utils';
import {devToolConfig} from 'config';

type EditCategoryProps = {onSuccess: () => void} | void;
type EditCategoryInput = {id: string} & CategoryModel;
type EditCategoryOutput = void;
export const useEditCategoryRepo = (props: EditCategoryProps) => {
  const queryClient = useQueryClient();

  const {mutate: editCategory, ...rest} = useApiMutation<
    EditCategoryOutput,
    EditCategoryInput
  >({
    mutationKey: [KeyService.EDIT_CATEGORY],
    mutationFn: async ({id, name, description, image}) => {
      await utils.sleep(devToolConfig.delayFetching);
      queryClient.setQueryData<GetAllCategoriesOutput>(
        [KeyService.GET_ALL_CATEGORIES],
        oldData => {
          if (!oldData) return oldData;

          const editedItemCategories = oldData.map(category => {
            if (category.id !== id) return category;

            return {
              ...category,
              data: () => ({
                name,
                description,
                image,
              }),
            };
          });
          return editedItemCategories;
        },
      );

      await firestore()
        .collection<CategoryModel>(FirestoreCollectionService.CATEGORIES)
        .doc(id)
        .update({name, description, image});

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
