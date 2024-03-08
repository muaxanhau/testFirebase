import {PaginationModel, SupportModel, UserModel} from 'models';
import {KeyService, clientService, useApiQuery} from '../services';
import {Prettify, utils} from 'utils';
import {devToolConfig} from 'config';

export type GetUsersProps = {
  page: number;
};
export type GetUsersResponse = Prettify<
  {
    data: UserModel[];
    support: SupportModel;
  } & PaginationModel
>;
export const useGetUsersRepo = ({page = 0}: GetUsersProps) => {
  const {data, ...rest} = useApiQuery<GetUsersResponse>({
    queryKey: [KeyService.LIST_USERS, page],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const url = 'api/users';
      const params = {
        page,
      };

      return clientService.get(url, {params});
    },
    initialData: {
      data: [],
      page: 0,
      perPage: 0,
      support: {
        text: '',
        url: '',
      },
      total: 0,
      totalPages: 0,
    },
  });

  return {
    users: data!,
    ...rest,
  };
};
