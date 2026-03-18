'use server';

const SERVER_URL = process.env.SERVER_URL;

export const getPolicy = async ({ slug, locale = 'en' }: { slug: string; locale?: string }) => {
  const res = await fetch(`${SERVER_URL}/api/policies?where[slug][in]=${slug}&locale=${locale}`);
  const data = await res.json();
  return data.docs[0];
};
