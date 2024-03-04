import {
  FirestoreCollectionService,
  KeyService,
  useApiQuery,
} from 'repositories/services';
import firestore from '@react-native-firebase/firestore';
import {CategoryFirestoreModel, CategoryModel} from 'models';
import {useQueryClient} from '@tanstack/react-query';

export type GetCategoryProps = {id: string};
export type GetCategoryOutput = CategoryFirestoreModel;
export const useGetCategoryRepo = ({id}: GetCategoryProps) => {
  const queryClient = useQueryClient();

  const {data: category, ...rest} = useApiQuery<GetCategoryOutput>({
    queryKey: [KeyService.GET_CATEGORY, id],
    queryFn: async () => {
      const category = await firestore()
        .collection<CategoryModel>(FirestoreCollectionService.CATEGORIES)
        .doc(id)
        .get();

      return category;
    },
  });

  return {category, ...rest};
};
