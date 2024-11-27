import { Form } from '@/types';
import { useForm } from 'react-hook-form';
import { formsApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface DataEntryFormProps {
  form: Form;
  onSave: () => void;
}

export default function DataEntryForm({ form, onSave }: DataEntryFormProps) {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      firstName: form.firstName || '',
      lastName: form.lastName || '',
      ssn: form.ssn || '',
      dob: form.dob ? form.dob.split('T')[0] : '',
      street1: form.street1 || '',
      street2: form.street2 || '',
      city: form.city || '',
      state: form.state || '',
      zip: form.zip || '',
      email: form.email || '',
      phone: form.phone || '',
      signatureDate: form.signatureDate ? form.signatureDate.split('T')[0] : '',
      hasSignature: form.hasSignature || false,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await formsApi.updateFormData(form.id, {
        ...data,
        processingStatus: 'processing',
      });
      toast.success('Form data saved successfully');
      onSave();
    } catch (error) {
      toast.error('Failed to save form data');
      console.error('Error saving form data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: 'First name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: 'Last name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="ssn" className="block text-sm font-medium text-gray-700">
            SSN
          </label>
          <input
            type="text"
            id="ssn"
            {...register('ssn', {
              required: 'SSN is required',
              pattern: {
                value: /^\d{3}-?\d{2}-?\d{4}$/,
                message: 'Invalid SSN format',
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {errors.ssn && <p className="mt-1 text-sm text-red-600">{errors.ssn.message}</p>}
        </div>

        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            {...register('dob', { required: 'Date of birth is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="street1" className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            id="street1"
            {...register('street1', { required: 'Street address is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {errors.street1 && (
            <p className="mt-1 text-sm text-red-600">{errors.street1.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="street2" className="block text-sm font-medium text-gray-700">
            Apartment, suite, etc.
          </label>
          <input
            type="text"
            id="street2"
            {...register('street2')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            {...register('city', { required: 'City is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            {...register('state', { required: 'State is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            type="text"
            id="zip"
            {...register('zip', {
              required: 'ZIP code is required',
              pattern: {
                value: /^\d{5}(-\d{4})?$/,
                message: 'Invalid ZIP code format',
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {errors.zip && <p className="mt-1 text-sm text-red-600">{errors.zip.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone', {
              pattern: {
                value: /^\d{3}-?\d{3}-?\d{4}$/,
                message: 'Invalid phone number format',
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="signatureDate" className="block text-sm font-medium text-gray-700">
            Signature Date
          </label>
          <input
            type="date"
            id="signatureDate"
            {...register('signatureDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasSignature"
            {...register('hasSignature')}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="hasSignature" className="ml-2 block text-sm text-gray-900">
            Has Signature
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          disabled={!isDirty}
          className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
