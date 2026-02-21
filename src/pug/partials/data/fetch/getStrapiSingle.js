const STRAPI_SERVER_URL = 'http://localhost:1337';

async function getStrapiSingle(endpoint, mapFn) {
  const url = `${STRAPI_SERVER_URL}/api/${endpoint}`

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
