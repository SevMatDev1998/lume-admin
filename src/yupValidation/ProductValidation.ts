import * as yup from 'yup';
import { OptionType, ProductDetails, ProductInput } from '../types';
import { OPTION_TYPE_LABELS } from '../utils/format';

const OPTION_TYPES = Object.keys(OPTION_TYPE_LABELS) as OptionType[];

export const productSchema = yup.object({
  subcategoryId: yup.string().required('Choose a category'),
  name: yup.string().trim().required('Name is required'),
  slug: yup
    .string()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, digits and dashes')
    .required('Slug is required'),
  description: yup.string().default(''),
  images: yup.string().default(''),
  pdfUrl: yup
    .string()
    .trim()
    .test('url', 'Enter a link starting with http:// or https://', (value) => !value || /^https?:\/\//.test(value))
    .default(''),
  isPublished: yup.boolean().default(false),
  sortOrder: yup.number().typeError('Enter a number').integer('Enter a whole number').default(0),
  specs: yup
    .array(yup.object({ label: yup.string().trim().required('Required'), value: yup.string().trim().required('Required') }))
    .default([]),
  options: yup
    .array(yup.object({ type: yup.mixed<OptionType>().oneOf(OPTION_TYPES).required(), value: yup.string().trim().required('Required') }))
    .default([]),
});

export type ProductFormValues = yup.InferType<typeof productSchema>;

export const toProductInput = ({ images, ...values }: ProductFormValues): ProductInput => ({
  ...values,
  images: images
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean),
});

const EMPTY_PRODUCT: ProductFormValues = {
  subcategoryId: '',
  name: '',
  slug: '',
  description: '',
  images: '',
  pdfUrl: '',
  isPublished: false,
  sortOrder: 0,
  specs: [],
  options: [],
};

export const toProductFormValues = (product?: ProductDetails): ProductFormValues =>
  product
    ? {
        subcategoryId: product.subcategoryId,
        name: product.name,
        slug: product.slug,
        description: product.description ?? '',
        images: product.images.join('\n'),
        pdfUrl: product.pdfUrl ?? '',
        isPublished: product.isPublished,
        sortOrder: product.sortOrder,
        specs: product.specs.map(({ label, value }) => ({ label, value })),
        options: product.options.map(({ type, value }) => ({ type, value })),
      }
    : EMPTY_PRODUCT;

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
