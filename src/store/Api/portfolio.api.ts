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
  }),
  overrideExisting: false,
});

export const {
  useGetPortfoliosQuery,
  useGetSinglePortfolioQuery,
  useCreatePortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioApi;

export default portfolioApi;
