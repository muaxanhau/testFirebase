import {KeyService, service, useApiMutation} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';

type GenerateStripePaymentProps = {
  onSuccess?: (data: GenerateStripePaymentOutput) => void;
} | void;
type GenerateStripePaymentOutput = {
  url: string;
};
type GenerateStripePaymentInput = {
  statusFoodId: string;
};
export const useGenerateStripePaymentRepo = (
  props: GenerateStripePaymentProps,
) => {
  const {mutate: generateStripePayment, ...rest} = useApiMutation<
    GenerateStripePaymentOutput,
    GenerateStripePaymentInput
  >({
    mutationKey: [KeyService.GENERATE_STRIPE_PAYMENT],
    mutationFn: async ({statusFoodId}) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<GenerateStripePaymentOutput>(
        `foods/sessions/${statusFoodId}/payment/stripe`,
      );
      return response.data;
    },
    ...props,
  });

  return {generateStripePayment, ...rest};
};
