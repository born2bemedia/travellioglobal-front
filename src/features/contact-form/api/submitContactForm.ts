import type { ContactFormSchema } from '../model/ContactForm.schema';

export const submitContactForm = async (data: ContactFormSchema) => {
  const formData = new FormData();
  
  formData.append('fullName', data.fullName);
  formData.append('email', data.email);
  if (data.phone) {
    formData.append('phone', data.phone);
  }
  formData.append('propertyLocation', data.propertyLocation);
  formData.append('primaryObjective', data.primaryObjective);
  formData.append('inheritance', data.inheritance);
  formData.append('description', data.description);
  formData.append('recaptcha', data.recaptcha || 'disabled');
  
  if (data.documents && data.documents.length > 0) {
    data.documents.forEach((file) => {
      formData.append('documents', file);
    });
  }

  const res = await fetch(`/api/contact`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Submission failed');
  }
};
