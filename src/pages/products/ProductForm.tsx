import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Plus, Trash2 } from 'lucide-react';
import { Category, ProductInput } from '../../types';
import { Button } from '../../components/ui/Button';
import LoadButton from '../../components/ui/LoadButton';
import { FormField, INPUT_CLASS } from '../../components/ui/FormField';
import { OPTION_TYPE_LABELS, toOptions } from '../../utils/format';
import { cn } from '../../utils/cn';
import { ProductFormValues, productSchema, slugify, toProductInput } from '../../yupValidation/ProductValidation';

interface IProductForm {
  categories: Category[];
  defaultValues: ProductFormValues;
  isNew: boolean;
  isSaving: boolean;
  onSubmit: (input: ProductInput) => void;
}

const OPTION_TYPE_OPTIONS = toOptions(OPTION_TYPE_LABELS);

const Section = ({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <section className="space-y-4 rounded-lg bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <h2 className="font-semibold text-gray-900">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);

const ProductForm = ({ categories, defaultValues, isNew, isSaving, onSubmit }: IProductForm) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getFieldState,
    formState: { errors },
  } = useForm<ProductFormValues>({ resolver: yupResolver(productSchema), defaultValues });

  const specs = useFieldArray({ control, name: 'specs' });
  const options = useFieldArray({ control, name: 'options' });

  const syncSlug = (name: string) => {
    if (isNew && !getFieldState('slug').isDirty) setValue('slug', slugify(name));
  };

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(toProductInput(values)))} className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Section title="Main">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Name" error={errors.name?.message}>
              <input className={INPUT_CLASS} {...register('name', { onChange: (event) => syncSlug(event.target.value) })} />
            </FormField>
            <FormField label="Slug" error={errors.slug?.message} hint="Used in the product address on the site">
              <input className={INPUT_CLASS} {...register('slug')} />
            </FormField>
          </div>
          <FormField label="Description" error={errors.description?.message}>
            <textarea rows={4} className={INPUT_CLASS} {...register('description')} />
          </FormField>
          <FormField label="Images" error={errors.images?.message} hint="One image link per line">
            <textarea rows={3} className={INPUT_CLASS} {...register('images')} />
          </FormField>
          <FormField label="PDF brochure" error={errors.pdfUrl?.message}>
            <input className={INPUT_CLASS} placeholder="https://" {...register('pdfUrl')} />
          </FormField>
        </Section>

        <Section
          title="Variants"
          action={
            <Button type="button" variant="secondary" size="sm" onClick={() => options.append({ type: 'MAGNIFICATION', value: '' })}>
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          }
        >
          {options.fields.length === 0 && <p className="text-sm text-gray-400">No variants yet.</p>}
          {options.fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <select className={cn(INPUT_CLASS, 'w-44 shrink-0')} {...register(`options.${index}.type`)}>
                {OPTION_TYPE_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <FormField error={errors.options?.[index]?.value?.message} className="flex-1">
                <input className={INPUT_CLASS} placeholder="5.0x, Rose Gold, Large…" {...register(`options.${index}.value`)} />
              </FormField>
              <Button type="button" variant="danger" size="sm" className="mt-0.5" onClick={() => options.remove(index)} aria-label="Remove">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </Section>

        <Section
          title="Specs"
          action={
            <Button type="button" variant="secondary" size="sm" onClick={() => specs.append({ label: '', value: '' })}>
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          }
        >
          {specs.fields.length === 0 && <p className="text-sm text-gray-400">No specs yet.</p>}
          {specs.fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <FormField error={errors.specs?.[index]?.label?.message} className="w-44 shrink-0">
                <input className={INPUT_CLASS} placeholder="Weight" {...register(`specs.${index}.label`)} />
              </FormField>
              <FormField error={errors.specs?.[index]?.value?.message} className="flex-1">
                <input className={INPUT_CLASS} placeholder="49 g" {...register(`specs.${index}.value`)} />
              </FormField>
              <Button type="button" variant="danger" size="sm" className="mt-0.5" onClick={() => specs.remove(index)} aria-label="Remove">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </Section>
      </div>

      <div className="space-y-4">
        <Section title="Publishing">
          <FormField label="Category" error={errors.subcategoryId?.message}>
            <select className={INPUT_CLASS} {...register('subcategoryId')}>
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <optgroup key={category.id} label={`${category.company.name} · ${category.name}`}>
                  {category.subcategories.map(({ subcategory }) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </FormField>
          <FormField label="Order" error={errors.sortOrder?.message} hint="Lower numbers are shown first">
            <input type="number" className={INPUT_CLASS} {...register('sortOrder')} />
          </FormField>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-bice-blue" {...register('isPublished')} />
            Show on the site
          </label>
          <LoadButton
            type="submit"
            loading={isSaving}
            text={isNew ? 'Create product' : 'Save changes'}
            className="!w-full bg-bice-blue text-white hover:bg-bice-blue-dark"
          />
        </Section>
      </div>
    </form>
  );
};

export default ProductForm;
