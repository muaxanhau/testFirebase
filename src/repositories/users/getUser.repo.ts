import auth from '@react-native-firebase/auth';
import {
  KeyService,
  useApiQuery,
  usersCollectionService,
} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';
import {UserIdModel} from 'models';

export type GetUserOutput = UserIdModel | undefined;
export const useGetUserRepo = () => {
  const {data: user, ...rest} = useApiQuery<GetUserOutput>({
    queryKey: [KeyService.GET_USER],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const {currentUser} = auth();
      if (!currentUser) return undefined;

      const rawUser = await usersCollectionService.doc(currentUser.uid).get();
      const user: UserIdModel = {
        id: rawUser.id,
        ...rawUser.data()!,
      };

      return user;
    },
  });

  return {user, ...rest};
};
