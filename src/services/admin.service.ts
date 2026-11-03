import ApiInstance from '../api/api';
import ApiEnum from '../enums/api.enum';
import {
  Booking,
  BookingStatus,
  Category,
  DashboardSummary,
  GenericResponseType,
  Inquiry,
  InquiryStatus,
  ListQuery,
  ProductDetails,
  ProductInput,
  ProductListItem,
  UserDetails,
  UserListItem,
} from '../types';

const AdminService = ApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query<DashboardSummary, void>({
      query: () => ({ url: ApiEnum.DASHBOARD }),
      providesTags: ['Dashboard'],
    }),

    getInquiries: build.query<GenericResponseType<Inquiry>, ListQuery & { status?: InquiryStatus }>({
      query: (params) => ({ url: ApiEnum.INQUIRIES, params }),
      providesTags: ['Inquiry'],
    }),
    updateInquiryStatus: build.mutation<Inquiry, { id: string; status: InquiryStatus }>({
      query: ({ id, status }) => ({ url: `${ApiEnum.INQUIRIES}/${id}/status`, method: 'PATCH', body: { status } }),
      invalidatesTags: ['Inquiry', 'Dashboard', 'User'],
    }),

    getBookings: build.query<Booking[], { from: string; to: string; status?: BookingStatus }>({
      query: (params) => ({ url: ApiEnum.BOOKINGS, params }),
      providesTags: ['Booking'],
    }),
    updateBookingStatus: build.mutation<Booking, { id: string; status: BookingStatus }>({
      query: ({ id, status }) => ({ url: `${ApiEnum.BOOKINGS}/${id}/status`, method: 'PATCH', body: { status } }),
      invalidatesTags: ['Booking', 'Dashboard', 'User'],
    }),

    getCategories: build.query<Category[], void>({
      query: () => ({ url: ApiEnum.CATEGORIES }),
      providesTags: ['Category'],
    }),
    getProducts: build.query<GenericResponseType<ProductListItem>, ListQuery & { categoryId?: string }>({
      query: (params) => ({ url: ApiEnum.PRODUCTS, params }),
      providesTags: ['Product'],
    }),
    getProduct: build.query<ProductDetails, string>({
      query: (id) => ({ url: `${ApiEnum.PRODUCTS}/${id}` }),
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    createProduct: build.mutation<ProductDetails, ProductInput>({
      query: (body) => ({ url: ApiEnum.PRODUCTS, method: 'POST', body }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: build.mutation<ProductDetails, { id: string; body: ProductInput }>({
      query: ({ id, body }) => ({ url: `${ApiEnum.PRODUCTS}/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_result, _error, { id }) => ['Product', { type: 'Product', id }],
    }),
    deleteProduct: build.mutation<void, string>({
      query: (id) => ({ url: `${ApiEnum.PRODUCTS}/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Product'],
    }),

    getUsers: build.query<GenericResponseType<UserListItem>, ListQuery>({
      query: (params) => ({ url: ApiEnum.USERS, params }),
      providesTags: ['User'],
    }),
    getUser: build.query<UserDetails, string>({
      query: (id) => ({ url: `${ApiEnum.USERS}/${id}` }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetInquiriesQuery,
  useUpdateInquiryStatusMutation,
  useGetBookingsQuery,
  useUpdateBookingStatusMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetUsersQuery,
  useGetUserQuery,
} = AdminService;
