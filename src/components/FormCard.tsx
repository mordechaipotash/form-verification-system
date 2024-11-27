import { FormListItem } from '@/types';
import { ClockIcon, CheckCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';

interface FormCardProps {
  form: FormListItem;
}

const statusIcons = {
  new: ClockIcon,
  processing: DocumentTextIcon,
  verified: CheckCircleIcon,
};

const statusColors = {
  new: 'text-yellow-600 bg-yellow-50 ring-yellow-500/10',
  processing: 'text-blue-600 bg-blue-50 ring-blue-500/10',
  verified: 'text-green-600 bg-green-50 ring-green-500/10',
};

export default function FormCard({ form }: FormCardProps) {
  const StatusIcon = statusIcons[form.processingStatus];

  return (
    <Link
      href={`/forms/${form.id}`}
      className="relative flex items-center space-x-6 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
    >
      <div className="relative h-24 w-20 flex-shrink-0">
        <Image
          src={form.thumbnailUrl}
          alt="Form thumbnail"
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">
              Form Type: {form.formType.toUpperCase()}
            </p>
            <div
              className={`rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                statusColors[form.processingStatus]
              }`}
            >
              <div className="flex items-center gap-1">
                <StatusIcon className="h-4 w-4" />
                <span className="capitalize">{form.processingStatus}</span>
              </div>
            </div>
          </div>
          <div className="mt-2">
            {form.applicantName ? (
              <p className="truncate text-sm text-gray-500">
                Applicant: {form.applicantName}
              </p>
            ) : (
              <p className="text-sm text-gray-500">No applicant assigned</p>
            )}
            {form.verifiedAt && (
              <p className="mt-1 text-sm text-gray-500">
                Verified: {format(new Date(form.verifiedAt), 'MMM d, yyyy')}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
