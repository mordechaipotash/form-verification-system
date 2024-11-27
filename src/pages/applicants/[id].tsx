import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { applicantsApi } from '@/lib/api';
import Layout from '@/components/Layout';
import FormList from '@/components/FormList';
import { format } from 'date-fns';

export default function ApplicantDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data: applicant, isLoading, error } = useQuery(
    ['applicant', id],
    () => applicantsApi.getApplicant(id as string),
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">Loading applicant details...</div>
        </div>
      </Layout>
    );
  }

  if (error || !applicant) {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center">
          <div className="text-center text-red-600">Error loading applicant details</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {applicant.firstName} {applicant.lastName}
              </h2>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Applicant Information
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">SSN</dt>
                  <dd className="mt-1 text-sm text-gray-900">{applicant.ssn}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(new Date(applicant.updatedAt), 'MMM d, yyyy')}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Forms</h3>
            <div className="mt-4">
              <FormList
                forms={applicant.forms.map((form) => ({
                  id: form.id,
                  formType: form.formType,
                  processingStatus: form.processingStatus,
                  thumbnailUrl: form.thumbnailUrl,
                  applicantName: `${applicant.firstName} ${applicant.lastName}`,
                  verifiedAt: form.verifiedAt,
                }))}
                isLoading={false}
                error={null}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
