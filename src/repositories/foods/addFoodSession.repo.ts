import {KeyService, service, useApiMutation} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';
import {StatusFoodEnum} from 'models';

type AddFoodSessionProps = {onSuccess?: () => void} | void;
type AddFoodSessionOutput = {
  id: string;
  foodId: string;
  userId: string;
  status: StatusFoodEnum;
};
type AddFoodSessionInput = {
  foodId: string;
};
export const useAddFoodSessionRepo = (props: AddFoodSessionProps) => {
  const {
    data: foodSession,
    mutate: addFoodSession,
    ...rest
  } = useApiMutation<AddFoodSessionOutput, AddFoodSessionInput>({
    mutationKey: [KeyService.ADD_FOOD_SESSION],
    mutationFn: async ({foodId}) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.post<
        AddFoodSessionOutput,
        AddFoodSessionInput
      >('foods/sessions', {foodId});
      return response.data;
    },
    onSuccess: () => {
      if (typeof props === 'undefined') return;
      props.onSuccess?.();
    },
  });

  return {foodSession, addFoodSession, ...rest};
};
