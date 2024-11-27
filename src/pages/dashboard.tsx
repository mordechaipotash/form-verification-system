import Layout from '@/components/Layout';
import { formsApi } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { DocumentTextIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const stats = [
  {
    name: 'New Forms',
    href: '/inbox',
    icon: ClockIcon,
    query: () => formsApi.getForms('new'),
  },
  {
    name: 'Processing',
    href: '/processing',
    icon: DocumentTextIcon,
    query: () => formsApi.getForms('processing'),
  },
  {
    name: 'Verified',
    href: '/verified',
    icon: CheckCircleIcon,
    query: () => formsApi.getForms('verified'),
  },
];

export default function Dashboard() {
  const queries = stats.map((stat) => ({
    ...stat,
    query: useQuery([`forms-${stat.name.toLowerCase()}`, stat.name], stat.query),
  }));

  return (
    <Layout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {queries.map(({ name, href, icon: Icon, query }) => (
                <Link
                  key={name}
                  href={href}
                  className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6"
                >
                  <dt>
                    <div className="absolute rounded-md bg-primary-500 p-3">
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">
                      {name}
                    </p>
                  </dt>
                  <dd className="ml-16 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {query.isLoading
                        ? '...'
                        : query.isError
                        ? 'Error'
                        : query.data?.length || 0}
                    </p>
                  </dd>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Recent Activity
            </h2>
            <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <div className="text-center text-sm text-gray-500">
                  Recent activity will be shown here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
