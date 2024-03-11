import {
  KeyService,
  cartsCollectionService,
  categoriesCollectionService,
  useApiMutation,
} from 'repositories/services';
import {CartIdModel, CartModel, CategoryIdModel, CategoryModel} from 'models';
import {useQueryClient} from '@tanstack/react-query';
import {utils} from 'utils';
import {devToolConfig} from 'config';

type AddCartProps = {onSuccess?: () => void} | void;
type AddCartInput = CartModel;
type AddCartOutput = CartIdModel;
export const useAddCartRepo = (props: AddCartProps) => {
  const queryClient = useQueryClient();

  const {mutate: addCart, ...rest} = useApiMutation<
    AddCartOutput,
    AddCartInput
  >({
    mutationKey: [KeyService.ADD_CART],
    mutationFn: async data => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await cartsCollectionService.add(data);
      const rawCart = await response.get();

      const cart: CartIdModel = {
        id: rawCart.id,
        ...rawCart.data()!,
      };

      return cart;
    },
    onSuccess: cart => {
      // queryClient.setQueryData<GetAllCategoriesOutput>(
      //   [KeyService.GET_ALL_CATEGORIES],
      //   oldData => (oldData ? [category, ...oldData] : oldData),
      // );

      if (typeof props === 'undefined') return;
      props.onSuccess?.();
    },
    onSettled: () => {
      // queryClient.invalidateQueries({
      //   queryKey: [KeyService.GET_ALL_CATEGORIES],
      // });
    },
  });
  return {addCart, ...rest};
};
