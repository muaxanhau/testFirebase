import {
  KeyService,
  itemsCollectionService,
  useApiQuery,
} from 'repositories/services';
import {ItemIdModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetAllItemsOutput = ItemIdModel[];
export const useGetAllItemsRepo = () => {
  const {data: items, ...rest} = useApiQuery<GetAllItemsOutput>({
    queryKey: [KeyService.GET_ALL_ITEMS],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const rawItems = await itemsCollectionService.get();
      const items: ItemIdModel[] = rawItems.docs.map(rawItem => ({
        id: rawItem.id,
        ...rawItem.data(),
      }));

      return items;
    },
  });

  return {items, ...rest};
};
