import { 
  ProfileFormData,
} from '../../pages/Admin/Profile/Components/schemas';

export interface GetPortfolioResponse {
  success: boolean;
  message: string;
  data: ProfileFormData[];
}

export interface GetSinglePortfolioResponse {
  success: boolean;
  message: string;
  data: ProfileFormData;
}

export interface CreatePortfolioResponse {
  success: boolean;
  message: string;
  data: ProfileFormData;
}

export interface UpdatePortfolioResponse {
  success: boolean;
  message: string;
  data: ProfileFormData;
}

export type PortfolioPayload = ProfileFormData;
