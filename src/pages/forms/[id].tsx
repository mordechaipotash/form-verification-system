import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formsApi } from '@/lib/api';
import Layout from '@/components/Layout';
import PDFViewer from '@/components/PDFViewer';
import DataEntryForm from '@/components/DataEntryForm';
import { FormType } from '@/types';
import { toast } from 'react-hot-toast';

const formTypes: FormType[] = ['8850', '8qf', 'nyyf_1', 'nyyf_2', 'unknown'];

export default function FormVerification() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { data: form, isLoading, error } = useQuery(
    ['form', id],
    () => formsApi.getForm(id as string),
    {
      enabled: !!id,
    }
  );

  const updateFormTypeMutation = useMutation(
    (formType: FormType) => formsApi.updateFormType(id as string, formType),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['form', id]);
        toast.success('Form type updated successfully');
      },
      onError: () => {
        toast.error('Failed to update form type');
      },
    }
  );

  const verifyFormMutation = useMutation(
    () => formsApi.verifyForm(id as string),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['form', id]);
        toast.success('Form verified successfully');
        router.push('/verified');
      },
      onError: () => {
        toast.error('Failed to verify form');
      },
    }
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">Loading form...</div>
        </div>
      </Layout>
    );
  }

  if (error || !form) {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center">
          <div className="text-center text-red-600">Error loading form</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Form Verification</h1>
            <div className="flex items-center space-x-4">
              <select
                value={form.formType}
                onChange={(e) => updateFormTypeMutation.mutate(e.target.value as FormType)}
                className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                {formTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.toUpperCase()}
                  </option>
                ))}
              </select>
              <button
                onClick={() => verifyFormMutation.mutate()}
                disabled={form.processingStatus === 'verified'}
                className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {form.processingStatus === 'verified' ? 'Verified' : 'Mark as Verified'}
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="h-[800px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
              <PDFViewer url={form.pdfUrl} />
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
              <DataEntryForm
                form={form}
                onSave={() => queryClient.invalidateQueries(['form', id])}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
