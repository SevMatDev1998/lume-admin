export enum RouteEnum {
  LOGIN = '/login',
  HOME = '/',
  INQUIRIES = '/inquiries',
  BOOKINGS = '/bookings',
  PRODUCTS = '/products',
  PRODUCT_NEW = '/products/new',
  USERS = '/users',
  NOT_FOUND = '*',
}

export const productRoute = (id: string) => `${RouteEnum.PRODUCTS}/${id}`;

export default RouteEnum;
