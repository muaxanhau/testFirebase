import {KeyService, service, useApiMutation} from 'repositories/services';
import {utils} from 'utils';
import {devToolConfig} from 'config';

type StripePaymentProps = {
  onSuccess?: (data: StripePaymentOutput) => void;
} | void;
export type StripePaymentOutput = {
  url: string | null;
};
export const stripePaymentRepo = (props: StripePaymentProps) => {
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
      onSuccess: data => {
        if (typeof props === 'undefined') return;
        props.onSuccess?.(data);
      },
    });

  return {getStripePaymentUrl, ...rest};
};
