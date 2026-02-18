const STRAPI_SERVER_URL = 'https://usable-trust-8c353f5555.strapiapp.com';

async function getStrapiSingle(endpoint, mapFn) {
  const url = STRAPI_SERVER_URL
    ? `${STRAPI_SERVER_URL}/api/${endpoint}`
    : `http://localhost:1337/api/${endpoint}`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (!json.data) return null;

    return mapFn ? mapFn(json.data) : json.data;

  } catch (err) {
    console.warn(`Fetch failed for ${endpoint}:`, err.message);
    return null;
  }
}

module.exports = getStrapiSingle;
