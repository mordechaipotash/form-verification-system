import { FormListItem } from '@/types';
import FormCard from './FormCard';

interface FormListProps {
  forms: FormListItem[];
  isLoading: boolean;
  error: unknown;
}

export default function FormList({ forms, isLoading, error }: FormListProps) {
  if (isLoading) {
    return (
      <div className="text-center">
        <div className="mt-4">Loading forms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading forms</h3>
            <div className="mt-2 text-sm text-red-700">
              {error instanceof Error ? error.message : 'Unknown error occurred'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!forms.length) {
    return (
      <div className="text-center">
        <div className="mt-4 text-sm text-gray-500">No forms found</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </div>
  );
}
