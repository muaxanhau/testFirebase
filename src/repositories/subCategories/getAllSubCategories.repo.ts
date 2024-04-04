import {KeyService, service, useApiQuery} from 'repositories/services';
import {SubCategoryIdModel} from 'models';
import {utils} from 'utils';
import {devToolConfig} from 'config';

export type GetAllSubCategoriesOutput = SubCategoryIdModel[];
export const useGetAllSubCategoriesRepo = () => {
  const {data: subCategories, ...rest} = useApiQuery<GetAllSubCategoriesOutput>(
    {
      queryKey: [KeyService.GET_ALL_SUB_CATEGORIES],
      queryFn: async () => {
        await utils.sleep(devToolConfig.delayFetching);

        const response = await service.get<GetAllSubCategoriesOutput>(
          'sub-categories',
        );
        return response.data;
      },
    },
  );

  return {subCategories, ...rest};
};
