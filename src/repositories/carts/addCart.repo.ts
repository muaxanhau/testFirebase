import {KeyService, service, useApiMutation} from 'repositories/services';
import {CartIdModel, CartModel} from 'models';
import {useQueryClient} from '@tanstack/react-query';
import {utils} from 'utils';
import {devToolConfig} from 'config';

type AddCartProps = {onSuccess?: () => void} | void;
type AddCartInput = {itemId: string; quantity: number};
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

      const response = await service.post<AddCartOutput, AddCartInput>(
        'carts',
        data,
      );

      return response.data;
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
