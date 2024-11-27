import Layout from '@/components/Layout';
import { applicantsApi } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { format } from 'date-fns';

export default function Applicants() {
  const { data: applicants, isLoading, error } = useQuery(['applicants'], applicantsApi.getApplicants);

  return (
    <Layout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Applicants</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mt-8">
            {isLoading ? (
              <div className="text-center">Loading applicants...</div>
            ) : error ? (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error loading applicants
                    </h3>
                  </div>
                </div>
              </div>
            ) : !applicants?.length ? (
              <div className="text-center">
                <div className="mt-4 text-sm text-gray-500">No applicants found</div>
              </div>
            ) : (
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              SSN
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Forms
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Last Updated
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {applicants.map((applicant) => (
                            <tr key={applicant.id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <Link
                                  href={`/applicants/${applicant.id}`}
                                  className="font-medium text-primary-600 hover:text-primary-900"
                                >
                                  {applicant.firstName} {applicant.lastName}
                                </Link>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {applicant.ssn}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {applicant.forms.length}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {format(new Date(applicant.updatedAt), 'MMM d, yyyy')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
