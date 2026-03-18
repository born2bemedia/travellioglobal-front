import type { HomeRequestFormSchema } from '../model/ContactForm.schema';

export const submitHomeRequestForm = async (data: HomeRequestFormSchema) => {
  const formData = new FormData();

  formData.append('fullName', data.fullName);
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  if (data.companyName) formData.append('companyName', data.companyName);
  if (data.website) formData.append('website', data.website);
  formData.append('projectType', data.projectType);
  if (data.projectTypeOther) formData.append('projectTypeOther', data.projectTypeOther);
  formData.append('investmentRange', data.investmentRange);
  if (data.goals) formData.append('goals', data.goals);
  if (data.frictionPoints) formData.append('frictionPoints', data.frictionPoints);
  if (data.clientContext) formData.append('clientContext', data.clientContext);
  formData.append('timing', data.timing);
  formData.append('followUp', data.followUp);
  if (data.attachments) {
    data.attachments.forEach((file) => {
      formData.append('attachments', file);
    });
  }

  const res = await fetch(`/api/contact-request`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Submission failed');
  }
};
