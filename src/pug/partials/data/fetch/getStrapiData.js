const path = require('path');
const STRAPI_SERVER_URL = 'https://usable-trust-8c353f5555.strapiapp.com';

async function getStrapiData(endpoint, mapFn) {
  const url = STRAPI_SERVER_URL
    ? `${STRAPI_SERVER_URL}/api/${endpoint}`
    : `http://localhost:1337/api/${endpoint}`;

  try {
    const res = await fetch(url); 
    const json = await res.json();

  
    
    return json.data?.map(item => mapFn(item)) || [];

  } catch (err) {
    console.warn(`Fetch failed for ${endpoint}, using fallback:`, err.message);
    return [];
  }
}

module.exports = getStrapiData;
