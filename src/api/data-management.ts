import { Get, Put } from 'config/apiServiceConfig/apiService';

import type { TDataManagement } from 'src/types/data-management';
import type { TBasicResponse, TMeta } from 'types/general';

export const GetDataManagementListApi = () => {
  return Get<TBasicResponse<Array<TDataManagement>, TMeta>>({
    url: 'data-management',
    params: {
      page: 1,
      limit: 10,
    },
  });
};

export const UpdateSequenceDataManagementApi = (
  payload: Array<Pick<TDataManagement, 'id' | 'position'>>
) => {
  return Put<TBasicResponse<null, null>>({
    url: 'data-management/update-sequence',
    data: { sequence: payload },
  });
};
