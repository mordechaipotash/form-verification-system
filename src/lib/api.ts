import axios from 'axios';
import { Form, FormListItem, Applicant, FormType, ProcessingStatus } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
});

export const formsApi = {
  // Get all forms with optional filters
  getForms: async (status?: ProcessingStatus) => {
    const { data } = await api.get<FormListItem[]>('/forms', {
      params: { status },
    });
    return data;
  },

  // Get a single form by ID
  getForm: async (id: string) => {
    const { data } = await api.get<Form>(`/forms/${id}`);
    return data;
  },

  // Update form type
  updateFormType: async (id: string, formType: FormType) => {
    const { data } = await api.patch<Form>(`/forms/${id}/type`, { formType });
    return data;
  },

  // Update form data
  updateFormData: async (id: string, formData: Partial<Form>) => {
    const { data } = await api.patch<Form>(`/forms/${id}`, formData);
    return data;
  },

  // Mark form as verified
  verifyForm: async (id: string) => {
    const { data } = await api.post<Form>(`/forms/${id}/verify`);
    return data;
  },
};

export const applicantsApi = {
  // Get all applicants
  getApplicants: async () => {
    const { data } = await api.get<Applicant[]>('/applicants');
    return data;
  },

  // Get a single applicant by ID
  getApplicant: async (id: string) => {
    const { data } = await api.get<Applicant>(`/applicants/${id}`);
    return data;
  },

  // Create or update applicant
  upsertApplicant: async (applicantData: Partial<Applicant>) => {
    const { data } = await api.post<Applicant>('/applicants', applicantData);
    return data;
  },
};

export default api;
