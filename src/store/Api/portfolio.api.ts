import baseApi from './BaseApi/BaseApi';
import type {
  GetPortfolioResponse,
  GetSinglePortfolioResponse,
  CreatePortfolioResponse,
  UpdatePortfolioResponse,
  PortfolioPayload,
} from './portfolio.apiTypes';

export const portfolioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolios: builder.query<GetPortfolioResponse, void>({
      query: () => '/portfolio',
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((_, index) => ({ type: 'Portfolio' as const, id: index })),
              { type: 'Portfolio', id: 'LIST' },
            ]
          : [{ type: 'Portfolio', id: 'LIST' }],
    }),

    getSinglePortfolio: builder.query<GetSinglePortfolioResponse, string>({
      query: (id) => `/portfolio/${id}`,
      providesTags: (_, __, id) => [{ type: 'Portfolio', id }],
    }),

    createPortfolio: builder.mutation<CreatePortfolioResponse, PortfolioPayload>({
      query: (body) => ({
        url: '/portfolio/create-portfolio',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Portfolio', id: 'LIST' }],
    }),

    updatePortfolio: builder.mutation<UpdatePortfolioResponse, { id: string; body: Partial<PortfolioPayload> }>({
      query: ({ id, body }) => ({
        url: `/portfolio/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Portfolio', id },
        { type: 'Portfolio', id: 'LIST' },
      ],
    }),

    deletePortfolio: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/portfolio/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Portfolio', id },
        { type: 'Portfolio', id: 'LIST' },
      ],
    }),

    trackProfileEvent: builder.mutation<{ success: boolean; data: any }, { id: string; eventType: string }>({
      query: ({ id, eventType }) => ({
        url: `/user/track/${id}`,
        method: 'POST',
        body: { eventType },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Portfolio', id }],
    }),

    // Superadmin: User Management
    getUsers: builder.query<{ success: boolean; data: any[] }, void>({
      query: () => '/user',
      providesTags: ['Users'],
    }),

    updateUserRole: builder.mutation<{ success: boolean; data: any }, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `/user/role/${id}`,
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: ['Users'],
    }),

    // Superadmin: Template Portfolio
    getTemplates: builder.query<{ success: boolean; data: any[] }, void>({
      query: () => '/template-portfolio',
      providesTags: ['Templates'],
    }),

    createTemplate: builder.mutation<{ success: boolean; data: any }, any>({
      query: (body) => ({
        url: '/template-portfolio',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Templates'],
    }),

    updateTemplate: builder.mutation<{ success: boolean; data: any }, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/template-portfolio/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Templates'],
    }),

    deleteTemplate: builder.mutation<{ success: boolean; data: any }, string>({
      query: (id) => ({
        url: `/template-portfolio/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Templates'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPortfoliosQuery,
  useGetSinglePortfolioQuery,
  useCreatePortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
  useTrackProfileEventMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useGetTemplatesQuery,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} = portfolioApi;

export default portfolioApi;
