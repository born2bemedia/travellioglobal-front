'use client';

import { use } from 'react';

const fetchCountryCode = async (): Promise<string> => {
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();

    const countryResponse = await fetch(`https://ipinfo.io/${ip}?token=a1de4b6d03b20a`);
    const { country } = await countryResponse.json();

    return country.toLowerCase();
  } catch (error) {
    console.error('Error fetching country code:', error);
    return 'us';
  }
};

const countryCodePromise = fetchCountryCode();

export const useCountryCode = () => use(countryCodePromise);
