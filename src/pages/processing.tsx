import Layout from '@/components/Layout';
import FormList from '@/components/FormList';
import { formsApi } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export default function Processing() {
  const { data, isLoading, error } = useQuery(['forms-processing'], () =>
    formsApi.getForms('processing')
  );

  return (
    <Layout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Processing Forms</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mt-8">
            <FormList forms={data || []} isLoading={isLoading} error={error} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
