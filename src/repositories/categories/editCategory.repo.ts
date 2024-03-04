import {
  FirestoreCollectionService,
  KeyService,
  useApiMutation,
} from 'repositories/services';
import firestore from '@react-native-firebase/firestore';
import {CategoryFirestoreModel, CategoryModel} from 'models';
import {useQueryClient} from '@tanstack/react-query';
import {GetAllCategoriesOutput} from './getAllCategoris.repo';

type EditCategoryProps = {
  onSuccess: () => void;
} | void;
type EditCategoryInput = {id: string} & CategoryModel;
type EditCategoryOutput = CategoryFirestoreModel;
export const useEditCategoryRepo = (props: EditCategoryProps) => {
  const queryClient = useQueryClient();

  const {mutate: editCategory, ...rest} = useApiMutation<
    EditCategoryOutput,
    EditCategoryInput
  >({
    mutationKey: [KeyService.EDIT_CATEGORY],
    mutationFn: async ({id, name, description, image}) => {
      const allCategories = queryClient.getQueryData<GetAllCategoriesOutput>([
        KeyService.GET_ALL_CATEGORIES,
      ]);
      const currentCategory = allCategories?.find(
        category => category.id === id,
      )!;
      const newCategory: CategoryFirestoreModel = {
        ...currentCategory,
        data: () => {
          return {
            name,
            description,
            image,
          };
        },
      };

      queryClient.setQueryData<GetAllCategoriesOutput>(
        [KeyService.GET_ALL_CATEGORIES],
        oldData => {
          if (!oldData) return oldData;

          const editedItemCategories = oldData.map(category =>
            category.id === id ? newCategory : category,
          );
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

      return newCategory;
    },
    ...props,
  });
  return {editCategory, ...rest};
};
