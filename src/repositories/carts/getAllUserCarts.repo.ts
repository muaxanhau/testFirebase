import {
  KeyService,
  cartsCollectionService,
  useApiQuery,
} from 'repositories/services';
import {CartIdModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetAllUserCartsOutput = CartIdModel[];
export const useGetAllUserCartsRepo = () => {
  const {data: carts, ...rest} = useApiQuery<GetAllUserCartsOutput>({
    queryKey: [KeyService.GET_ALL_USER_CARTS],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const rawCarts = await cartsCollectionService.get();

      const carts: CartIdModel[] = rawCarts.docs.map(cart => ({
        id: cart.id,
        ...cart.data(),
      }));

      return carts;
    },
  });

  return {carts, ...rest};
};
