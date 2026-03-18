"use server";

const SERVER_URL = process.env.SERVER_URL;

export const getIdeas = async ({ locale = "en" }: { locale?: string }) => {
  const res = await fetch(`${SERVER_URL}/api/ideas?locale=${locale}`);
  const data = await res.json();
  return data.docs.reverse();
};

export const getIdea = async ({
  slug,
  locale = "en",
}: {
  slug: string;
  locale?: string;
}) => {
  const res = await fetch(
    `${SERVER_URL}/api/ideas?where[slug][in]=${slug}&locale=${locale}`,
  );
  const data = await res.json();
  return data.docs[0];
};
