import {KeyService, service, useApiMutation} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type StripePaymentOutput = {
  url: string;
};
export const stripePaymentRepo = () => {
  const {mutate: getStripePaymentUrl, ...rest} =
    useApiMutation<StripePaymentOutput>({
      mutationKey: [KeyService.TEST_STRIPE_PAYMENT],
      mutationFn: async () => {
        await utils.sleep(devToolConfig.delayFetching);

        const response = await service.get<StripePaymentOutput>(
          'tests/stripe-payment',
        );
        return response.data;
      },
    });

  return {getStripePaymentUrl, ...rest};
};
