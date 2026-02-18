const path = require('path');
const STRAPI_SERVER_URL = 'https://usable-trust-8c353f5555.strapiapp.com';

async function postStrapiReview(endpoint, reviewData) {

  const url = STRAPI_SERVER_URL
    ? `${STRAPI_SERVER_URL}/api/${endpoint}`
    : `http://localhost:1337/api/${endpoint}`;

    const res = await fetch(url, {  
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({
        data: reviewData
      }) 
    }); 
  
    const data = await res.json();
    console.log('Review posted:', data);
}

module.exports = postStrapiReview;
