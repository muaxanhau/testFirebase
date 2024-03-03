import {KeyService, useApiMutation} from 'repositories/services';
import firestore from '@react-native-firebase/firestore';
import {CategoryModel} from 'models';

type AddCategoryProps = {
  onSuccess?: () => void;
};
type AddCategoryInput = CategoryModel;
type AddCategoryOutput = null;
export const useAddCategoryRepo = ({onSuccess}: AddCategoryProps) => {
  const {mutate: addCategory, ...rest} = useApiMutation<
    AddCategoryOutput,
    AddCategoryInput
  >({
    mutationKey: [KeyService.ADD_CATEGORY],
    mutationFn: async data => {
      const response = await firestore()
        .collection<CategoryModel>('categories')
        .add(data);
      const category = (await response.get()).data();

      return null;
    },
    onSuccess,
  });
  return {addCategory, ...rest};
};
