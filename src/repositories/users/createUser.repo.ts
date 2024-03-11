import {
  KeyService,
  useApiMutation,
  usersCollectionService,
} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';
import {RoleEnum} from 'models';

export type CreateUserInput = {id: string; role?: RoleEnum};
export type CreateUserOutput = void;
export const useCreateUserRepo = () => {
  const {mutate: createUser, ...rest} = useApiMutation<
    CreateUserOutput,
    CreateUserInput
  >({
    mutationKey: [KeyService.CREATE_USER],
    mutationFn: async ({id, role = RoleEnum.USER}) => {
      await utils.sleep(devToolConfig.delayFetching);

      const refUser = usersCollectionService.doc(id);
      const rawUser = await refUser.get();
      if (rawUser.exists) return;

      await refUser.set({role});
    },
  });

  return {createUser, ...rest};
};
