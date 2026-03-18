import type { RequestFormSchema } from '../model/schemas';

export async function submitForm(
  formType: 'request',
  data: RequestFormSchema & { name?: string }
): Promise<void> {
  const { name: serviceName, ...formData } = data;
  const body: Record<string, unknown> = {
    formType,
    data: { ...formData, service: serviceName ?? formData.service ?? '' },
  };

  const res = await fetch('/api/forms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const json = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(json?.message ?? 'Submission failed');
  }
}

export async function submitRequestForm(data: RequestFormSchema, name: string): Promise<void> {
  return submitForm('request', { ...data, name });
}
