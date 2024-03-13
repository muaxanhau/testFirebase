import {KeyService, service, useApiMutation} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';
import {UserIdModel, UserModel} from 'models';

export type AddUserInput = {data: UserIdModel};
export type AddUserOutput = null;
export const useAddUserRepo = () => {
  const {mutate: addUser, ...rest} = useApiMutation<
    AddUserOutput,
    AddUserInput
  >({
    mutationKey: [KeyService.CREATE_USER],
    mutationFn: async ({data}) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.post<AddUserOutput, UserModel>(
        'users',
        data,
      );
      return response.data.data;
    },
  });

  return {addUser, ...rest};
};
