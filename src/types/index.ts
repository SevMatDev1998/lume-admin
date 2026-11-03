export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';
export type Profession = 'DENTIST' | 'HYGIENIST' | 'SURGEON' | 'STUDENT' | 'OTHER';
export type InquiryStatus = 'NEW' | 'IN_PROGRESS' | 'CLOSED';
export type BookingStatus = 'NEW' | 'CONFIRMED' | 'DONE' | 'CANCELLED';
export type VisitType = 'OFFICE' | 'CLINIC';
export type VisitPurpose = 'FITTING' | 'SERVICE' | 'CONSULTATION';
export type OptionType = 'MAGNIFICATION' | 'COLOR' | 'SIZE' | 'TEMPLE_TIP';

export interface Client {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  profession: Profession | null;
}

export interface User extends Client {
  role: UserRole;
}

export interface UserListItem extends User {
  isVerified: boolean;
  createdAt: string;
  _count: { inquiries: number; bookings: number };
}

export interface ProductRef {
  id: string;
  name: string;
  slug?: string;
}

export interface Inquiry {
  id: string;
  selection: string | null;
  comment: string | null;
  status: InquiryStatus;
  createdAt: string;
  user: Client;
  product: ProductRef | null;
}

export interface Booking {
  id: string;
  startsAt: string;
  visitType: VisitType;
  purpose: VisitPurpose;
  comment: string | null;
  status: BookingStatus;
  createdAt: string;
  user: Client;
}

export interface UserDetails extends UserListItem {
  inquiries: Omit<Inquiry, 'user'>[];
  bookings: Omit<Booking, 'user'>[];
}

export interface CategoryRef {
  id: string;
  name: string;
  slug: string;
}

export interface Category extends CategoryRef {
  company: { id: string; name: string };
  subcategories: { subcategory: CategoryRef }[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductOption {
  type: OptionType;
  value: string;
}

export interface Product {
  id: string;
  subcategoryId: string;
  name: string;
  slug: string;
  description: string | null;
  images: string[];
  pdfUrl: string | null;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  subcategory: { id: string; name: string; categories: { category: CategoryRef }[] };
}

export interface ProductListItem extends Product {
  _count: { options: number; specs: number };
}

export interface ProductDetails extends Product {
  specs: ProductSpec[];
  options: ProductOption[];
}

export type ProductInput = Pick<
  ProductDetails,
  'subcategoryId' | 'name' | 'slug' | 'images' | 'isPublished' | 'sortOrder' | 'specs' | 'options'
> & { description?: string; pdfUrl?: string };

export interface DashboardSummary {
  newInquiries: number;
  inProgressInquiries: number;
  newBookings: number;
  users: number;
  upcomingBookings: (Pick<Booking, 'id' | 'startsAt' | 'visitType' | 'purpose' | 'status'> & {
    user: Pick<Client, 'firstName' | 'lastName' | 'phone'>;
  })[];
}

export interface GenericResponseType<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ListQuery {
  page?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
