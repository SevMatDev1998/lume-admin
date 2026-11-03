import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { errorMessage } from '../../api/api';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/public/Loader';
import useModal from '../../hooks/useModal';
import MainModal from '../../modals/MainModal';
import RouteEnum, { productRoute } from '../../enums/route.enum';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetProductQuery,
  useUpdateProductMutation,
} from '../../services/admin.service';
import { ProductInput } from '../../types';
import { toProductFormValues } from '../../yupValidation/ProductValidation';
import ProductForm from './ProductForm';

const ProductFormPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const open = useModal();
  const isNew = !productId;

  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const { data: product, isLoading: isProductLoading } = useGetProductQuery(productId!, { skip: isNew });
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  if (isCategoriesLoading || isProductLoading || !categories) return <Loader />;
  if (!isNew && !product) return <p className="text-gray-500">Product not found.</p>;

  const handleSubmit = async (input: ProductInput) => {
    try {
      if (isNew) {
        const created = await createProduct(input).unwrap();
        toast.success('Product created');
        navigate(productRoute(created.id), { replace: true });
      } else {
        await updateProduct({ id: productId, body: input }).unwrap();
        toast.success('Changes saved');
      }
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };

  const handleDelete = () =>
    open(MainModal, {
      title: 'Delete product',
      message: 'The product will disappear from the site. Existing inquiries keep their history.',
      onSubmit: async () => {
        try {
          await deleteProduct(productId!).unwrap();
          toast.success('Product deleted');
          navigate(RouteEnum.PRODUCTS);
        } catch (error) {
          toast.error(errorMessage(error));
        }
      },
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to={RouteEnum.PRODUCTS} className="rounded-full p-2 text-gray-500 hover:bg-gray-200" aria-label="Back">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">{product?.name ?? 'New product'}</h1>
        </div>
        {!isNew && (
          <Button variant="danger" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        )}
      </div>
      <ProductForm
        key={product?.id ?? 'new'}
        categories={categories}
        defaultValues={toProductFormValues(product)}
        isNew={isNew}
        isSaving={isCreating || isUpdating}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProductFormPage;
