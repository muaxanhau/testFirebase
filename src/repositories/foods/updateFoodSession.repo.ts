import {KeyService, service, useApiMutation} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';

type UpdateFoodSessionOutput = null;
type UpdateFoodSessionInput = {
  statusFoodId: string;
};
export const useUpdateFoodSessionRepo = () => {
  const {mutate: updateFoodSession, ...rest} = useApiMutation<
    UpdateFoodSessionOutput,
    UpdateFoodSessionInput
  >({
    mutationKey: [KeyService.UPDATE_FOOD_SESSION],
    mutationFn: async ({statusFoodId}) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.put<UpdateFoodSessionOutput, undefined>(
        `foods/sessions/${statusFoodId}`,
        undefined,
      );
      return response.data;
    },
  });

  return {updateFoodSession, ...rest};
};
